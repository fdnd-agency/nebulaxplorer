# Arrangements for working together

## Code conventies

We follow the [FDND code conventies](https://docs.fdnd.nl/conventies.html) in general.

### HTML conventies

- Use structured and semantic HTML.
- Do not nest content unnecessarily deeply.
- Avoid deep nesting of section elements and associated heading levels.
- Where necessary, link to another URL with more information. Make use of built-in HTML features (e.g., the powerful form validation of form elements).
- Use 1 tab for indentation.
- Use double quotes for attributes.
- Give your HTML some breathing room.
- **Our rule** use classes for CSS and data attributes for javascript.

### CSS conventies

- 1 tab – for indentation.
- Follow HTML order in CSS
- Structure your code from generic to specific
- Take advantage of the cascade and inheritance, and use utility classes to prevent code repetition (DRY)
- Use kebab-case in naming classes en id's.
- Nest media queries
- Give your CSS some breathing room.
- **Our rule** Use classes for CSS and data attributes for javascript.
- **Our rule** Make use of nested CSS
- **Our rule** Make use of CSS variables
- **Our rule** Adhere to the naming conventions for animations & variable names
- (For example `anim-fade-up`, `anim-move-right` & `--primary-color`, `--size-XL`)

### Comments

The writing of comments in our code for complex pieces of code (mainly for CSS & JS).

## Git conventions

- Issues, commit messages, branch names and pull requests should be in English
- Branch names should follow the format: issue number - issue title e.g. `42-fix-login-bug`
- Branches and Pull Requests should be created from `dev`
- Every branch should have an issue associated with it
- Commit messages should follow the format specified in Conventional Commits (https://docs.fdnd.nl/conventies.html#conventional-commits)
- There should be at least one approving review (by a human) before merging a pull request
- Merge dev into your feature branch before opening a Pull Request

## Team Canvas

<img width="1000" alt="image" src="https://github.com/user-attachments/assets/2d0521a5-cfb2-4b47-af88-a8f1a9d3aae1" />

## Sitemap

![Image](https://github.com/user-attachments/assets/5ab5ed17-69d2-44c1-9017-134ad9890b50)

## DoR & DoD

### DoR

- The story is correctly formatted (as a user… I want to... because)
- The story has a clear description
- The story has clear requirements
- Dependencies have been identified
- The story has been assigned an amount of story points
- The story has been assigned a priority

### DoD

- Requirements have been met
- The story has been tested
- The story has been merged into the dev branch
- The code has been reviewed
- The code complies with RAPPE (Responsive, Accessible, Performance, Progressive Enhancement)

## Post-mortem Scrum

A post-mortem in Scrum (emergency meeting) is a structured meeting after a sprint or project to reflect on what went well, what didn't, and how to improve processes for the future, focusing on continuous improvement, identifying root causes, and sharing lessons learned without blame
