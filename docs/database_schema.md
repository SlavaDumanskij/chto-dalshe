# Схема базы данных (ER-диаграмма)

## ER-диаграмма сущностей

```mermaid
erDiagram
    users ||--o{ favorites : "имеет"
    users ||--o{ recommendation_history : "генерирует"
    users ||--o{ user_interests : "выбирает"

    categories ||--o{ activities : "содержит"
    categories ||--o{ user_interests : "включает"

    activities ||--o{ favorites : "сохраняется в"
    activities ||--o{ recommendation_history : "участвует в"

    users {
        uuid id PK
        string device_id UK
        datetime created_at
    }

    categories {
        int id PK
        string name UK
        text description
    }

    activities {
        int id PK
        string title
        text description
        int category_id FK
        int duration_min
        int budget_level
        boolean is_outdoor
        datetime created_at
    }

    user_interests {
        uuid user_id PK,FK
        int category_id PK,FK
    }

    favorites {
        int id PK
        uuid user_id FK
        int activity_id FK
        datetime created_at
    }

    recommendation_history {
        int id PK
        uuid user_id FK
        int activity_id FK
        string action
        datetime created_at
    }
```

## Описание таблиц и связей

- **users**: Хранит данные пользователей (включая анонимных по device_id). Связь один-ко-многим с избранным и историей рекомендаций, многие-ко-многим с категориями через user_interests.
- **categories**: Справочник категорий досуга.
- **activities**: Каталог занятий. Включает привязку к категории (category_id), фильтры по времени (duration_min), бюджету (budget_level) и локации (is_outdoor).
- **user_interests**: Таблица связи M2M для сохранения интересов пользователя, выбранных на онбординге.
- **favorites**: Избранные активности пользователя.
- **recommendation_history**: История предложенных активностей и реакций пользователя (shown, accepted, skipped) для работы рекомендательного алгоритма.
