# Decisions

Add new decisions at the bottom. Do not edit old entries: if a decision changes, add a new entry and mention the old one.

Format:

## YYYY-MM-DD: Title
**Decision:** What we chose.
**Reason:** Why.

---

## 2026-11-10: Persons instead of students
**Decision:** Rename `students` to `persons` and add a `role`.
**Reason:** The client wants to show the core team and scientists too.

## 2026-11-10: Organization and role on a person
**Decision:** Each person has one optional organization and a role. A testimonial belongs to a person.
**Reason:** Someone from a partner or sponsor can give a testimonial on behalf of their organization.

## 2026-11-10: Study program is a field, not a table
**Decision:** `study_program` is a plain field in `persons` and `vacancies`.
**Reason:** We only show it, so a separate table is too much for now.

## 2026-11-10: Science objectives link to a component
**Decision:** `science_objectives.component_id` points to a component. Currently that is the camera (the LEXI payload).
**Reason:** The client confirmed that science objectives belong to the camera. There is only one camera now, but a second one may be added in the future, and then some objectives could belong to camera 1 and others to camera 2. We keep the relation so this stays possible.

## 2026-11-10: News has no relations
**Decision:** `news` is not linked to other entities.
**Reason:** The client does not need news linked to satellite components or people. The author is always nebula team.
