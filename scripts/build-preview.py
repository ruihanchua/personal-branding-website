"""Build the standalone preview, with local-only photo selection and HTML export."""
from pathlib import Path
import base64
import re

ROOT = Path(__file__).resolve().parent.parent
page = (ROOT / 'index.html').read_text()
css = (ROOT / 'fonts.css').read_text() + '\n' + (ROOT / 'styles.css').read_text()
css = re.sub(r"url\('([^']+\.woff2)'\)", lambda m: "url('data:font/woff2;base64," + base64.b64encode((ROOT / m.group(1)).read_bytes()).decode() + "')", css)
page = re.sub(r'<link rel="stylesheet" href="(?:fonts|styles)\.css">', '', page)
page = page.replace('</head>', '<style>' + css + '</style></head>')
controls = '''<aside class="preview-tools" id="preview-tools" aria-label="Personalise this preview">
<div><strong>Add your photos</strong><p>Choose photos from your computer. They stay in this browser; nothing is uploaded.</p></div>
<div class="preview-photo-control"><label for="hero-file">Opening: waterfall portrait</label><input id="hero-file" type="file" accept="image/jpeg,image/png,image/webp"><label for="hero-position">Move photo up / down</label><input id="hero-position" type="range" min="0" max="100" value="65"></div>
<div class="preview-photo-control"><label for="about-file">Meet Ray: gallery portrait</label><input id="about-file" type="file" accept="image/jpeg,image/png,image/webp"><label for="about-position">Move photo up / down</label><input id="about-position" type="range" min="0" max="100" value="50"></div>
<button type="button" id="save-photos">Save my page with photos</button><p id="photo-status" role="status" aria-live="polite">Select either photo to see it in the page.</p>
</aside>'''
script = (ROOT / 'scripts' / 'preview-photos.js').read_text()
page = page.replace('<body>', '<body>' + controls).replace('</body>', '<script id="preview-photo-script">' + script + '</script></body>')
(ROOT / 'landing-page-preview.html').write_text(page)
print('Built standalone preview with local photo selection.')
