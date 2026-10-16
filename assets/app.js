
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const progress=$('#progress'), sections=$$('.section'), nav=$$('.nav a[href^="#"]');
function scrollState(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%';let cur='';sections.forEach(s=>{if(s.getBoundingClientRect().top<145)cur=s.id});nav.forEach(a=>a.classList.toggle('active',a.hash==='#'+cur));}
addEventListener('scroll',scrollState,{passive:true});scrollState();
$('#menu')?.addEventListener('click',()=>$('#side').classList.toggle('open'));nav.forEach(a=>a.addEventListener('click',()=>$('#side').classList.remove('open')));
$('#search')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();sections.forEach(s=>s.classList.toggle('hidden',q&&!s.innerText.toLowerCase().includes(q)));});
$$('.codeWrap').forEach(w=>{const b=document.createElement('button');b.className='copy';b.textContent='Copiar';b.onclick=async()=>{try{await navigator.clipboard.writeText($('code',w).innerText);b.textContent='Copiado ✓';setTimeout(()=>b.textContent='Copiar',1200)}catch(e){b.textContent='Seleccionar'} };w.append(b)});
$$('.check input').forEach((c,i)=>{const k='ups-guide-check-'+i;c.checked=localStorage.getItem(k)==='1';c.onchange=()=>localStorage.setItem(k,c.checked?'1':'0')});
// Interactive outage simulator. Time is accelerated for demonstration only.
const log=$('#simlog');let timer=null,elapsed=0;
function add(msg){log.textContent+='['+new Date().toLocaleTimeString()+'] '+msg+'\n';log.scrollTop=log.scrollHeight;}
function node(id,cls){const e=$(id);e.className='node '+cls}function line(id,cls=''){const e=$(id);e.className='arrow '+cls}
function normal(){clearInterval(timer);elapsed=0;$('#counter').textContent='0 s';node('#mains','');node('#ups','');node('#host','');line('#a1');line('#a2');$('#simstate').textContent='OL · Red presente';add('UPS ONLINE (OL). Sistema en operación normal.');}
function outage(){clearInterval(timer);elapsed=0;node('#mains','off');node('#ups','bat');node('#host','');line('#a1','off');line('#a2','bat');$('#simstate').textContent='OB · Sistema en batería';add('ONBATT: upssched inicia timer de 180 s.');timer=setInterval(()=>{elapsed+=30;$('#counter').textContent=elapsed+' s';if(elapsed>=180){clearInterval(timer);fsd()}},450)}
function restore(){clearInterval(timer);normal();add('ONLINE: upssched cancela onbatt-long. No hay apagado.');}
function fsd(){node('#mains','off');node('#ups','bat');node('#host','shutdown');line('#a1','off');line('#a2','off');$('#simstate').textContent='FSD · Host apagado, UPS sigue activa';add('Timer vencido; ups.status sigue OB → upsmon -c fsd.');add('pve-guests detiene guests; luego systemctl poweroff apaga el host.');add('La UPS NO recibe killpower y puede seguir sosteniendo la red.');}
$('#normal')?.addEventListener('click',normal);$('#outage')?.addEventListener('click',outage);$('#restore')?.addEventListener('click',restore);$('#fsd')?.addEventListener('click',fsd);normal();
const gfilter=$('#glossarySearch');gfilter?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();$$('.term').forEach(t=>t.style.display=t.innerText.toLowerCase().includes(q)?'block':'none')});
