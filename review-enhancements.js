/* Review interactions; no credentials or browser-only shared-note storage. */
const feedbackForm='https://docs.google.com/forms/d/e/1FAIpQLSdKR8pSMvWVP1ZR3SKT3st8ctvWvUSG5u422YP3YUQ7bjHJOg/viewform';
if(!embedded)document.querySelector('.inputs-link').href='school-inputs-v4.html';
if(embedded){
 const pageId=params.get('page')||'home';
 if(pageId==='contact'){
  const details=document.querySelector('.contact-details');
  if(details){details.querySelector('dd').textContent='Behind SDKS Bhawan, Rajpura Road, Patiala, Punjab 147001';details.insertAdjacentHTML('beforeend','<a class="text-link" href="https://maps.app.goo.gl/fojNSwKyyEkAcUBm6" target="_blank" rel="noopener">View school location ↗</a>');}
 }
 if(pageId==='home'){
  const slides=[
   {title:'More than Education.\nA Way of Living.',text:'Learning to read, to ask questions, to care for others. At SDKS, these belong together.',visual:'Child absorbed in a book or hands-on activity',link:'about',label:'Get to know SDKS'},
   {title:'The Art of Living.\nThe Joy of Learning.',text:'Stories and play in the early years. Questions and discovery as children grow.',visual:'Teacher and younger children learning together',link:'learning',label:'How children will learn'},
   {title:'A Space for\nTheir Next Chapter.',text:'Our Patiala campus is taking shape for the April 2027 session, from Nursery to Class V.',visual:'Dated campus photograph or approved walkthrough',link:'campus',label:'See the campus plans',video:true,src:'',poster:''}
  ];
  const hero=document.querySelector('.hero');hero.classList.add('hero-carousel');
  hero.setAttribute('aria-roledescription','carousel');hero.setAttribute('aria-label','Introducing the school');
  hero.innerHTML=`<div class="container"><div class="hero-slide" aria-live="polite" aria-atomic="true"></div><div class="hero-controls"><span class="hero-counter"></span><div class="hero-dots" role="group" aria-label="Choose introduction slide">${slides.map((s,i)=>`<button data-slide="${i}" aria-label="Slide ${i+1}: ${esc(s.title.replace(/\n/g,' '))}">${String(i+1).padStart(2,'0')}</button>`).join('')}</div><button class="hero-prev" aria-label="Previous slide">←</button><button class="hero-next" aria-label="Next slide">→</button></div>${note('Opening line follows the latest user preference. Slide 2 retains the earlier selected headline. Three distinct image positions; campus slide supports a click-to-play video when supplied. No automatic rotation or sound.')}</div>`;
  let current=0;
  function showSlide(i){
   hero.querySelector('video')?.pause();current=(i+slides.length)%slides.length;const s=slides[current];
   const visual=s.video&&s.src?`<video controls playsinline preload="none" poster="${esc(s.poster)}" aria-label="Campus walkthrough"><source src="${esc(s.src)}" type="video/mp4">Your browser cannot play this video.</video>`:media(s.visual);
   hero.querySelector('.hero-slide').innerHTML=`<div class="hero-copy"><p class="eyebrow">SDKS Sri Sri Academy · Patiala</p><h1>${esc(s.title)}</h1><p class="lead">${esc(s.text)}</p>${link(s.link,s.label,'button')}</div><div class="hero-visual">${visual}${s.video&&!s.src?'<p class="video-slot">Campus video coming soon</p>':''}</div>`;
   hero.querySelector('.hero-counter').textContent=`${String(current+1).padStart(2,'0')} / 03`;
   hero.querySelectorAll('[data-slide]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.slide)===current)));
   hero.querySelector('.hero-slide a').onclick=e=>{if(parent!==window){e.preventDefault();parent.postMessage({type:'sdks-navigate',page:s.link},location.origin);}};
  }
  hero.querySelector('.hero-prev').onclick=()=>showSlide(current-1);hero.querySelector('.hero-next').onclick=()=>showSlide(current+1);
  hero.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>showSlide(Number(b.dataset.slide)));
  hero.querySelector('.hero-controls').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();showSlide(current+(e.key==='ArrowRight'?1:-1));}});
  showSlide(0);
 }
 // Google Form stores submitted comments in the linked response Sheet.
 // No GitHub account, verified email or one-response login restriction.
 document.body.insertAdjacentHTML('beforeend',`<button class="notes-launch" aria-expanded="false">Leave feedback</button><dialog class="notes-dialog" aria-labelledby="notes-title"><div class="notes-heading"><h2 id="notes-title">Leave feedback</h2><button class="notes-close" aria-label="Close feedback">×</button></div><p class="notes-context"></p><p class="notes-help">Share your suggestions for this page. No sign-in needed. Do not include personal or student details.</p><a class="feedback-open" target="_blank" rel="noopener">Open form in a new tab ↗</a><div class="feedback-embed"></div></dialog>`);
 const dialog=document.querySelector('.notes-dialog');let returnFocus=null;
 function openNotes(section){
  returnFocus=document.activeElement;
  const device=innerWidth<=480?'Mobile':innerWidth<=800?'Tablet':'Desktop';
  const context=`${pages[pageId].title} / ${section} / ${device} (${innerWidth}px)`;
  const url=new URL(feedbackForm);url.searchParams.set('usp','pp_url');url.searchParams.set('entry.1996721489',context);
  dialog.querySelector('.notes-context').textContent=context;
  dialog.querySelector('.feedback-open').href=url.href;
  url.searchParams.set('embedded','true');
  dialog.querySelector('.feedback-embed').innerHTML=`<iframe title="Feedback form — ${esc(section)}" src="${esc(url.href)}"></iframe>`;
  dialog.showModal();
 }
 dialog.querySelector('.notes-close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>returnFocus?.focus());
 document.querySelector('.notes-launch').onclick=function(){document.body.classList.add('review-notes-on');this.setAttribute('aria-expanded','true');openNotes('Whole page');};
 document.querySelectorAll('main > section').forEach((s,i)=>{const title=s.querySelector('h2')?.textContent||'Hero slideshow';const btn=document.createElement('button');btn.className='section-note';btn.textContent='Comment on this section';btn.setAttribute('aria-label',`Comment on ${title}`);btn.onclick=()=>openNotes(`${i+1}. ${title}`);s.append(btn);});
}
