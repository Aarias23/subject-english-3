const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the real lesson code with a small DOM adapter; no browser dependencies.
function element() {
  return { innerHTML:'', textContent:'', hidden:true, disabled:false, style:{}, dataset:{}, attrs:{},
    events:{}, classList:{add(){},remove(){}}, setAttribute(k,v){this.attrs[k]=v;},
    querySelectorAll(){return [];}, addEventListener(k,fn){this.events[k]=fn;},focus(){} };
}
const nodes = new Map();
const get = id => { if(!nodes.has(id))nodes.set(id,element());return nodes.get(id); };
const stored = new Map();
let confirmation = false;
const context = {document:{getElementById:get, querySelector:get, addEventListener(){},createElement:element},
  localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},
  location:{href:'https://example.test/ingles-3/partitives-quantifiers.html',search:''},
  history:{replaceState(){}},URL,URLSearchParams,Blob,setTimeout,confirm:()=>confirmation};
const source = fs.readFileSync(path.join(__dirname,'partitives-quantifiers.js'),'utf8');
// Expose lexical data inside this test only.
vm.runInNewContext(source.replace(/\}\(\)\);\s*$/, 'globalThis.lessonTest={slides,banks,showSlide,completed,getState:()=>state};}());'),context);
const {slides,banks,showSlide,completed,getState} = context.lessonTest;
assert.equal(slides.length,20);
for(const [i,s] of slides.entries()) {
  assert.ok(s.title && s.lead && s.note);
  assert.ok(s.body || banks[s.activity]);
  showSlide(i);
  assert.match(get('slide-stage').innerHTML, /slide-title/);
  assert.equal(get('.progress').attrs['aria-valuenow'],String(i+1));
  assert.ok(!/undefined|NaN|\ufffd/.test(get('slide-stage').innerHTML));
}
showSlide(-5);assert.equal(get('previous').disabled,true);
showSlide(999);assert.equal(get('next').disabled,true);
const stage = get('slide-stage');
function choose(kind,i,j){
  const button=element();button.dataset={bank:kind,item:String(i),choice:String(j)};
  button.parentElement=element();button.parentElement.querySelectorAll=()=>[button];
  stage.events.click({target:{closest:selector=>selector==='[data-bank]'?button:null}});
}
for(const [kind,questions] of Object.entries(banks)) {
  for(const [i,q] of questions.entries()) {
    assert.equal(q[2].filter(o=>o===q[1]).length,1);
    const right=q[2].indexOf(q[1]),wrong=(right+1)%q[2].length;
    choose(kind,i,wrong);assert.equal(getState().answers[kind+'-'+i].solved,false);
    assert.match(get('feedback-'+kind+'-'+i).textContent,/Try again/);
    choose(kind,i,right);assert.equal(getState().answers[kind+'-'+i].solved,true);
    choose(kind,i,wrong);assert.equal(getState().answers[kind+'-'+i].solved,true);
  }
  assert.equal(completed(kind),questions.length);
}
const input={matches:()=>true,dataset:{writing:'picnic-plan'},value:'We need two bottles of water.'};
stage.events.input({target:input});
assert.equal(getState().writing['picnic-plan'],input.value);
assert.match(stored.get('ingles-3-quantity-studio-v1'),/two bottles/);
showSlide(19);assert.match(get('lesson-results').textContent,/6 \/ 6 partitives · 8 \/ 8 quantifiers/);
stage.events.click({target:{closest:selector=>selector==='#reset-work'?{}:null}});
assert.equal(completed('portions'),6); // Cancel preserves work.
confirmation=true;
stage.events.click({target:{closest:selector=>selector==='#reset-work'?{}:null}});
assert.equal(completed('portions'),0);assert.equal(Object.keys(getState().writing).length,0);
for(const file of ['index.html','countable-nouns.html','partitives-quantifiers.html']) {
  const html=fs.readFileSync(path.join(__dirname,file),'utf8');
  for(const [,url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if(/^https?:/.test(url))continue;
    assert.ok(fs.existsSync(path.resolve(__dirname,url.split(/[?#]/)[0])),file+': '+url);
  }
}
console.log('PASS: 20 slides rendered, 14 answer keys, retry/success/locking, navigation bounds, local saving, progress, cancel/reset and local HTML links.');
