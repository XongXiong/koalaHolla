CREATE TABLE koalas (
id serial PRIMARY KEY,
name varchar(50),
age integer,
gender varchar(50),
ready varchar(50),
notes varchar(100));

INSERT INTO "koalas" ("name", "age", "gender", "ready", "notes")
VALUES ('Scotty', 4, 'M', true, 'Born in Guatemala'),
('Jean', 5, 'F', true, 'Allergic to lots of lava'),
('Ororo', 7, 'F', false, 'Loves listening to Paula (Abdul)'),
('Logan', 15, 'M', false, 'Love the sauna'),
('Charlie', 9, 'M', true, 'favorite band is Nirvana'),
('Betsy', 4, 'F', true, 'Has a pet iguana'),
('Alvin', 122, 'M', true, 'Real into lasagna');
