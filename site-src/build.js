#!/usr/bin/env node
/* VSG website build. No npm packages.
   node site-src/build.js            builds every page in site-src/pages
   node site-src/build.js home       builds one page (or several: home core)

   A page is site-src/pages/<name>.html with a front-matter block:
     ---
     title: VSG Procure | Buy the right stock at the right landed cost
     description: One or two sentences for search and link previews.
     path: /procure
     nav: procure
     ---
   Optional keys: og_title, og_description, announce (false hides the bar),
   noindex (true), body (extra body class), out (output file name).
   Optional siblings: pages/<name>.css and pages/<name>.js, emitted to
   assets/site/pages/<name>.css|js and linked only on that page.
   Output: repo root <name>.html (home -> index.html, _kit -> kit.html). */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = __dirname;
const ROOT = path.dirname(SRC);
const PAGES = path.join(SRC, 'pages');
const PARTS = path.join(SRC, 'partials');
const ASSETS = path.join(ROOT, 'assets', 'site');
const OUT_ASSETS = path.join(ASSETS, 'pages');
const SITE = 'https://vsgtech.co.za';

const read = f => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const hash = s => crypto.createHash('md5').update(s).digest('hex').slice(0, 8);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* nav keys and the menu group each one lights */
const GROUPS = { ace: 'platform', core: 'platform', endorse: 'platform', procure: 'platform', custom: 'platform',
  bootcamp: 'start', about: 'company', contact: 'company' };

function frontMatter(src, file) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) throw new Error(file + ': missing front-matter block (--- ... ---)');
  const meta = {};
  m[1].split('\n').forEach(line => {
    const i = line.indexOf(':');
    if (i < 1 || /^\s*#/.test(line)) return;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  });
  ['title', 'description', 'path'].forEach(k => { if (!meta[k]) throw new Error(file + ': front matter needs "' + k + '"'); });
  return { meta, body: src.slice(m[0].length) };
}

/* {{> name key="value" key2="value"}} includes site-src/partials/name.html.
   Inside a partial, {{key}} or {{key|default text}} reads the params. Nested includes work. */
function includes(html, depth) {
  if (depth > 6) throw new Error('partials nested too deep');
  return html.replace(/\{\{>\s*([a-z0-9_-]+)((?:\s+[a-z0-9_-]+="[^"]*")*)\s*\}\}/gi, (all, name, args) => {
    const f = path.join(PARTS, name + '.html');
    if (!fs.existsSync(f)) throw new Error('unknown partial: ' + name);
    const params = {};
    args.replace(/([a-z0-9_-]+)="([^"]*)"/gi, (a, k, v) => { params[k] = v; return a; });
    let part = read(f).replace(/^<!--[\s\S]*?-->\n?/, '');   /* a leading comment documents the partial */
    part = part.replace(/\{\{\s*([a-z0-9_-]+)(?:\|([^}]*))?\s*\}\}/gi, (a, k, def) =>
      Object.prototype.hasOwnProperty.call(params, k) ? params[k] : (def !== undefined ? def : ''));
    return includes(part, depth + 1);
  });
}

function fill(tpl, vars) {
  return tpl.replace(/\{\{\s*([a-z0-9_]+)\s*\}\}/gi, (a, k) => (k in vars ? vars[k] : ''));
}

/* Only the icons a page uses go into its inline sprite. */
function sprite(html) {
  const all = read(path.join(PARTS, 'icons.svg'));
  const used = new Set();
  html.replace(/href="#(i-[a-z0-9-]+)"/g, (a, id) => { used.add(id); return a; });
  const out = [];
  all.replace(/<symbol id="(i-[a-z0-9-]+)"[\s\S]*?<\/symbol>/g, (sym, id) => { if (used.has(id)) { out.push(sym); used.delete(id); } return sym; });
  if (used.size) console.warn('  warning: unknown icons ' + [...used].join(', '));
  return out.length ? '<svg class="w-sprite" aria-hidden="true" focusable="false"><defs>' + out.join('') + '</defs></svg>' : '';
}

function assetUrl(rel) {
  const f = path.join(ROOT, rel);
  return rel.replace(/\\/g, '/') + '?v=' + hash(fs.readFileSync(f));
}

function outName(name, meta) {
  if (meta.out) return meta.out;
  if (name === 'home') return 'index.html';
  return name.replace(/^_/, '') + '.html';
}

function build(name) {
  const file = path.join(PAGES, name + '.html');
  if (!fs.existsSync(file)) throw new Error('no page ' + file);
  const { meta, body } = frontMatter(read(file), name + '.html');
  const base = name.replace(/^_/, '');
  const out = outName(name, meta);

  /* page CSS and JS */
  fs.mkdirSync(OUT_ASSETS, { recursive: true });
  let pageCss = '', pageJs = '';
  const cssSrc = path.join(PAGES, name + '.css'), jsSrc = path.join(PAGES, name + '.js');
  if (fs.existsSync(cssSrc)) {
    fs.writeFileSync(path.join(OUT_ASSETS, base + '.css'), read(cssSrc));
    pageCss = '\n<link rel="stylesheet" href="' + assetUrl('assets/site/pages/' + base + '.css') + '">';
  }
  if (fs.existsSync(jsSrc)) {
    fs.writeFileSync(path.join(OUT_ASSETS, base + '.js'), read(jsSrc));
    pageJs = '\n<script src="' + assetUrl('assets/site/pages/' + base + '.js') + '" defer></script>';
  }

  const navKey = meta.nav || '';
  const vars = {
    title: esc(meta.title),
    description: esc(meta.description),
    og_title: esc(meta.og_title || meta.title),
    og_description: esc(meta.og_description || meta.description),
    canonical: SITE + (meta.path === '/' ? '/' : meta.path),
    robots: meta.noindex === 'true' ? '<meta name="robots" content="noindex, nofollow">' : '<meta name="robots" content="index, follow">',
    css_halo: assetUrl('assets/site/halo.css'),
    css_site: assetUrl('assets/site/site.css'),
    js_site: assetUrl('assets/site/site.js'),
    page_css: pageCss,
    page_js: pageJs,
    body_class: ('w-page w-page-' + base + ' ' + (meta.body || '')).trim(),
    year: String(new Date().getFullYear()),
  };
  Object.keys(GROUPS).concat(['home']).forEach(k => { vars['cur_' + k] = k === navKey ? ' aria-current="page"' : ''; });
  ['platform', 'start', 'company'].forEach(g => { vars['grp_' + g] = GROUPS[navKey] === g ? ' is-current' : ''; });
  vars.announce = meta.announce === 'false' ? '' : fill(includes(read(path.join(PARTS, 'announce.html')), 0), vars);

  const head = fill(read(path.join(PARTS, 'head.html')), vars);
  const nav = fill(includes(read(path.join(PARTS, 'nav.html')), 0), vars);
  const footer = fill(includes(read(path.join(PARTS, 'footer.html')), 0), vars);
  const main = includes(body, 0).replace(/<!--[\s\S]*?-->\n?/g, '').trim();   /* builder notes stay in the source, not in the served page */

  let html = head + '\n<body class="' + vars.body_class + '">\n' + '%%SPRITE%%' + nav + '\n<main id="main" tabindex="-1">\n' + main + '\n</main>\n' + footer + '\n</body>\n</html>\n';
  html = html.replace('%%SPRITE%%', sprite(html) + '\n');
  /* the 404 is served at any depth (/old/path/x), so its asset paths must be root-absolute */
  if (name === '404') html = html.replace(/(href|src)="assets\//g, '$1="/assets/');

  /* guard rails: the copy rules the whole site shares */
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const problems = [];
  if (/[–—]/.test(text)) problems.push('an en or em dash');
  if (new RegExp('<' + 'img\\b', 'i').test(text)) problems.push('an image tag (the site has no raster images)');
  if (/\{\{/.test(main)) problems.push('an unresolved {{...}}');
  const banned = BANNED && text.replace(/<!--[\s\S]*?-->/g, '').match(BANNED);
  if (banned) problems.push('a banned name (' + banned[0] + ')');
  problems.forEach(p => console.warn('  warning: ' + out + ' contains ' + p));

  fs.writeFileSync(path.join(ROOT, out), html);
  if (meta.noindex !== 'true' && name !== '404') SITEMAP.push(meta.path);
  console.log('built ' + out + (pageCss ? ' +css' : '') + (pageJs ? ' +js' : ''));
}

const SITEMAP = [];

/* names that must never reach a public page. The list lives in site-src/banned.local.txt, one per line,
   and stays out of git because the repo is public. Without the file the check is skipped. */
const BANNED = (() => {
  const f = path.join(__dirname, 'banned.local.txt');
  if (!fs.existsSync(f)) { console.warn('  note: site-src/banned.local.txt not found, banned-name check skipped'); return null; }
  const terms = fs.readFileSync(f, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  return terms.length ? new RegExp('\\b(' + terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\b', 'i') : null;
})();

/* sitemap.xml and robots.txt, written only on a full build so a one-page build never drops pages */
function writeSitemap() {
  const urls = SITEMAP.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
    .map(p => '  <url><loc>' + SITE + p + '</loc></url>').join('\n');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n');
  fs.writeFileSync(path.join(ROOT, 'robots.txt'),
    'User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ' + SITE + '/sitemap.xml\n');
  console.log('wrote sitemap.xml (' + SITEMAP.length + ' urls) and robots.txt');
}

const args = process.argv.slice(2);
const names = args.length ? args : fs.readdirSync(PAGES).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5));
let failed = 0;
names.forEach(n => { try { build(n); } catch (e) { failed++; console.error('error: ' + e.message); } });
if (!args.length && !failed) writeSitemap();
process.exit(failed ? 1 : 0);
