# NEBULA Xplorer - Project by SRON
## Description
The NEBULA Xplorer website was given to us as a project from SRON, the Space Research Organisation of the Netherlands. Its primary purpose is being a deep source of information on everything to do with the NEBULA Xplorer, a sattelite designed to research X-ray binary black holes and their relationships with companion stars over long periods of time. The project as a whole is a combined effort of over 400 students from within the Netherlands.

**Our goals for this project are to build a multi-page website that:**
- helps scientists visualize and interpret complex astronomical data from this mission
- assists engineers with explanations about the technologies of the instrument and satellite
- gives educational and industrial partners the opportunity to showcase themselves
- keeps students connected with each other
  
Live link: https://nebulaxplorer.dev.fdnd.nl/

---

## Table of contents
- Description

- Design System

- Design

- Pages

- Installation

- Projectteam

- Sources

- Licenses

---

## Design System
<img width="1193" height="869" alt="image" src="https://github.com/user-attachments/assets/b6226360-4ffd-4141-bf63-15272ff8a284" />

### Typography
Voor de headings gebruiken we **Space Grotesk** en voor bodytext **Space Mono**
We gebruiken de **Perfect Fifth** scale voor de headings, deze wordt automatisch toegepast:

``` css
/* Typography */ 
    --ratio:                   1.5;
	--step-0:                  1.2rem;
	--step-1:                  calc(var(--step-0) * var(--ratio));
	--step-2:                  calc(var(--step-1) * var(--ratio));
	--step-3:                  calc(var(--step-2) * var(--ratio));
	--step-min-1:              calc(var(--step-0) / var(--ratio));
	--step-min-2:              calc(var(--step-min-1) / var(--ratio));
	--step-min-3:              calc(var(--step-min-2) / var(--ratio));

/* Headings */ 
h1 { font-size:                var(--step-3); }
h2 { font-size:                var(--step-2); }
h3 { font-size:                var(--step-1); }
h4 { font-size:                calc(var(--step-0) * sqrt(var(--ratio))); }
h5, 
h6 { font-size:                var(--step-0); }
```

### Colors
We hebben de kleuren van SRON gebruikt voor consistentie en merkbekendheid. We hebben deze kleuren vervolgens omgezet naar **hsl()** en meerdere tinten toegevoegd voor meer consistentie en een rustigere vormgeving. 

## Design choices
[Figma design](https://www.figma.com/design/M53PWSrlpDMBdyIPRFLTOL/NebulaXPlorer?node-id=72-165&p=f&t=NNfoaI02EaTsWmGi-0)

### Main page hero
De hero / banner was op de SRON website best groot, we hebben ervoor gekozen om deze minder hoog te maken zodat de gebruiker minder hoeft te scrollen. Daarnaast ook een donkere overlay over de afbeelding gezet zodat de tekst wel leesbaar blijft.
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/5b4fb6cb-b2d5-4814-91bd-726c9cd891df" />

### Sub page hero
Deze hero is voor de subpagina's, met een titel en een introtekst over de desbetreffende pagina.
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/62bb07e9-1ae2-41b4-964c-c0318cb0515c" />


### Featured halves
Meerdere variaties gemaakt zodat er niet alleen maar lappe teksten zijn. De gebruiker heeft nu een rustigere website en kan sneller informatie zien
<img width="500" alt="image" src="https://github.com/user-attachments/assets/9d5f0322-abce-4e3b-ad7c-0b5ad3c4c40d" />

## Pages
### Home
- Welcome
- What is NEBULA-Xplorer
- Newsitems
- Sponsors
### Science
- Explanations about scientific goals
- Scientific articles
### Technology
- Explanation about the technology
### Teams
- Every 6 months a team with details
### Assignments
- Assignments wit detaisls
### Partners
- Every partner that collaborated

## Installation
Clone the repository - https://github.com/fdnd-agency/nebulaxplorer.git
Open the repository: in GitHub Desktop, then navigate to `Open the repository in your external editor`
In the terminal, install npm packages by typing `npm install`.
Run the localhost by typing `npm run dev`

## Projectteam
- Roxy // Product owner & Frontend developer
- Isaac // UI/UX lead & Frontend developer
- Lynn // Scrum master & Frontend developer
- Chassidy // Software developer

## Sources
- [SvelteKit tutorial](https://learn.svelte.dev/tutorial/introducing-sveltekit)
- [SRON website](https://www.sron.nl/)
- [CONTRIBUTING.md](https://github.com/fdnd-agency/nebulaxplorer/blob/dev/CONTRIBUTTING.md)
- [FDND code conventies](https://docs.fdnd.nl/conventies.html#code-conventies)

## Licenses
This project is licensed under the terms of the [MIT license](https://github.com/fdnd-agency/toolgankelijk/blob/main/LICENSE).
