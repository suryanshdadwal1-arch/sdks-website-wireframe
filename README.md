# SDKS website wireframe

Grayscale, responsive school website prototype for layout review. Not the live school website or an approved statement of school facilities or policies.

Open `index.html` through any static web server or GitHub Pages. The review frame includes page selection, desktop/tablet/mobile views and optional content-source notes. Direct pages use `?page=home&embed=1`.

No build step, external fonts or analytics. School enquiry forms are demonstrations only and do not send or retain data. Review feedback uses a published Google Form linked to a project response Sheet, without sign-in or email collection. Page, section and viewport are prefilled. Comments are not GitHub issues. No source documents or personal records are included.

Parent view: use the toolbar toggle or `&view=parent`. It retains page order, layout and navigation while hiding editorial notes and feedback controls. Campus copy is updated in `parent-view.js`; unknown facts stay explicitly unconfirmed. Parent preview forms are disabled. Switch back to review to see source notes, content requests and feedback tools. Image spaces remain neutral until approved photography is supplied.

Content loads from `pages.js`, then discovery corrections in `source-updates.js`, then the latest copy in `editorial-refinement.js`. Layout is in `app.js`; hero and feedback interactions are in `review-enhancements.js`. All pages are review proposals. The page inventory is not a contractual scope expansion.

The latest school structure override loads before `app.js` via `school-structure.js` and `school-structure.css`. Main navigation has nine labels: About, Pedagogy, Infrastructure, Sports, Activities, Life @SDKS-SSA, Admission, Contact and Careers. The former Kindergarten and Classes I–V page keys are removed; stage information now sits within Pedagogy as Foundation Stage (Pre-Nursery to Class II) and Preparatory Stage (Classes III–V). Remaining factual gaps include confirmed entry classes and age criteria, approved contacts and hours, final facility readiness, and approved images/content.
