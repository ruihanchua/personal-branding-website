(() => {
  const status = document.getElementById('photo-status');
  const save = document.getElementById('save-photos');
  let editing = false;
  const editButton = document.getElementById('edit-text');
  const textBlocks = [...document.querySelectorAll('main h1, main h2, main h3, main p, main li, main summary, main a.button .editable-label, main a.text-link .editable-label, main form label:not(.consent-label), main form legend, main .application-process strong, main .industry-label, main .angle-note, main .angle-answer, main .storyboard strong')].filter(e => !e.closest('#application-review') && !['application-error', 'application-feedback'].includes(e.id) && !e.closest('.industry-copy'));
  editButton.addEventListener('click', () => {
    editing = !editing;
    document.body.classList.toggle('edit-mode', editing);
    editButton.setAttribute('aria-pressed', String(editing));
    editButton.textContent = editing ? 'Done editing text' : 'Edit page text';
    for (const element of textBlocks) {
      if (editing) element.setAttribute('contenteditable', 'true');
      else element.removeAttribute('contenteditable');
    }
    status.textContent = editing ? 'Click the wording in the page to edit it. Links pause while editing.' : 'Text editing off. Review your page, then save it to keep your changes.';
  });
  document.querySelector('main').addEventListener('click', event => {
    if (editing && event.target.closest('a, summary')) event.preventDefault();
  }, true);
  for (const block of textBlocks) {
    block.addEventListener('paste', event => {
      if (!editing) return;
      event.preventDefault();
      document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
    });
  }
  const typeformInput = document.getElementById('typeform-url');
  const application = document.getElementById('contact');
  typeformInput.value = application.dataset.typeformUrl || '';
  document.getElementById('connect-typeform').addEventListener('click', () => {
    const raw = typeformInput.value.trim();
    if (raw) {
      try {
        const url = new URL(raw);
        if (url.protocol !== 'https:' || url.username || url.password || url.port || !(url.hostname === 'typeform.com' || url.hostname.endsWith('.typeform.com')) || !/^\/to\/[A-Za-z0-9]+\/?$/.test(url.pathname)) throw new Error('Invalid');
      } catch {
        status.textContent = 'Please use a published HTTPS Typeform link, like https://form.typeform.com/to/YourFormID.';
        return;
      }
    }
    application.dataset.typeformUrl = raw;
    application.dispatchEvent(new Event('typeform-change'));
    status.textContent = raw ? 'Typeform connected in this preview. Save your page to keep the link.' : 'Typeform disconnected. The local questionnaire preview is shown.';
  });
  const videoInput = document.getElementById('intro-video-url');
  const hero = document.querySelector('.hero-art');
  videoInput.value = hero.dataset.videoUrl || '';
  document.getElementById('connect-video').addEventListener('click', () => {
    const previous = hero.dataset.videoUrl || '';
    hero.dataset.videoUrl = videoInput.value.trim();
    hero.dispatchEvent(new Event('video-change'));
    if (videoInput.value.trim() && document.getElementById('hero-video-trigger').hidden) {
      hero.dataset.videoUrl = previous;
      hero.dispatchEvent(new Event('video-change'));
      status.textContent = 'Use an HTTPS YouTube video link or public Vimeo video link.';
      return;
    }
    status.textContent = videoInput.value.trim() ? 'Intro video connected. Save your page to keep the link.' : 'Intro video removed. Your portrait remains in the opening.';
  });
  let pending = 0;
  for (const key of ['hero', 'about']) {
    const input = document.getElementById(`${key}-file`);
    const position = document.getElementById(`${key}-position`);
    const image = document.getElementById(`${key}-portrait`);
    const holder = image.parentElement;
    let version = 0;
    position.addEventListener('input', () => {
      image.style.objectPosition = `65% ${position.value}%`;
    });
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        status.textContent = 'Please choose a JPG, PNG or WebP photo.';
        return;
      }
      const selectedVersion = ++version;
      pending++;
      save.disabled = true;
      status.textContent = 'Opening your photo…';
      try {
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Read failed'));
          reader.readAsDataURL(file);
        });
        const check = new Image();
        check.src = data;
        await check.decode();
        if (selectedVersion !== version) return;
        image.src = data;
        image.style.objectPosition = `65% ${position.value}%`;
        holder.classList.add('has-photo');
        holder.removeAttribute('aria-hidden');
        holder.removeAttribute('role');
        holder.removeAttribute('aria-label');
        status.textContent = 'Photo added. Scroll down to review it, then save your page.';
      } catch {
        status.textContent = 'That photo could not be opened. Try a JPG or PNG version.';
      } finally {
        pending--;
        save.disabled = pending > 0;
      }
    });
  }
  save.addEventListener('click', () => {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelector('#preview-tools').remove();
    clone.querySelector('.mobile-menu').removeAttribute('open');
    clone.querySelector('body').classList.remove('edit-mode', 'motion-paused', 'depth-motion');
    clone.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped');
    clone.querySelector('#motion-toggle').setAttribute('aria-pressed', 'false');
    clone.querySelector('#motion-toggle').textContent = 'Pause animations';
    for (const element of clone.querySelectorAll('[contenteditable]')) element.removeAttribute('contenteditable');
    clone.querySelector('#preview-photo-script').remove();
    clone.querySelectorAll('.reveal-pending').forEach(e => e.classList.remove('reveal-pending'));
    clone.querySelectorAll('[data-count]').forEach(e => { e.textContent = e.dataset.count; });
    clone.querySelectorAll('.industry-copy').forEach(e => e.remove());
    const exportedRibbon = clone.querySelector('#industry-marquee');
    exportedRibbon.classList.remove('is-paused');
    const clonedForm = clone.querySelector('#application-form');
    for (const field of clonedForm.querySelectorAll('input, textarea, select')) {
      if (field.tagName === 'TEXTAREA') { field.value = ''; field.textContent = ''; }
      else if (field.tagName === 'SELECT') { field.selectedIndex = 0; field.querySelectorAll('option').forEach(o => o.removeAttribute('selected')); }
      else { field.value = ''; field.removeAttribute('value'); field.checked = false; field.removeAttribute('checked'); }
    }
    clonedForm.querySelectorAll('[data-step]').forEach((e, i) => { e.hidden = i !== 0; });
    clone.querySelector('#application-review').hidden = true;
    clone.querySelector('#application-summary').replaceChildren();
    clone.querySelector('#application-next').hidden = false;
    clone.querySelector('#application-next').innerHTML = 'Continue <span aria-hidden="true">→</span>';
    clone.querySelector('#application-back').hidden = true;
    clone.querySelector('#step-label').textContent = 'Step 1 of 3';
    clone.querySelector('#step-name').textContent = 'About you';
    clone.querySelector('#step-progress-bar').style.width = '33.333%';
    clone.querySelector('#application-error').textContent = '';
    clone.querySelector('#application-feedback').textContent = '';
    clone.querySelector('#copy-fallback').hidden = true;
    clone.querySelector('#typeform-live').replaceChildren();
    clone.querySelector('#intro-video-dialog').removeAttribute('open');
    clone.querySelector('#intro-video-player').replaceChildren();
    const blob = new Blob(['<!doctype html>\n' + clone.outerHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ray-landing-page-personalised.html';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = 'Page saved. Open the downloaded HTML file to view your photos and wording without editing controls.';
  });
})();
