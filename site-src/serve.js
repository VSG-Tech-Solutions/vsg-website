#!/usr/bin/env node
/* Local preview with Vercel's cleanUrls: node site-src/serve.js [port=5600]
   /endorse serves endorse.html, / serves index.html. No npm packages. */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.dirname(__dirname), PORT = +process.env.PORT || +process.argv[2] || 5600;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.includes('..')) { res.writeHead(400); return res.end(); }
  let f = path.join(ROOT, p === '/' ? 'index.html' : p);
  if (!path.extname(f) && fs.existsSync(f + '.html')) f += '.html';
  fs.readFile(f, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('404 ' + p); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(buf);
  });
}).listen(PORT, () => console.log('VSG site on http://localhost:' + PORT + '/kit'));
