if(embedded){
 const header=document.querySelector('.site-header');
 header.insertAdjacentHTML('beforebegin','<div class="school-top-strip"><span>Email: To be confirmed</span><span>Contact No: To be confirmed</span><span>Admission Counsellor: To be confirmed</span><span>Social Media: Facebook · Twitter · YouTube <small>(links pending)</small></span></div>');
 header.querySelector('.brand > span:last-child').innerHTML='SDKS – Sri Sri Academy, Patiala<small>(To be affiliated to CBSE)</small><small>Under the aegis of SDKS and Sri Sri Ravi Shankar Trust</small>';
 const details=document.querySelector('.contact-details dl');
 if(details)details.insertAdjacentHTML('beforeend','<dt>Social Media</dt><dd>Facebook · Twitter · YouTube — official links to be confirmed</dd>');
}
