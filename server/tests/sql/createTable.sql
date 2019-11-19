drop table if exists comments;
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
)

CREATE TABLE comment(
                        comment_id INT NOT NULL AUTO_INCREMENT,
                        content VARCHAR(255),
                        priority int DEFAULT 1,
                        post_date DATETIME,
                        ticket_id int,
                        PRIMARY KEY (comment_id)
)

CREATE TABLE archive(
                       ticket_id int,
                       headline VARCHAR(255),
                       content VARCHAR(255),
                       priority int DEFAULT 2,
                       picture VARCHAR(255),
                       post_date DATETIME,
                       email VARCHAR(255),
                       group_id int,
                       author VARCHAR(255),
                       PRIMARY KEY(ticket_id)
)