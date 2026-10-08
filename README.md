# NEBULA Xplorer - Project by SRON

## Description
The NEBULA Xplorer website was assigned to us as a project by SRON, the Netherlands Institute for Space Research. Its primary purpose is to serve as a comprehensive source of information about the NEBULA Xplorer, a satellite designed to study X-ray binary black holes and their interactions with companion stars over extended periods of time.

The project is a collaborative effort involving more than 400 students from across the Netherlands.

**Our goals for this project are to build a multi-page website that:**

- helps scientists visualize and interpret complex astronomical data collected during the mission
- provides engineers with clear explanations of the instrument and satellite technologies
- gives educational and industrial partners the opportunity to showcase their work and involvement
- keeps students connected and informed throughout the project
  
Live link: https://nebulaxplorer.dev.fdnd.nl/

---

## Table of contents
- 

---

## Design System
<img width="1193" height="869" alt="image" src="https://github.com/user-attachments/assets/b6226360-4ffd-4141-bf63-15272ff8a284" />

### Typography
For headings, we use **Space Grotesk**, while **Space Mono** is used for body text.

We use the **Perfect Fifth** type scale for our headings, which is applied automatically:

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
We use SRON's brand colors to maintain consistency and brand recognition. We converted these colors to **HSL** and added multiple shades to create more consistency and a calmer visual design.

## Design choices
[Figma design](https://www.figma.com/design/M53PWSrlpDMBdyIPRFLTOL/NebulaXPlorer?node-id=72-165&p=f&t=NNfoaI02EaTsWmGi-0)

### Main page hero
The hero/banner on the SRON website was quite large, so we decided to reduce its height to minimize the amount of scrolling required.
We also added a dark overlay to the image to ensure that the text remains clearly readable.
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/5b4fb6cb-b2d5-4814-91bd-726c9cd891df" />

### Sub page hero
This hero is used across the subpages and contains the page title and a short introduction describing the content of the respective page.
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/62bb07e9-1ae2-41b4-964c-c0318cb0515c" />


### Featured halves
We created multiple variations of the featured halves component to avoid presenting users with large blocks of text.
This gives the website a calmer visual structure and allows users to find and scan information more quickly.<img width="500" alt="image" src="https://github.com/user-attachments/assets/9d5f0322-abce-4e3b-ad7c-0b5ad3c4c40d" />

---

## Pages

### Home
- Welcome section
- What is NEBULA Xplorer?
- News items
- Sponsors

### Science
- Explanations of the scientific goals
- Scientific articles

### Technology
- Explanations of the technologies used in the mission

### Teams
- Teams from each six-month period, including details about each team

### Assignments
- Assignments and their details

### Partners
- Overview of all partners who collaborated on the project

---

## Installation
Clone the repository - https://github.com/fdnd-agency/nebulaxplorer.git
Open the repository: in GitHub Desktop, then navigate to `Open the repository in your external editor`
In the terminal, install npm packages by typing `npm install`.
Run the localhost by typing `npm run dev`

---

## Projectteam
- Roxy // Product owner & Frontend developer
- Isaac // UI/UX lead & Frontend developer
- Lynn // Scrum master & Frontend developer
- Chassidy // Software developer

---

## Sources
- [SvelteKit tutorial](https://learn.svelte.dev/tutorial/introducing-sveltekit)
- [SRON website](https://www.sron.nl/)
- [CONTRIBUTING.md](https://github.com/fdnd-agency/nebulaxplorer/blob/dev/CONTRIBUTTING.md)
- [FDND code conventies](https://docs.fdnd.nl/conventies.html#code-conventies)

---

## Licenses
This project is licensed under the terms of the [MIT license](https://github.com/fdnd-agency/toolgankelijk/blob/main/LICENSE).
