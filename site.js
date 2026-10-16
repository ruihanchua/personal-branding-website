(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ribbon = document.getElementById('industry-marquee');
  const track = ribbon.querySelector('.industry-track');
  const pause = document.getElementById('marquee-pause');
  track.querySelectorAll('.industry-copy').forEach(e => e.remove());
  const duplicate = track.querySelector('.industry-group').cloneNode(true);
  duplicate.classList.add('industry-copy');
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.inert = true;
  track.append(duplicate);
  let userPaused = false;
  const refreshRibbon = () => {
    ribbon.classList.toggle('is-moving', !reducedMotion.matches);
    ribbon.classList.toggle('is-paused', userPaused);
    pause.hidden = reducedMotion.matches;
    pause.setAttribute('aria-pressed', String(userPaused));
    pause.textContent = userPaused ? 'Resume movement' : 'Pause movement';
  };
  pause.addEventListener('click', () => { userPaused = !userPaused; refreshRibbon(); });
  ribbon.querySelector('.industry-viewport').addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') { userPaused = true; refreshRibbon(); }
  });
  reducedMotion.addEventListener('change', refreshRibbon);
  refreshRibbon();

  const scenes = [...document.querySelectorAll('[data-scene]')];
  const sceneLinks = [...document.querySelectorAll('[data-scene-link]')];
  const sceneRoot = document.querySelector('.process-scenes');
  let frame = 0;
  const paintScroll = () => {
    frame = 0;
    const progress = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    document.getElementById('reading-progress-bar').style.transform = `scaleX(${Math.min(1, progress)})`;
    const motion = !reducedMotion.matches && !document.body.classList.contains('edit-mode');
    const mark = document.querySelector('.header .logo .symbol');
    mark.style.transform = motion ? `rotate(${progress * 180}deg)` : '';
    for (const image of document.querySelectorAll('.portrait-photo')) {
      const rect = image.parentElement.getBoundingClientRect();
      const offset = Math.max(-10, Math.min(10, (innerHeight / 2 - rect.top - rect.height / 2) * .035));
      image.style.setProperty('--photo-shift', motion ? `${offset.toFixed(2)}px` : '0px');
    }
    const aboutPhoto = document.querySelector('.name-art');
    const photoRect = aboutPhoto.getBoundingClientRect();
    aboutPhoto.style.setProperty('--portrait-turn', motion ? `${Math.max(-1.3, Math.min(1.3, (photoRect.top / innerHeight - .4) * 3)).toFixed(2)}deg` : '0deg');
    for (const card of document.querySelectorAll('.problem-cards article')) {
      const rect = card.getBoundingClientRect();
      const position = Math.max(-1, Math.min(1, rect.top / innerHeight - .35));
      card.style.setProperty('--mark-angle', motion ? `${position * 15}deg` : '0deg');
      card.style.setProperty('--mark-lift', motion ? `${position * 6}px` : '0px');
    }
    const start = sceneRoot.getBoundingClientRect().top + scrollY;
    let position = start;
    let active = 0;
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const height = scene.offsetHeight + parseFloat(getComputedStyle(scene).marginBottom);
      const distance = Math.max(0, Math.min(1, (scrollY + innerHeight * .58 - position) / height));
      if (scrollY + innerHeight * .58 >= position) active = i;
      scene.style.setProperty('--scene-progress', motion ? distance.toFixed(3) : '1');
      scene.style.setProperty('--scene-turn', motion ? `${(distance - .5) * 30}deg` : '0deg');
      position += height;
    }
    scenes.forEach((scene, i) => scene.classList.toggle('is-active', i === active));
    sceneLinks.forEach((link, i) => { if (i === active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current'); });
  };
  const schedulePaint = () => { if (!frame) frame = requestAnimationFrame(paintScroll); };
  addEventListener('scroll', schedulePaint, { passive: true });
  addEventListener('resize', schedulePaint);
  reducedMotion.addEventListener('change', schedulePaint);
  if ('ResizeObserver' in window) new ResizeObserver(schedulePaint).observe(document.body);
  document.fonts.ready.then(schedulePaint);
  schedulePaint();
  const count = document.querySelector('[data-count]');
  if (count && !reducedMotion.matches && 'IntersectionObserver' in window) {
    const counter = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      counter.disconnect();
      const target = Number(count.dataset.count), start = performance.now();
      const tick = now => {
        const progress = Math.min(1, (now - start) / 650);
        count.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1 && !reducedMotion.matches) requestAnimationFrame(tick);
        else count.textContent = String(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: .5 });
    counter.observe(count);
  }

  const hero = document.querySelector('.hero-art');
  const trigger = document.getElementById('hero-video-trigger');
  const videoDialog = document.getElementById('intro-video-dialog');
  const player = document.getElementById('intro-video-player');
  const videoEmbed = raw => {
    try {
      const u = new URL(raw);
      if (u.protocol !== 'https:' || u.username || u.password || u.port) return null;
      const host = u.hostname.replace(/^www\./, '');
      let id;
      if (host === 'youtu.be') id = u.pathname.slice(1);
      else if (host === 'youtube.com' || host === 'youtube-nocookie.com') id = u.pathname === '/watch' ? u.searchParams.get('v') : u.pathname.match(/^\/(?:embed|shorts)\/([^/]+)\/?$/)?.[1];
      if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      if (host === 'vimeo.com' || host === 'player.vimeo.com') {
        const match = u.pathname.match(/^\/(?:video\/)?(\d+)\/?$/);
        if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
      }
      return null;
    } catch { return null; }
  };
  const configureVideo = () => {
    const embed = videoEmbed(hero.dataset.videoUrl || '');
    trigger.hidden = !embed;
    hero.classList.toggle('has-video', !!embed);
    trigger.dataset.embed = embed || '';
  };
  hero.addEventListener('video-change', configureVideo);
  configureVideo();
  trigger.addEventListener('click', () => {
    if (document.body.classList.contains('edit-mode') || !trigger.dataset.embed) return;
    const iframe = document.createElement('iframe');
    iframe.src = trigger.dataset.embed;
    iframe.title = 'Ray Chua’s introduction';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(iframe);
    videoDialog.showModal();
  });
  document.getElementById('video-dialog-close').addEventListener('click', () => videoDialog.close());
  videoDialog.addEventListener('close', () => { player.replaceChildren(); trigger.focus({ preventScroll: true }); });

  const section = document.getElementById('contact');
  const live = document.getElementById('typeform-live');
  const preview = document.getElementById('application-preview');
  const validTypeform = raw => {
    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:' || url.username || url.password || url.port || !(url.hostname === 'typeform.com' || url.hostname.endsWith('.typeform.com')) || !/^\/to\/[A-Za-z0-9]+\/?$/.test(url.pathname)) return null;
      url.hash = '';
      return url.href;
    } catch { return null; }
  };
  const connectTypeform = () => {
    const url = validTypeform(section.dataset.typeformUrl || '');
    if (!url) { live.hidden = true; preview.hidden = false; live.replaceChildren(); return; }
    const link = document.createElement('a');
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.className = 'typeform-external'; link.textContent = 'Open application in a new tab ↗';
    const iframe = document.createElement('iframe');
    iframe.src = url; iframe.title = 'Apply to work with Ray Chua'; iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    live.replaceChildren(link, iframe);
    preview.hidden = true; live.hidden = false;
  };
  section.addEventListener('typeform-change', connectTypeform);
  connectTypeform();

  const form = document.getElementById('application-form');
  const steps = [...form.querySelectorAll('[data-step]')];
  const next = document.getElementById('application-next');
  const back = document.getElementById('application-back');
  const error = document.getElementById('application-error');
  const feedback = document.getElementById('application-feedback');
  const review = document.getElementById('application-review');
  let step = 0;
  let answerText = '';
  const names = ['About you', 'Your direction', 'Your starting point', 'Review your answers'];
  const show = () => {
    steps.forEach((field, i) => { field.hidden = i !== step; });
    review.hidden = step !== 3;
    back.hidden = step === 0;
    next.hidden = step === 3;
    next.innerHTML = step === 2 ? 'Review my answers <span aria-hidden="true">→</span>' : 'Continue <span aria-hidden="true">→</span>';
    document.getElementById('step-label').textContent = step === 3 ? 'Review' : `Step ${step + 1} of 3`;
    document.getElementById('step-name').textContent = names[step];
    document.getElementById('step-progress-bar').style.width = `${Math.min(step + 1, 3) / 3 * 100}%`;
    error.textContent = ''; feedback.textContent = '';
    if (step < 3) steps[step].querySelector('input, select, textarea').focus({ preventScroll: true });
    else { review.querySelector('h4').tabIndex = -1; review.querySelector('h4').focus({ preventScroll: true }); }
  };
  const advance = () => {
    if (step >= 3) return;
    for (const input of steps[step].querySelectorAll('input, select, textarea')) {
      input.setCustomValidity('');
      if (input.required && input.type !== 'checkbox' && !input.value.trim()) input.setCustomValidity('Please fill in this field.');
      if (!input.reportValidity()) { error.textContent = 'Please check the highlighted field before continuing.'; return; }
    }
    if (step === 2) {
      const labels = { support: 'Support', goal: 'Goal', profile: 'Profile', challenge: 'Challenge', timing: 'Timing', name: 'Name', email: 'Email' };
      const summary = document.getElementById('application-summary');
      summary.replaceChildren();
      const data = new FormData(form); const lines = [];
      for (const [key, label] of Object.entries(labels)) {
        const value = String(data.get(key) || '').trim() || 'Not provided';
        const dt = document.createElement('dt'); dt.textContent = label;
        const dd = document.createElement('dd'); dd.textContent = value;
        summary.append(dt, dd); lines.push(`${label}: ${value}`);
      }
      answerText = lines.join('\n\n');
    }
    step++; show();
  };
  next.addEventListener('click', advance);
  back.addEventListener('click', () => { if (step > 0) { step--; show(); } });
  form.addEventListener('submit', e => { e.preventDefault(); advance(); });
  document.getElementById('copy-answers').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(answerText);
      feedback.textContent = 'Answers copied. Nothing has been submitted.';
    } catch {
      const fallback = document.getElementById('copy-fallback');
      fallback.hidden = false; fallback.value = answerText; fallback.focus(); fallback.select();
      feedback.textContent = 'Select and copy the answers below. Nothing has been submitted.';
    }
  });
})();
