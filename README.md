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

## Features

- The **Home Page** features recent news articles, an introduction to the project, links to the four "pillars" of the project, and a mailing list sign-up.
- The **Mission Page** features deeper information on the project, the mission goals, an interactive mission timeline, and testimonials from mission experts.
<img width="426" height="240" alt="mission_timeline" src="https://github.com/user-attachments/assets/b727c257-4054-4c23-9442-3bab8bcf76c4" />

- The **Team Page** features teams from over the years. Select any team to view more information about them and what they have to say about their experiences.
- The **Assignment Page** fetches all open assignments. Select any to view more details about that assignment.
- The **Partners Page** features a progressively enhanced carousel that shows off the project's sponsors.
<img width="426" height="240" alt="partners_carousel (1)" src="https://github.com/user-attachments/assets/7cffe95c-39ed-41e9-a316-ffc1381ab1d4" />


- The **News Page** features all the latest news on the project, with nifty pagination.

## Datamodel

![Datamodel](./src/lib/assets/images/diagram-2025-11-02-190342.png)

_Datamodel from Mermaid_

Our website includes a total of 7 main pages: Home, Mission, Scientific, News, Team, Assignments, and Partners. Four of these will eventually have their own detail pages, for example for articles, staff or partnership profiles, or job openings.

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
