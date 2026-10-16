(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const elements = document.querySelectorAll('.problem-heading, .problem-cards article, .section-heading, .method-steps article, .example-block, .about-copy, .name-art, .service-cards article, .faq-items, .application-intro, .application-card');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    for (const element of elements) { element.classList.add('reveal-pending'); observer.observe(element); }
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) { observer.disconnect(); elements.forEach(e => e.classList.remove('reveal-pending')); }
    });
    const count = document.querySelector('[data-count]');
    if (count) {
      const counter = new IntersectionObserver(entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        counter.disconnect();
        const target = Number(count.dataset.count);
        const start = performance.now();
        const tick = now => {
          const progress = Math.min(1, (now - start) / 700);
          count.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1 && !reducedMotion.matches) requestAnimationFrame(tick);
          else count.textContent = String(target);
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.5 });
      counter.observe(count);
    }
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
