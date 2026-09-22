/* Parent-facing campus copy. Source notes remain in the review data. */
pages.campus.desc='SDKS Sri Sri Academy is being developed behind SDKS Bhawan on Rajpura Road, with its first academic session planned for April 2027. The campus plans bring together classrooms, spaces for early-years play and areas for children to gather beyond their lessons.';
pages.campus.sections[0].title='Spaces for Your Child’s School Day';
pages.campus.sections[0].items=[['Classrooms','The opening plans include a classroom for each class, with a screen to support teaching.'],['Early-years play and activity room','A dedicated space for younger children’s play and activities is planned for opening.'],['Gathering spaces','A 250-seat multipurpose hall and a separate assembly area are planned for children to come together.'],['Medical care','An infirmary is included in the opening campus plan.']];
pages.campus.sections[1].title='As the School Grows';
pages.campus.sections[1].items=[['Laboratories','Further plans include science, mathematics and computer laboratories. Opening schedules are yet to be confirmed.'],['Robotics and tinkering','A tinkering lab is planned to introduce students to robotics. Its opening schedule is yet to be confirmed.'],['Art, music and dance','Separate rooms for art, music and dance are part of the further campus plans. Opening schedules are yet to be confirmed.']];
const campusProgress=pages.campus.sections.find(s=>s.title==='Campus progress');
campusProgress.parentText='The campus is currently under construction for the planned April 2027 session.';
const campusFaq=pages.campus.sections.find(s=>s.type==='faq');
campusFaq.title='Planning Your Child’s Journey';
campusFaq.items[2]=['Getting to SDKS','The campus is behind SDKS Bhawan on Rajpura Road, Patiala. School transport is planned; routes and pickup points are yet to be finalised.'];
Object.assign(pages.campus.sections.at(-1),{title:'Considering SDKS for Your Child?',text:'Explore the classes offered, admission dates and information for the school’s first academic session.',link:'admissions',label:'View Admission Details',secondary:'contact',secondaryLabel:'Find the School'});

// Keep the same section order and layout; translate editorial gaps without inventing facts.
if(new URLSearchParams(location.search).get('view')==='parent'){
 campusFaq.items[0][1]='Safety and supervision arrangements are being confirmed. Detailed information is not yet available.';
 campusFaq.items[1][1]='Details of accessibility and care facilities are not yet available.';
 const pending=value=>/^\[[\s\S]+\]$/.test(String(value).trim());
 Object.values(pages).forEach(page=>{
  if(pending(page.desc))page.desc='Further information will be available once confirmed by the school.';
  page.sections.forEach(section=>{
   if(section.parentText)section.text=section.parentText;
   else if(pending(section.text))section.text='Further information will be available once confirmed by the school.';
   if(section.items)section.items=section.items.map(item=>Array.isArray(item)?item.map(value=>pending(value)?'Details are yet to be confirmed by the school.':value):item);
  });
 });
}
