#!/usr/bin/env python3
"""Generate blog/search-index.json from individual blog post HTML files.
Run from the repo root: python3 scripts/build-search-index.py
"""
import os, json, re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self._text = []
        self._skip = False

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style', 'nav', 'header', 'footer'):
            self._skip = True

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'nav', 'header', 'footer'):
            self._skip = False

    def handle_data(self, data):
        if not self._skip:
            self._text.append(data)

    def get_text(self):
        return re.sub(r'\s+', ' ', ' '.join(self._text)).strip()

def strip_html(html_fragment):
    p = TextExtractor()
    p.feed(html_fragment)
    return p.get_text()

def first_match(pattern, html, flags=re.DOTALL):
    m = re.search(pattern, html, flags)
    return strip_html(m.group(1)) if m else ''

blog_dir = 'blog'
posts = []

for slug in sorted(os.listdir(blog_dir)):
    path = os.path.join(blog_dir, slug, 'index.html')
    if not os.path.isfile(path):
        continue

    with open(path, encoding='utf-8') as f:
        html = f.read()

    title = first_match(r'class="post-hero__title"[^>]*>(.*?)</h1>', html)
    if not title:
        continue  # not a post page

    category = first_match(r'class="post-hero__category"[^>]*>(.*?)</a>', html)
    subtitle = first_match(r'class="post-hero__subtitle"[^>]*>(.*?)</p>', html)

    # Date: first <span> inside post-hero__meta
    date_m = re.search(r'class="post-hero__meta".*?<span>(.*?)</span>', html, re.DOTALL)
    date = strip_html(date_m.group(1)) if date_m else ''

    # Body text from the article
    body_m = re.search(r'<article[^>]*class="post-content"[^>]*>(.*?)</article>', html, re.DOTALL)
    body = strip_html(body_m.group(1)) if body_m else ''

    posts.append({
        'url':      f'/blog/{slug}',
        'title':    title,
        'subtitle': subtitle,
        'category': category,
        'date':     date,
        'body':     body[:6000],
    })

out = os.path.join(blog_dir, 'search-index.json')
with open(out, 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, separators=(',', ':'))

print(f'Built {len(posts)} entries → {out}')
