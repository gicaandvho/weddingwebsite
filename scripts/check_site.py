"""Validate public page structure, local links, tabs, and approved content."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parents[1]
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr','path','ellipse'}

class Page(HTMLParser):
    def __init__(self, file):
        super().__init__(convert_charrefs=True)
        self.file, self.ids, self.elements, self.text, self.stack = file, set(), [], [], []
        self.feed(file.read_text(encoding='utf-8'))
        assert not self.stack, (file.name, 'Unclosed tags', self.stack)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag,attrs))
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, (self.file.name,'Duplicate ID',attrs['id'])
            self.ids.add(attrs['id'])
        if tag not in VOID: self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag,attrs)
        if tag not in VOID: self.stack.pop()

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, (self.file.name,'Unbalanced tag',tag,self.stack[-3:])
        self.stack.pop()

    def handle_data(self,data): self.text.append(data)

pages = {file.name: Page(file) for file in ROOT.glob('*.html')}
for name,page in pages.items():
    for tag,attrs in page.elements:
        for key in ['href','src']:
            value = attrs.get(key)
            if not value: continue
            url = urlsplit(value)
            if url.scheme or url.netloc: continue
            destination = unquote(url.path) or name
            assert (ROOT/destination).exists(), (name,'Missing asset/page',value)
            if url.fragment and destination in pages:
                assert unquote(url.fragment) in pages[destination].ids, (name,'Missing anchor',value)
        if 'data-panel' in attrs:
            assert 'tab-'+attrs['id'] in page.ids, (name,'Missing tab control',attrs['id'])
        if 'aria-labelledby' in attrs:
            for id in attrs['aria-labelledby'].split(): assert id in page.ids, (name,'Missing accessible label',id)
    text = ' '.join(page.text)
    assert not re.search(r'Game Master|Bank Heist|Final Boss|Quest Hub|Player Registered|example\.com|Placeholder answer',text,re.I), name

guide = pages['guide.html']
assert sum('faq-item' == attrs.get('class') for _,attrs in guide.elements) == 10
assert sum('outfit-card' == attrs.get('class') for _,attrs in guide.elements) == 12
assert all(code in (ROOT/'guide.html').read_text(encoding='utf-8') for code in ['#3A2B20','#7E6A52','#B89C82'])
for name in ['index.html','wedding.html','guide.html','gallery.html','rsvp.html']:
    assert sum(tag == 'footer' for tag,_ in pages[name].elements) == 1
assert not any(tag in {'form','input','select','textarea'} for tag,_ in pages['rsvp.html'].elements)
wedding = ' '.join(pages['wedding.html'].text)
for time in ['10:00 AM','11:00 AM','12:30 PM','12:45 PM','1:30 PM','4:00 PM']: assert time in wedding
assert 'Guest Welcome · 11:00 AM' in wedding
assert 'January 16, 2027' in ' '.join(pages['rsvp.html'].text)
print('PASS: 10 HTML pages; balanced markup; unique IDs; local links/assets; tab and ARIA targets; 10 FAQs; 12 outfit cards; timeline; RSVP gateway; no prohibited public content.')

# The illustrated V2 direction applies outside Gallery, including CSS scene assets.
assert (ROOT/'BUILD_SPEC_FINAL_V2.md').exists()
for name in ['index.html','wedding.html','guide.html','rsvp.html']:
    for tag, attrs in pages[name].elements:
        if tag == 'img': assert attrs.get('src','').startswith('assets/pixel/'), (name,'Non-gallery illustration required')
        assert tag != 'video', (name,'Real video belongs in Gallery')
    assert any(tag == 'link' and urlsplit(attrs.get('href','')).path == 'css/pixel.css' for tag,attrs in pages[name].elements)
for stylesheet in ['global.css','pixel.css']:
    css_path = ROOT/'css'/stylesheet
    for url in re.findall(r'url\([\"\']?([^\)\"\']+)', css_path.read_text(encoding='utf-8')):
        if not urlsplit(url).scheme: assert (css_path.parent/url).exists(), (stylesheet,'Missing scene',url)
assert 'data-home-photo' not in (ROOT/'index.html').read_text(encoding='utf-8')
print('PASS: V2 source specification, pixel artwork references, and Gallery-only real-media structure.')

# Generated artwork must reserve its intrinsic size before lazy loading.
for name, page in pages.items():
    for tag, attrs in page.elements:
        if tag == 'img' and attrs.get('src', '').startswith('assets/pixel/'):
            assert int(attrs.get('width', 0)) > 0 and int(attrs.get('height', 0)) > 0, (name, 'Missing image dimensions')
        if tag in {'script', 'link'}:
            url = urlsplit(attrs.get('src') or attrs.get('href', ''))
            if name in {'index.html','wedding.html','guide.html','gallery.html','rsvp.html'} and url.path.endswith(('.css', '.js')):
                import hashlib
                expected = hashlib.sha256((ROOT / url.path).read_bytes()).hexdigest()[:12]
                assert url.query == 'v=' + expected, (name, 'Stale generated asset version', url.path)
print('PASS: reserved artwork dimensions and current CSS/JavaScript content versions.')
