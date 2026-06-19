# NEBULA Xplorer - a project by SRON

The NEBULA Xplorer website is a deep source of information on everything to do with the NEBULA Xplorer, a satellite designed to research X-ray binary black holes and their relationships with companion stars over long periods of time. The project as a whole is a combined effort of over 400 students from within the Netherlands.

**Our goals for this project are to build a multi-page website that:**

- helps scientists visualize and interpret complex astronomical data from this mission
- assists engineers with explanations about the technologies of the instrument and satellite
- gives educational and industrial partners the opportunity to showcase themselves
- keeps students connected with each other

**Live link:** [https://nebulaxplorer.dev.fdnd.nl/](https://nebulaxplorer.dev.fdnd.nl/)

## Design

Our designs are based on the [Design Challenge](https://github.com/fdnd-agency/nebulaxplorer/wiki/Design-Challenge) from FDND Agency. You can check out our [Figma prototypes](https://www.figma.com/design/MDGKGDUMzxOx2Ozwp3Mtku/S14--Nebula-explorer?node-id=644-210&p=f&t=OmPcuvANXQAtuUJ0-0) for more designs.

<img width="400" alt="Screenshot 2025-10-30 185200" src="https://github.com/user-attachments/assets/a8cb5109-3eda-48ea-828c-7f2b6a3b325b" />
<img width="400" alt="Screenshot 2025-10-30 185222" src="https://github.com/user-attachments/assets/acf66853-d388-4b9d-bd3a-655906c3d274" />
<img width="400" alt="Screenshot 2025-10-30 183241" src="https://github.com/user-attachments/assets/deb1d575-eb93-4c95-9f4b-300bbafb59f8" />

## Pages

The website contains 7 main pages:

- Home
- Mission
- Scientific
- News
- Team
- Assignments
- Partners

Some pages also have detail pages (like news articles, team members, partners, or assignments).

## Features

- **Home Page**

Features recent news articles, an introduction to the project, links to the four "pillars" of the project, and a mailing list sign-up.

<img width="1817" height="685" alt="image" src="https://github.com/user-attachments/assets/5419022d-85b5-4ce0-9c61-663c48bb2407" />

- **Mission Page**

Features deeper information on the project, the mission goals, an interactive mission timeline, and testimonials from mission experts.

<img width="1837" height="680" alt="image" src="https://github.com/user-attachments/assets/0c1fcd5f-86bc-4d80-ba68-48f7c5cbf91c" />

- **Team Page**

Features teams from over the years. Select any team to view more information about them and what they have to say about their experiences.

<img width="1172" height="715" alt="Screenshot 2026-06-16 164139" src="https://github.com/user-attachments/assets/609f3275-dd44-4a58-9bc8-d8923e054671" />

- **Assignment Page**

Fetches all open assignments. Select any to view more details about that assignment.

<img width="1777" height="718" alt="image" src="https://github.com/user-attachments/assets/9f12b431-2531-42b7-8386-fc0643b61bfb" />

- **Partners Page**

Features a progressively enhanced carousel that shows off the project's sponsors.

<img width="1842" height="647" alt="image" src="https://github.com/user-attachments/assets/2347dc0e-7ca4-4008-87c1-be7d2ef97aa6" />

- **News Page**

Features all the latest news on the project, with nifty pagination.

<img width="1810" height="702" alt="Screenshot 2026-06-16 164447" src="https://github.com/user-attachments/assets/88b65f28-75c4-466f-86ec-7f84820477cb" />

## Interactive features

- **Scroll rocket animation**

A rocket moves along the page while scrolling.
It shows progress and makes long pages easier to follow.

- **3D Satellite**

A 3D satellite is shown on the website as a visual element.
It helps explain the space mission in a more visual way.

<img width="563" height="592" alt="Screenshot 2026-06-16 163955" src="https://github.com/user-attachments/assets/6498a7c0-1c0f-44ab-b515-76259cca9560" />

- **Scroll-triggered animations**

We used scroll-triggered animations (GSAP ScrollTrigger) to make the website feel more dynamic.

Elements animate when they enter the viewport while scrolling.

## Datamodel

![Datamodel](./src/lib/assets/images/diagram-2025-11-02-190342.png)

_Datamodel from Mermaid_

## Installation

This project has been developed in SvelteKit, content is retrieved from Directus CMS, and version control takes place here on GitHub.

Follow the steps below to use this repository for yourself!

1. Clone the repository

`git clone https://github.com/fdnd-agency/nebulaxplorer.git`

`cd nebulaxplorer`

2. Install dependencies

`npm install`

3. Copy the example .env file

`cp .env.example .env`

4. Run the app:

`npm run dev`

Then open the localhost in your browser. All done!

## Licenses

This project is licensed under the terms of the MIT license.
