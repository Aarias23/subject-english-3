const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function element(){return {children:[],attrs:{},textContent:'',hidden:true,append(n){this.children.push(n)},replaceChildren(){this.children=[]},setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]},classList:{add(){},remove(){}}};}
const context={window:{},document:{createElement:element},SpeechSynthesisUtterance:class {constructor(text){this.text=text;}}};
vm.createContext(context);
for(const file of ['lesson.js','exercises.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context);
const slides=context.window.english3Slides;
assert.equal(slides.length,37);
assert.match(slides[0].title,/Introduce/);assert.match(slides[0].body,/student-introductions.jpg/);assert.match(slides[4].title,/education system/);assert.match(slides[19].title,/American culture/);
for(const s of slides){assert.ok(s.title&&s.body&&s.teacher.purpose&&s.teacher.notes.length&&s.teacher.answer&&s.teacher.source);assert.ok(!/undefined|NaN|\ufffd/.test(JSON.stringify(s)));for(const m of s.body.matchAll(/data-quiz data-answer="(\d+)"[^>]*>(.*?)<\/div>/gs))assert.ok(Number(m[1])<[...m[2].matchAll(/data-choice=/g)].length);}
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
for(const [,f]of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g))assert.ok(fs.existsSync(path.join(__dirname,f)),f);
for(const s of slides)for(const [,f]of s.body.matchAll(/src="([^"]+)"/g))assert.ok(fs.existsSync(path.join(__dirname,f)),f);
const ids=['sequence-bank','sequence-answer','sequence-check','sequence-reset','sequence-feedback'];const nodes=Object.fromEntries(ids.map(id=>['#'+id,element()]));
context.window.bindEnglish3({querySelector:k=>nodes[k],querySelectorAll:()=>[]});
nodes['#sequence-check'].onclick();assert.match(nodes['#sequence-feedback'].textContent,/all four/);
for(const word of ['High school','Middle school','Elementary school','Kindergarten'])nodes['#sequence-bank'].children.find(b=>b.textContent===word).onclick();
nodes['#sequence-check'].onclick();assert.match(nodes['#sequence-feedback'].textContent,/Try again/);
nodes['#sequence-answer'].children[0].onclick();assert.equal(nodes['#sequence-answer'].children.length,3);
nodes['#sequence-reset'].onclick();assert.equal(nodes['#sequence-answer'].children.length,0);
for(const word of ['Kindergarten','Elementary school','Middle school','High school'])nodes['#sequence-bank'].children.find(b=>b.textContent===word).onclick();
nodes['#sequence-check'].onclick();assert.match(nodes['#sequence-feedback'].textContent,/Correct/);
const card=element(),meaning=element(),hint=element();card.attrs['aria-expanded']='false';card.querySelector=k=>k==='.vocab-answer'?meaning:hint;
context.window.bindEnglish3({querySelector:()=>null,querySelectorAll:()=>[card]});card.onclick();assert.equal(meaning.hidden,false);card.onclick();assert.equal(meaning.hidden,true);
const audio={'#listen-play':element(),'#listen-stop':element(),'#listen-rate':{value:'0.85'},'#audio-status':element()};
context.window.bindEnglish3({querySelector:k=>audio[k],querySelectorAll:()=>[]});audio['#listen-play'].onclick();assert.match(audio['#audio-status'].textContent,/unavailable/);
let spoken;context.window.SpeechSynthesisUtterance=context.SpeechSynthesisUtterance;context.window.speechSynthesis={cancel(){},getVoices(){return[{lang:'en-US'}]},speak(u){spoken=u}};
audio['#listen-play'].onclick();assert.equal(spoken.rate,.85);assert.match(spoken.text,/eleventh grade/);spoken.onend();assert.match(audio['#audio-status'].textContent,/Finished/);audio['#listen-stop'].onclick();assert.match(audio['#audio-status'].textContent,/Stopped/);
for(const s of context.window.english3Scenarios){assert.ok(s.answer>=0&&s.answer<s.options.length);assert.ok(s.explanation);}
console.log('PASS: 37 slides, both modules, quiz answer keys, local assets, pathway success/retry/removal/reset, vocabulary reveals, audio fallback/play/stop.');
