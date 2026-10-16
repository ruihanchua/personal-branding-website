(() => {
  const status = document.getElementById('photo-status');
  const save = document.getElementById('save-photos');
  let editing = false;
  const editButton = document.getElementById('edit-text');
  const textBlocks = [...document.querySelectorAll('main h1, main h2, main h3, main p, main li, main summary, main a.button .editable-label, main a.text-link .editable-label')];
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
    clone.querySelector('body').classList.remove('edit-mode');
    for (const element of clone.querySelectorAll('[contenteditable]')) element.removeAttribute('contenteditable');
    clone.querySelector('#preview-photo-script').remove();
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
