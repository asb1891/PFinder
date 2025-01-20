CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE preferences (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    pet_type VARCHAR(50),
    breed VARCHAR(50),
    size VARCHAR(50),
    age VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
