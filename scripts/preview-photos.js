(() => {
  const status = document.getElementById('photo-status');
  const save = document.getElementById('save-photos');
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
    clone.querySelector('#preview-photo-script').remove();
    const blob = new Blob(['<!doctype html>\n' + clone.outerHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ray-landing-page-with-photos.html';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = 'Page saved. Open the downloaded HTML file to view it with your photos.';
  });
})();
