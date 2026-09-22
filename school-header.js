if(embedded){
 const header=document.querySelector('.site-header');
 if(header){
  const strip=parentView
   ? `<a href="${href('contact')}">Contact the school <small>Official details awaiting confirmation</small></a><a href="${href('admissions')}">Admission information</a>`
   : '<span>Email: To be confirmed</span><span>Contact No: To be confirmed</span><span>Admission Counsellor: To be confirmed</span><span>Social Media: Facebook · Twitter · YouTube <small>(links pending)</small></span>';
  header.insertAdjacentHTML('beforebegin',`<div class="school-top-strip${parentView?' parent-top-strip':''}">${strip}</div>`);
  header.previousElementSibling?.querySelectorAll('a[href*="?page="]').forEach(a=>a.addEventListener('click',e=>{
   if(window.parent!==window){e.preventDefault();window.parent.postMessage({type:'sdks-navigate',page:new URL(a.href).searchParams.get('page')},location.origin);}
  }));
  const brand=header.querySelector('.brand > span:last-child');
  if(brand)brand.innerHTML='SDKS – Sri Sri Academy, Patiala<small>(To be affiliated to CBSE)</small><small>Under the aegis of SDKS and Sri Sri Ravi Shankar Trust</small>';
  if(!parentView){
   const details=document.querySelector('.contact-details dl');
   if(details)details.insertAdjacentHTML('beforeend','<dt>Social Media</dt><dd>Facebook · Twitter · YouTube — official links to be confirmed</dd>');
  }
 }
}
