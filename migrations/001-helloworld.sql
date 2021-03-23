-- Up
CREATE TABLE person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

CREATE TABLE vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    ownerId INTEGER REFERENCES person(id)
);

INSERT INTO person (name, email) values ('miguel', 'miguel@coelho.pt');
INSERT INTO person (name, email) values ('joao', 'joao@coelho.pt');

INSERT INTO vehicle (brand, model, ownerId) values ('audi', 'R8', 1);
INSERT INTO vehicle (brand, model, ownerId) values ('bmw', 'I8', 2);

--Down
DROP TABLE person;
DROP TABLE vehicle;