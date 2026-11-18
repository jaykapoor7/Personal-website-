# Design and writing guide

The site should read like a well-set CV that opens into a portfolio. A recruiter, researcher, collaborator or investor should know who I am, see my best work, and reach the evidence behind it in seconds.

## Hierarchy

1. The hero: "Hi, I'm Jay Kapoor. I find broken systems and try to find solutions.", the photo, then Resume and links.
2. Four short paragraphs beside four tiles: Work, Writing, Photos, Play.
3. Numbered sections: Selected work, Experience, Research, Writing, Photos, Play.
4. The blue contact panel.

Every entry on the site is in the index at `/work/`. The home page chooses; the index keeps everything.

## Type and colour

Blue and white, as the site has always been: tokens in `app/globals.css`. Inter for reading, Inter Tight for headings, and JetBrains Mono, small and uppercase, only for section numbers, dates and labels.

Backgrounds are real things or plain colour, never decoration: no generated grids, glows, particles or networks.
- The hero is my photo, printed as a blue cyanotype on pale paper. The photo is the background; the text sits on its open side.
- The white sheet is plain white, so the writing reads cleanly.
- Then colour blocks: cobalt (Research, Writing), white (Photos), pale blue (Play), and the cobalt contact panel. Each band is a rounded card that widens to full bleed as it scrolls in. Only its background scales; text never does.
- Pictures everywhere are the real thing: project screenshots, document pages, my photos.
- Inner pages are plain white.

## Writing

- First person, plain and specific. Say what it is, for whom, and what I did.
- No slogans, no buzzwords, no claims about myself. Let the numbers and documents do that.
- Every fact must already be in `content/site.ts`, a linked document or a live site. Never round up, estimate or add a partner.
- One line per project: what it is, and who it is for. Its numbers go on the line beneath, not in the sentence.
- Roles in sentence case as job titles: "Founder", "Co-founder", "Research Assistant".
- Years: "2019–2023" with an en dash, "2026–now" for current work, a single year for one-year work. Never months on lists.
- Status, only where true: "Live" for things anyone can use today, "Published" for papers, notes and memos.
- Outcomes on case pages each carry one label:
  - **Measured**: a number that was counted.
  - **Shipped**: something built and in use.
  - **Partnership**: an agreement with a named organisation.
  - **Pilot**: a trial, not yet a programme.
  - **Published**: a paper, note or public release.
- Calls to action name the destination: "All work", "Open the models", "Code on GitHub", "Resume".
- No em dashes. "Resume" without accents.
