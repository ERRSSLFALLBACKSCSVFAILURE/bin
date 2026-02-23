const e = require('express');
const a = e(); 
const b = require('body-parser');
const c = require('crypto');
const d = require('fs'); 
const f = require('path'); 
const g = require('cors'); 
const x = require('chalk');
const y = require('gradient-string');

var h = b.urlencoded({ extended: true });

var i = b.json(); 
a.use(h);
a.use(i); 
a.use(g());
a.use(e.static(__dirname)); 
var j = 3000; 
var k = './pastes/';

if (!d.existsSync(k)) d.mkdirSync(k, { recursive: true }); 
a.get('/', (l, m) => { m.sendFile(__dirname + '/index.html') });

a.post('/api/upload', (l, m) => { 
var n = l.body; var o = n.content; 
var p = n.filename || 'upload.txt';

if (!o || o.trim() === '') return m.json({ z: 'error', aa: 'EMPTY', id: null }); 
var q = c.randomBytes(4).toString('hex');

var r = { id: q, content: o, filename: p, created: new Date() }; 
var s = f.join(k, q + '.json');

d.writeFileSync(s, JSON.stringify(r)); 
m.json({ z: 'success', aa: 'OK', id: q }) });

a.get('/raw/:id', (l, m) => { 
var t = l.params.id; var u = f.join(k, t + '.json');

if (d.existsSync(u)) { 
var v = d.readFileSync(u, 'utf8'); 
var w = JSON.parse(v);

m.set('Content-Type', 'text/plain'); 
m.send(w.content) } else { m.status(404).send('NOT FOUND') } });

console.log(y.rainbow('██████╗ ███████╗██╗██╗  ██╗███████╗'));
console.log(y.rainbow('██╔══██╗██╔════╝██║╚██╗██╔╝╚══███╔╝'));
console.log(y.rainbow('██████╔╝█████╗  ██║ ╚███╔╝   ███╔╝ '));
console.log(y.rainbow('██╔══██╗██╔══╝  ██║ ██╔██╗  ███╔╝  '));
console.log(y.rainbow('██║  ██║███████╗██║██╔╝ ██╗███████╗'));
console.log(y.rainbow('╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝╚══════╝'));
console.log(' ');
console.log(x.bold.bgHex('#ff8800')(' '.repeat(5) + 'UPLOAD' + ' '.repeat(5)));
console.log(x.hex('#88ff00')('> ' + j + ' <'));
console.log(x.hex('#ff3300')('> ' + new Date().toLocaleTimeString() + ' <'));
console.log(x.hex('#ff8800')('> ' + __dirname + ' <'));
console.log(x.bold.bgHex('#88ff00')(' '.repeat(5) + 'READY' + ' '.repeat(5)));