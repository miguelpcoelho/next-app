-- Up
CREATE TABLE person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    ownerId INTEGER REFERENCES person(id)
);

-- Down
DROP TABLE person;
DROP TABLE vehicle;