# Contributing

We follow the FDND agency conventions: https://docs.fdnd.nl/conventies.html

In short (but please read the whole convention docs):

## General

- Always English
- Descriptive and spelled out, no abbreviations (`button`, not `btn`)
- Stay consistent

### HTML and CSS: kebab-case

- Classes, ids, custom properties
- `contact-form`, `header-trigger`, `--primary-color`
- Not `contactForm`, `myForm`, `color-1`

### JavaScript: camelCase

- Variables and functions
- `initHeader`, `apiUrl`
- Not PascalCase for functions

### Svelte components: PascalCase

- `MemberCard.svelte`, `SquadGrid.svelte`


| Where                  | Style      | Example             |
| ---------------------- | ---------- | ------------------- |
| class / id / css var   | kebab-case | `.contact-form`     |
| JS variable / function | camelCase  | `getMembers`        |
| Component file         | PascalCase | `MemberCard.svelte` |

Also: `const` unless you need to reassign, never `var`.

## Our own additions to the conventions

### Naming branches

**Purpose prefixes** describe the intent of the work:

- `feature/` (or `feat/`): for new features (e.g. `feature/add-login-page`, `feat/add-login-page`)
- `bugfix/` (or `fix/`): for bug fixes (e.g. `bugfix/fix-header-bug`, `fix/header-bug`)
- `hotfix/`: for urgent fixes (e.g. `hotfix/security-patch`)
- `release/`: for branches preparing a release (e.g. `release/v1.2.0`)
- `chore/`: for non-code tasks like dependency or docs updates (e.g. `chore/update-dependencies`)

**Rules:**

- **Use lowercase alphanumerics, hyphens, and dots:** always use lowercase letters (a-z), numbers (0-9), and hyphens (`-`) to separate words. Avoid special characters, underscores, or spaces. For release branches, dots (`.`) may be used in the description to represent version numbers (e.g. `release/v1.2.0`).
- **No consecutive, leading, or trailing hyphens or dots:** ensure that hyphens and dots do not appear consecutively (e.g. `feature/new--login`, `release/v1.-2.0`), nor at the start or end of the description (e.g. `feature/-new-login`, `release/v1.2.0.`).
- **Keep it clear and concise:** the branch name should be descriptive yet concise, clearly indicating the purpose of the work.
- **Include ticket numbers:** if applicable, include the ticket number from your project management tool to make tracking easier. For example, for a ticket `issue-123`, the branch name could be `feature/issue-123-new-login`.

Source: https://conventionalbranch.org/#branch-naming-prefixes

### Issues: how to create them, labels, who assigns them, and an optional project board

- Issues are created by all participants.
- When you create an issue, make sure a MoSCoW label is attached, as well as a type: user story, epic, feature, or task.
- Issues stay in the backlog until they are ready to be picked up and have been scheduled.
- As a contributor, you can look in the To Do column and pick up a task by assigning yourself.
- We poker together to decide the estimate of the issue.

#### Definition of ready

A feature is ready to move to **Todo** on the project board when the issue contains:

- [ ] **Title**
- [ ] **Description**: written as a user story ("As a [user], I want [goal], so that [reason]")
- [ ] **Design**: design has been added to the issue 
- [ ] **MoSCoW**
- [ ] **Estimate**: set on the project board
- [ ] **Type label**: Epic, Feature, Task, User story
- [ ] **Acceptance criteria**
- [ ] **Assignee**

#### Definition of done 

A feature is done when:

- [ ] **Functionality:** All acceptance criteria have been completed
- [ ] **Tested:**: RAPPE
- [ ] **Documentation:** if necessary, the documentation for this issue has been updated
- [ ] **Reviewed:** the pull request has been reviewed 

### Language

We write all issues, reviews, commits, and branches in English, as well as the code, CSS, and JavaScript names, etc.

### Agreements

- Once every three weeks we have a sprint review with the client.
- Once a week we have contact with the client.
- Every Monday, Wednesday, and Friday we have a standup.

### Sprint retrospective

Every sprint we look at how many points we completed that sprint, and use that to determine how many points we can plan for the next sprint, so we get a better grip on how much work we can handle.

### Folder structure

We use atomic design, so our folder structure becomes, for example:

```
src/
├── lib/
│   ├── atoms/
│   │   ├── Button.svelte
│   │   ├── Heading.svelte
│   │   └── Avatar.svelte
│   ├── molecules/
│   │   ├── SearchForm.svelte
│   │   └── MemberCard.svelte
│   ├── organisms/
│   │   ├── Header.svelte
│   │   └── SquadGrid.svelte
│   ├── styles/
│   │   └── global.css
│   └── index.js
└── routes/
    ├── +layout.svelte
    ├── +page.svelte
    └── +page.server.js
```

**What goes where**

- **Atoms:** smallest building blocks that do not consist of other components (button, label, icon, input)
- **Molecules:** a few atoms together with one task (label + input + button = search form)
- **Organisms:** larger parts of a page that consist of molecules and atoms (header, footer, grid with cards)
- **Templates and pages:** in SvelteKit these are your `+layout.svelte` and `+page.svelte` in `routes/`. So you do not create separate folders for them.

Source: https://atomicdesign.bradfrost.com/chapter-2/
