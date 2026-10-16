"""Build the standalone preview, with local-only photo selection and HTML export."""
from pathlib import Path
import base64
import re

ROOT = Path(__file__).resolve().parent.parent
page = (ROOT / 'index.html').read_text()
css = (ROOT / 'fonts.css').read_text() + '\n' + (ROOT / 'styles.css').read_text()
css = re.sub(r"url\('([^']+\.woff2)'\)", lambda m: "url('data:font/woff2;base64," + base64.b64encode((ROOT / m.group(1)).read_bytes()).decode() + "')", css)
page = re.sub(r'src="(images/[^"]+\.jpg)"', lambda m: 'src="data:image/jpeg;base64,' + base64.b64encode((ROOT / m.group(1)).read_bytes()).decode() + '"', page)
page = re.sub(r'<link rel="stylesheet" href="(?:fonts|styles)\.css">', '', page)
page = page.replace('</head>', '<style>' + css + '</style></head>')
site_script = (ROOT / 'site.js').read_text()
page = page.replace('<script src="site.js" defer></script>', '')
page = re.sub(r'(?m)^[ \t]+$', '', page)
page = page.replace('</body>', '<script id="site-script">' + site_script + '</script></body>')
(ROOT / 'ray-landing-page.html').write_text(page)
controls = '''<aside class="preview-tools" id="preview-tools" aria-label="Personalise your page">
<div><strong>Make this page yours</strong><p>Your photos are included. Replace them or edit the wording below. Changes stay in this browser until you save a new file.</p></div>
<div class="preview-photo-control"><label for="hero-file">Opening photo</label><input id="hero-file" type="file" accept="image/jpeg,image/png,image/webp"><label for="hero-position">Move photo up / down</label><input id="hero-position" type="range" min="0" max="100" value="63"></div>
<div class="preview-photo-control"><label for="about-file">Meet Ray photo</label><input id="about-file" type="file" accept="image/jpeg,image/png,image/webp"><label for="about-position">Move photo up / down</label><input id="about-position" type="range" min="0" max="100" value="50"></div>
<div class="preview-typeform"><label for="typeform-url">Your published Typeform link (optional)</label><input id="typeform-url" type="url" placeholder="https://form.typeform.com/to/…"><button type="button" id="connect-typeform">Connect Typeform</button><p>Create and publish your form in Typeform, then paste its link here. An empty link keeps the local questionnaire preview.</p></div><div class="edit-controls"><button type="button" id="edit-text" aria-pressed="false">Edit page text</button><p>Turn editing on, then click a heading, paragraph or button below. Use ⌘B / ⌘I (Ctrl on Windows) for bold / italic.</p></div><button type="button" id="save-photos">Save my page</button><p id="photo-status" role="status" aria-live="polite">Your selected photos are included. Save your page when you’re happy with the photos and wording.</p>
</aside>'''
script = (ROOT / 'scripts' / 'preview-photos.js').read_text()
page = page.replace('<body>', '<body>' + controls).replace('</body>', '<script id="preview-photo-script">' + script + '</script></body>')
(ROOT / 'landing-page-preview.html').write_text(page)
print('Built standalone preview with local photo selection.')
