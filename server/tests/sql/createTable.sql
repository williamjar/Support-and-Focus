drop table  if exists article;

CREATE TABLE ticket(
                       ticket_id int NOT NULL AUTO_INCREMENT,
                       headline VARCHAR(255),
                       content VARCHAR(255),
                       priority int DEFAULT 2,
                       picture VARCHAR(255),
                       post_date DATETIME,
                       email VARCHAR(255),
                       group_id int,
                       author VARCHAR(255),
                       PRIMARY KEY(ticket_id)
);
