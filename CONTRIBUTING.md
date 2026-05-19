# Team Agreements

## Code conventions

We generally follow the [FDND code conventions](https://docs.fdnd.nl/conventies.html).

## HTML
- Use structured and semantic HTML
- Avoid deep nesting of elements
- Make use of built-in HTML features wherever possible (e.g. the powerful form validation of form elements)
- Use 1 tab for indentation
- Use double quotes for attributes
- Give your HTML some breathing room
- Use kebab-case for naming IDs

## CSS
#### General
- Avoid using ID selectors
- Prioritize using element selectors. Only use class selectors when you need the specificity, when it improves readability, or when element selectors get too complex. Remember components are scoped by default.
- The order of your CSS selectors should follow the order of the associated HTML
- Structure your code from generic to specific
- Take advantage of the cascade and inheritance, and use utility classes to prevent code repetition (DRY)
- Prefer using container queries over media queries
- Use CSS variables where appropriate. CSS variables are generally defined in general.css
- Try to avoid using :global.

#### Formatting
- Use 1 tab for indentation
- When using multiple selectors in a rule declaration, give each selector its own line.
- Put a space before the opening brace { in rule declarations.
- In properties, put a space after, but not before, the : character.
- Put closing braces } of rule declarations on a new line.
- Put blank lines between rule declarations.

#### Naming
- CSS classes and custom variables should use kebab-case
- When naming classes, start with the element name or a descriptive (semantic) name (e.g. form, timeline, newscard, animation)
- Then add an optional descriptor (e.g. form-container, timeline-content, newscard-title, animation-fade-up)

#### Nesting
- Use nested CSS where it helps legibility
- Prefer to nest media/container queries where appropriate
- Do not nest selectors more than three levels deep to avoid writing CSS that is too specific or too strongly coupled to the HTML

## JavaScript
- Use camelCase for variable and function names
- Use 1 tab for indentation
- Use single quotes for strings
- Don't use semicolons at the end of a line
- Use template literals where possible instead of string concatenation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- Use object destructuring when assigning object properties (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
- Always use `const` unless you need to reassign the variable. Use `let` when reassignment is necessary. Avoid using `var`.
- Use `const` for objects and arrays, even if their contents change. The reference remains the same but properties or elements can be modified.


## Naming conventions
Aside from the language-specific naming conventions mentioned above, we have four general rules:
- Names should be semantic
- Names shouldn't be abbreviated
- Use English for all names
- Above all, names should be consistent

## Comments

- Make sure to comment complex code (mainly for CSS & JS)
- Comments should be in English
- Don't leave commented-out code in pull requests

## Git conventions

- Issues, commit messages, branch names and pull requests should be in English
- Branch names should follow the format: issue number - issue title e.g. `42-fix-login-bug`
- Branches and pull requests should be created from `dev`
- Every branch should have an issue associated with it
- Commit messages should follow the format specified in Conventional Commits (https://docs.fdnd.nl/conventies.html#conventional-commits)
- There should be at least one approving review (by a human) before merging a pull request
- Merge dev into your feature branch before opening a pull request

## DoR & DoD

### DoR

- The story is correctly formatted (as a user… I want to... because)
- The story has a clear title that briefly summarizes the user story
- The story has a clear description
- The story has clear requirements
- Dependencies have been identified
- The story has been assigned an amount of story points
- The story has been assigned a priority

### DoD

- Requirements have been met
- The story has been tested
- The story has been merged into the dev branch
- The code has been formatted according to our formatting configuration
- The code has been reviewed
- The code complies with RAPPE (Responsive, Accessible, Performance, Progressive Enhancement)

## Post-mortem Scrum

A post-mortem in Scrum (emergency meeting) is a structured meeting after a sprint or project to reflect on what went well, what didn't, and how to improve processes for the future, focusing on continuous improvement, identifying root causes, and sharing lessons learned without blame

## Team Canvas

<img width="1000" alt="image" src="https://github.com/user-attachments/assets/2d0521a5-cfb2-4b47-af88-a8f1a9d3aae1" />

## Sitemap

![Image](https://github.com/user-attachments/assets/5ab5ed17-69d2-44c1-9017-134ad9890b50)
