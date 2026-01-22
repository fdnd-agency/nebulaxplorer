# NEBULA Xplorer - a project by SRON

The NEBULA Xplorer website was given to us as a project from SRON, the Space Research Organisation of the Netherlands. Its primary purpose is being a deep source of information on everything to do with the NEBULA Xplorer, a satellite designed to research X-ray binary black holes and their relationships with companion stars over long periods of time. The project as a whole is a combined effort of over 400 students from within the Netherlands.

**Live link:** https://nebulaxplorer.dev.fdnd.nl/

## Design

Our designs are all based on the [Design Challenge](https://github.com/fdnd-agency/nebulaxplorer/wiki/Design-Challenge) from FDND Agency.

You can check out our [Figma prototypes](https://www.figma.com/design/MDGKGDUMzxOx2Ozwp3Mtku/S14--Nebula-explorer?node-id=644-210&p=f&t=OmPcuvANXQAtuUJ0-0) for more designs.

<details><summary><i>See screenshots</i></summary>
<img width="856" height="817" alt="Screenshot 2025-10-30 185200" src="https://github.com/user-attachments/assets/a8cb5109-3eda-48ea-828c-7f2b6a3b325b" />
<img width="853" height="646" alt="Screenshot 2025-10-30 185222" src="https://github.com/user-attachments/assets/acf66853-d388-4b9d-bd3a-655906c3d274" />
<img width="1245" height="827" alt="Screenshot 2025-10-30 183241" src="https://github.com/user-attachments/assets/deb1d575-eb93-4c95-9f4b-300bbafb59f8" />

</details>

**Our goals for this project are to build a multi-page website that:**

- helps scientists visualize and interpret complex astronomical data from this mission
- assists engineers with explanations about the technologies of the instrument and satellite
- gives educational and industrial partners the opportunity to showcase themselves
- keeps students connected with each other

## Datamodel

![Datamodel](./src/lib/assets/images/diagram-2025-11-02-190342.png)

_Datamodel from mermaid_

Our website includes a total of 7 main pages; Home, Mission, Scientific, News, Team, Careers and Partners. Four of these will eventually have their own detail pages, for example for articles, staff or partnership profiles, or job openings.

## Features 
 **view-transitions** when navigating between pages
 
 **hover animations** for user feedback
 
 **pagination** on the assignments page
 
 **responsivity** on all pages so that the site can easily be viewed on any device.

<details><summary><i>See screenshots</i></summary>

<img width="1401" height="696" alt="image" src="https://github.com/user-attachments/assets/ac8a48a2-e4e9-486f-98f6-6d819bba2ba2" />

^ Hover animations guide the user and give feedback on interactions

<img width="497" height="511" alt="image" src="https://github.com/user-attachments/assets/40fe3b87-d602-4bd6-aa77-9b1bab90484e" />

^ "Read More" tab without hover state

<img width="508" height="483" alt="image" src="https://github.com/user-attachments/assets/96809b4b-7458-4df6-b233-e2fc20c73d6f" />

^ "Read More" tab with hover state
</details>
  
## Installation

This project has been developed in SvelteKit, content is retrieved from Directus CMS, and version control takes place here on GitHub.

Follow the steps below to use this repository for yourself!

**1. Clone the repository:**

`git clone https://github.com/fdnd-agency/nebulaxplorer.git`

**2. Open the repository**

in GitHub Desktop, then navigate to _'Open the repository in your external editor'_

**3. In the terminal**

Type the command:
`npm install`

Then:
`npm run dev`

All done!

## Licenses

This project is licensed under the terms of the MIT license.
