if(embedded&&parentView){
 document.querySelector('.prototype-strip').textContent='Parent preview · Proposed school website';
 document.querySelector('.logo-box').textContent='SDKS';
 document.querySelector('footer .footer-grid > div > small').remove();
 document.querySelectorAll('footer .fine').forEach(el=>el.remove());
 document.querySelectorAll('.pending').forEach(el=>el.textContent='Not yet available');
 document.querySelectorAll('.missing-label').forEach(el=>el.textContent='Details to be confirmed');
 document.querySelectorAll('.gallery figcaption small').forEach(el=>el.textContent='Photography coming soon');
 document.querySelectorAll('main dd').forEach(el=>{if(el.textContent.includes('School input needed'))el.textContent='Details to be confirmed';});
 // The preview must never suggest that an enquiry has actually been delivered.
 document.querySelectorAll('.form-layout form').forEach(form=>{
  form.previousElementSibling.querySelector('p').textContent='Online enquiries will be available when the school’s enquiry service opens.';
  form.querySelectorAll('option').forEach(option=>{if(option.textContent.includes('labels to confirm'))option.textContent='Other early-years class';});
  form.querySelectorAll('input,select,textarea,button').forEach(el=>el.disabled=true);
  form.querySelector('button').textContent='Enquiries not enabled in this preview';
 });
}
