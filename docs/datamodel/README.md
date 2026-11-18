# Datamodel
```mermaid
erDiagram
    science_objectives {
        INT id PK
        string title
        string image
        string image_credit
        INT component_id FK
    }

    testimonials {
        INT id PK
        datetime date_created
        string time_period
        text testimonial
        INT person_id FK
    }

    components {
        INT id PK
        INT parent_id FK
        string name
        text description
        string image
        string image_credit
        string slug UK 
    }

    persons {
        INT id PK
        string name
        string study_program
        string image
        string period
        INT organization_id FK
        string slug UK
        enum role 
    }

    vacancies {
        INT id PK
        string title
        string study_program
        datetime date_created
        enum location
        INT organization_id FK
        text description
        text summary
        boolean highlighted
	    string slug UK
    }

    organizations {
        INT id PK
        string name
        string image_logo
        enum type
    }

    component_persons {
        INT id PK
        INT component_id FK
        INT person_id FK
    }

    component_organizations {
        INT id PK
        INT component_id FK
        INT organization_id FK
    }

    news {
        INT id PK
        string title
        text summary
        text body
        enum type
        date date_published
        datetime date_created
        string image
        string author
        string slug UK
        Enum status
    }

    components ||--o{ component_persons : "has"
    persons ||--o{ component_persons : "works on"
    components ||--o{ component_organizations : "has"
    organizations ||--o{ component_organizations : "sponsors / is involved in"
    components ||--o{ science_objectives : "has"
    components |o--o{ components : "has subcomponents"
    persons ||--o{ testimonials : "has"
    organizations ||--o{ vacancies : "has"
    organizations |o--o{ persons : "has members"
```

## Legend

### Keys

| Notation | Meaning |
|---|---|
| `PK` | Primary key |
| `FK` | Foreign key, references the primary key of another entity |
| `UK` | Unique key, the value must be unique |

### Relations

| Symbol | Meaning |
|---|---|
| `\|\|` | Exactly one |
| `\|o` | Zero or one |
| `o{` | Zero or more |

### Junction tables

`component_persons` and `component_organizations` are junction tables.

