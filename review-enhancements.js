/* Review interactions; no credentials or browser-only shared-note storage. */
const reviewRepo='suryanshdadwal1-arch/sdks-website-wireframe';
const issuesURL=`https://github.com/${reviewRepo}/issues`;
if(!embedded)document.querySelector('.inputs-link').href='school-inputs-v4.html';
if(embedded){
 const pageId=params.get('page')||'home';
 if(pageId==='contact'){
  const details=document.querySelector('.contact-details');
  if(details){details.querySelector('dd').textContent='Behind SDKS Bhawan, Rajpura Road, Patiala, Punjab 147001';details.insertAdjacentHTML('beforeend','<a class="text-link" href="https://maps.app.goo.gl/fojNSwKyyEkAcUBm6" target="_blank" rel="noopener">View school location ↗</a>');}
 }
 if(pageId==='home'){
  const slides=[
   {title:'A Kinder, Brighter World\nBegins Here.',text:'A school where curiosity, care and learning belong together.',visual:'Child exploring a book or activity',link:'about',label:'About the school'},
   {title:'The Art of Living.\nThe Joy of Learning.',text:'Play-based beginnings, followed by learning through questions and experience.',visual:'Teacher and children learning together',link:'learning',label:'Explore learning'},
   {title:'A Campus\nin the Making.',text:'Our campus in Patiala is taking shape for the April 2027 session.',visual:'Dated campus photograph or approved walkthrough',link:'campus',label:'Explore the campus',video:true,src:'',poster:''}
  ];
  const hero=document.querySelector('.hero');hero.classList.add('hero-carousel');
  hero.setAttribute('aria-roledescription','carousel');hero.setAttribute('aria-label','Introducing the school');
  hero.innerHTML=`<div class="container"><div class="hero-slide" aria-live="polite" aria-atomic="true"></div><div class="hero-controls"><span class="hero-counter"></span><div class="hero-dots" role="group" aria-label="Choose introduction slide">${slides.map((s,i)=>`<button data-slide="${i}" aria-label="Slide ${i+1}: ${esc(s.title.replace(/\n/g,' '))}">${String(i+1).padStart(2,'0')}</button>`).join('')}</div><button class="hero-prev" aria-label="Previous slide">←</button><button class="hero-next" aria-label="Next slide">→</button></div>${note('Design 3 leads the introduction; slide 2 retains the previously selected headline. Three distinct image positions; campus slide supports a click-to-play video with poster and captions when supplied. No automatic rotation or sound.')}</div>`;
  let current=0;
  function showSlide(i){
   hero.querySelector('video')?.pause();current=(i+slides.length)%slides.length;const s=slides[current];
   const visual=s.video&&s.src?`<video controls playsinline preload="none" poster="${esc(s.poster)}" aria-label="Campus walkthrough"><source src="${esc(s.src)}" type="video/mp4">Your browser cannot play this video.</video>`:media(s.visual);
   hero.querySelector('.hero-slide').innerHTML=`<div class="hero-copy"><p class="eyebrow">SDKS Sri Sri Academy · Patiala</p><h1>${esc(s.title)}</h1><p class="lead">${esc(s.text)}</p>${link(s.link,s.label,'button')}</div><div class="hero-visual">${visual}${s.video&&!s.src?'<p class="video-slot">Optional campus video · File to be supplied</p>':''}</div>`;
   hero.querySelector('.hero-counter').textContent=`${String(current+1).padStart(2,'0')} / 03`;
   hero.querySelectorAll('[data-slide]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.slide)===current)));
   hero.querySelector('.hero-slide a').onclick=e=>{if(parent!==window){e.preventDefault();parent.postMessage({type:'sdks-navigate',page:s.link},location.origin);}};
  }
  hero.querySelector('.hero-prev').onclick=()=>showSlide(current-1);hero.querySelector('.hero-next').onclick=()=>showSlide(current+1);
  hero.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>showSlide(Number(b.dataset.slide)));
  hero.querySelector('.hero-controls').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();showSlide(current+(e.key==='ArrowRight'?1:-1));}});
  showSlide(0);
 }
 // Review notes are opt-in and kept outside the school content.
 document.body.insertAdjacentHTML('beforeend',`<button class="notes-launch" aria-expanded="false">Review notes</button><dialog class="notes-dialog" aria-labelledby="notes-title"><div class="notes-heading"><h2 id="notes-title">Website review notes</h2><button class="notes-close" aria-label="Close review notes">×</button></div><p class="notes-context"></p><p class="notes-help">Notes are saved as public GitHub issues. Anyone can read them; a GitHub account is needed to post. Please do not include phone numbers, pupil details or other private information.</p><label>Your note<textarea id="review-note" maxlength="3000" rows="4" placeholder="What would you like changed?"></textarea></label><p class="note-draft-warning">Not saved yet. Continue to GitHub and select “Submit new issue” to save.</p><button class="button note-submit">Continue to GitHub ↗</button><div class="notes-list-heading"><h3>Saved notes for this page</h3><button class="notes-refresh">Refresh</button></div><div class="saved-notes" aria-live="polite"></div><a class="all-notes" href="${issuesURL}?q=is%3Aissue+%22%5BSDKS+review%5D%22" target="_blank" rel="noopener">View all review notes on GitHub ↗</a></dialog>`);
 const dialog=document.querySelector('.notes-dialog');let selectedSection='Whole page',returnFocus=null;
 async function refreshNotes(){
  const list=dialog.querySelector('.saved-notes');list.textContent='Loading saved notes…';
  try{const response=await fetch(`https://api.github.com/repos/${reviewRepo}/issues?state=all&per_page=100&sort=created&direction=desc`,{headers:{Accept:'application/vnd.github+json'}});if(!response.ok)throw Error();const items=await response.json();
   const notes=items.filter(x=>!x.pull_request&&x.title.startsWith('[SDKS review]')&&x.body?.includes(`Page ID: ${pageId}\n`));
   list.innerHTML=notes.length?notes.map(n=>`<article><a href="${esc(n.html_url)}" target="_blank" rel="noopener">${esc(n.title)}</a><small>${esc(n.user.login)} · ${n.state==='closed'?'Closed':'Open'} · ${esc(new Date(n.created_at).toLocaleDateString('en-IN'))}</small><p>${esc(n.body.split('### Note\n')[1]||n.body)}</p></article>`).join(''):'<p>No saved notes for this page in the latest 100 issues. Use the link below for the complete history.</p>';
  }catch{list.innerHTML='<p>Could not load notes right now. Open the GitHub link below to read them, or try Refresh.</p>';}
 }
 function openNotes(section){selectedSection=section;returnFocus=document.activeElement;dialog.querySelector('.notes-context').textContent=`${pages[pageId].title} / ${section} / ${innerWidth}px preview`;dialog.showModal();refreshNotes();}
 dialog.querySelector('.notes-close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>returnFocus?.focus());
 dialog.querySelector('.notes-refresh').onclick=refreshNotes;
 document.querySelector('.notes-launch').onclick=function(){const active=this.getAttribute('aria-expanded')!=='true';this.setAttribute('aria-expanded',String(active));document.body.classList.toggle('review-notes-on',active);if(active)openNotes('Whole page');};
 document.querySelectorAll('main > section').forEach((s,i)=>{const title=s.querySelector('h2')?.textContent||'Hero slideshow';const btn=document.createElement('button');btn.className='section-note';btn.textContent='Leave a note';btn.setAttribute('aria-label',`Leave a note on ${title}`);btn.onclick=()=>openNotes(`${i+1}. ${title}`);s.append(btn);});
 dialog.querySelector('.note-submit').onclick=()=>{const text=dialog.querySelector('textarea').value.trim();if(!text){dialog.querySelector('textarea').focus();return;}const device=innerWidth<=480?'Mobile':innerWidth<=800?'Tablet':'Desktop';const body=`Page ID: ${pageId}\nPage: ${pages[pageId].title}\nSection: ${selectedSection}\nPreview: ${device} (${innerWidth}px)\nURL: https://suryanshdadwal1-arch.github.io/sdks-website-wireframe/?page=${pageId}&device=${device.toLowerCase()}\n\n### Note\n${text}`;window.open(`${issuesURL}/new?title=${encodeURIComponent(`[SDKS review] ${pages[pageId].title} — ${selectedSection}`)}&body=${encodeURIComponent(body)}`,'_blank','noopener');};
}
