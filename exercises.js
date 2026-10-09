window.english3Interview = 'Host: What grade are you in, Alex? Alex: I am in eleventh grade. I am a junior. Host: What is your favorite subject? Alex: I like history because I enjoy learning about the past. Host: What do you do after school? Alex: I go to the music club on Tuesdays.';
window.english3Scenarios = [
  {title:'A new classmate',text:'You meet a classmate before your first lesson. You want to start a conversation.',options:['How much money does your family make?','Hi! Is this your first class here?'],answer:1,explanation:'A shared class is a comfortable starting topic.'},
  {title:'An invitation',text:'A classmate invites you to a small dinner. You want to bring a friend.',options:['May I bring a friend?','I will bring three friends without asking.'],answer:0,explanation:'Ask your host before adding another guest.'},
  {title:'Running late',text:'You expect to arrive ten minutes after a scheduled study meeting begins.',options:['I am running ten minutes late. Would you like to start without me?','I do not need to say anything.'],answer:0,explanation:'Let your partner know so they can decide how to use their time.'},
  {title:'A school rule',text:'You do not understand a rule about phones in class.',options:['Could you explain when we may use our phones?','Every school has the same phone rules.'],answer:0,explanation:'Ask for clarification. Policies can vary.'}
];
window.bindEnglish3 = function(stage) {
  stage.querySelectorAll('.vocab-card').forEach(button => button.onclick = () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.querySelector('.vocab-answer').hidden = !open;
    button.querySelector('.vocab-hint').textContent = open ? 'Hide meaning' : 'Reveal meaning';
  });
  const bank = stage.querySelector('#sequence-bank');
  if (bank) {
    const stages = ['Kindergarten','Elementary school','Middle school','High school'], chosen = [], order = [2,0,3,1];
    const answer = stage.querySelector('#sequence-answer'), feedback = stage.querySelector('#sequence-feedback');
    function paint() {
      bank.replaceChildren(); answer.replaceChildren();
      order.filter(i => !chosen.includes(i)).forEach(i => {
        const b = document.createElement('button'); b.type='button'; b.textContent=stages[i];
        b.onclick=()=>{chosen.push(i); feedback.textContent='Click Check pathway when all four stages are ready.';paint();};bank.append(b);
      });
      chosen.forEach((i,pos)=>{
        const b=document.createElement('button');b.type='button';b.textContent=(pos+1)+'. '+stages[i];
        b.onclick=()=>{chosen.splice(pos,1);feedback.textContent='Stage returned. Keep arranging your pathway.';paint();};answer.append(b);
      });
    }
    stage.querySelector('#sequence-check').onclick=()=>{feedback.textContent=chosen.length!==4 ? 'Choose all four stages first.' : chosen.every((n,i)=>n===i) ? 'Correct! Kindergarten, elementary, middle school, high school. Now explain it aloud.' : 'Try again. Start with kindergarten and finish with high school.';};
    stage.querySelector('#sequence-reset').onclick=()=>{chosen.length=0;feedback.textContent='Click a stage to add it. Click a chosen stage to return it.';paint();};paint();
  }
  const play=stage.querySelector('#listen-play');
  if(play){
    const status=stage.querySelector('#audio-status'), stop=stage.querySelector('#listen-stop');
    play.onclick=()=>{
      if(!window.speechSynthesis || !window.SpeechSynthesisUtterance){status.textContent='Voice unavailable. Open Transcript and ask your teacher to read it.';return;}
      window.speechSynthesis.cancel();
      const utterance=new SpeechSynthesisUtterance(window.english3Interview);
      const voice=window.speechSynthesis.getVoices().find(v=>/^en-US/i.test(v.lang)) || window.speechSynthesis.getVoices().find(v=>/^en/i.test(v.lang));
      if(voice) utterance.voice=voice;
      utterance.lang='en-US';utterance.rate=Number(stage.querySelector('#listen-rate').value);
      utterance.onstart=()=>{status.textContent='Playing. Listen for the three details.';};
      utterance.onend=()=>{status.textContent='Finished. Answer the questions, or listen again.';};
      utterance.onerror=()=>{status.textContent='If no voice plays, use the transcript for teacher reading.';};
      status.textContent='Preparing device voice. The transcript is available below.';window.speechSynthesis.speak(utterance);
    };
    stop.onclick=()=>{if(window.speechSynthesis)window.speechSynthesis.cancel();status.textContent='Stopped. You can play again or read the transcript.';};
  }
  const scenario=stage.querySelector('#scenario-lab');
  if(scenario){let current=0;function paint(){
    const s=window.english3Scenarios[current];
    scenario.innerHTML=`<div class="scenario-heading"><h3>${s.title}</h3><span>${current+1} / 4</span></div><p class="scenario-text">${s.text}</p><div class="scenario-options">${s.options.map((o,i)=>`<button type="button" data-response="${i}">${o}</button>`).join('')}</div><p class="scenario-feedback" role="status">Choose a response and explain your reasoning.</p><button type="button" class="button" id="scenario-next">${current===3?'Back to first situation':'Next situation'}</button>`;
    scenario.querySelectorAll('[data-response]').forEach(b=>b.onclick=()=>{
      scenario.querySelectorAll('[data-response]').forEach(x=>x.classList.remove('correct','wrong'));
      const ok=Number(b.dataset.response)===s.answer;b.classList.add(ok?'correct':'wrong');
      scenario.querySelector('.scenario-feedback').textContent=(ok?'Good choice. ':'Try another response. ')+s.explanation;
    });
    scenario.querySelector('#scenario-next').onclick=()=>{current=(current+1)%4;paint();};
  }paint();}
};
