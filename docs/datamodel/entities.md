## persons
A person on the site: student, team member, scientist, or someone from a partner or sponsor.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `name` | string | yes | |
| `study_program` | string | no | Only for students |
| `image` | file | no | Portrait |
| `period` | string | no | Period of involvement |
| `organization_id` | integer | no | FK to `organizations` |
| `role` | enum | yes | See [enums.md](./enums.md) |
| `slug` | string | yes | Unique, used in URLs |

## organizations
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `name` | string | yes | |
| `image_logo` | file | yes | Logo |
| `type` | enum | yes | See [enums.md](./enums.md) |

## testimonials
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `date_created` | datetime | yes | |
| `time_period` | string | no | When the testimonial applies |
| `testimonial` | text | yes | |
| `person_id` | integer | yes | FK to `persons` |

## components
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `parent_id` | integer | no | FK to `components`. Empty for the top level |
| `name` | string | yes | |
| `description` | text | no | |
| `image` | file | no | |
| `image_credit` | string | no | |
| `slug` | string | yes | Unique, used in URLs |

## science_objectives
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `title` | string | yes | |
| `image` | file | no | |
| `image_credit` | string | no | |
| `component_id` | integer | no | FK to `components`, currently the LEXI payload |

## vacancies
| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `title` | string | yes | |
| `study_program` | string | no | |
| `date_created` | datetime | yes | Set by the CMS |
| `location` | enum | yes | See [enums.md](./enums.md) |
| `organization_id` | integer | yes | FK to `organizations` |
| `description` | text | no | |
| `summary` | text | yes | Short text for overview tiles |
| `highlighted` | boolean | no | |
| `slug` | string | yes | Unique, used in URLs |

## news
No relations to other entities.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `title` | string | yes | |
| `summary` | text | yes | |
| `body` | text | yes | |
| `type` | enum | yes | See [enums.md](./enums.md) |
| `date_published` | date | yes | When the post goes live |
| `date_created` | datetime | yes | Set by the CMS |
| `image` | file | no | |
| `author` | string | no | |
| `slug` | string | yes | Unique, used in URLs |
| `status` | enum | yes | See [enums.md](./enums.md) |

## component_persons
Junction table between `components` and `persons`.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `component_id` | integer | yes | FK to `components` |
| `person_id` | integer | yes | FK to `persons` |

## component_organizations
Junction table between `components` and `organizations`.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Primary key |
| `component_id` | integer | yes | FK to `components` |
| `organization_id` | integer | yes | FK to `organizations` |