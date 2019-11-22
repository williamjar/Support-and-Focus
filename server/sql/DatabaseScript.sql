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

INSERT INTO comment(content, priority, post_date, ticket_id) VALUES('hei dette er en kommentar',1,'2019-10-24 11:28:00',21);

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

CREATE TABLE group_list(
                    group_id int NOT NULL AUTO_INCREMENT,
                    group_name VARCHAR(255),
                    PRIMARY KEY(group_id)
);


SELECT * FROM archive

INSERT INTO group_list(group_id, group_name) VALUES(1,'Quality issue');
SELECT * FROM `group_list`;
ALTER TABLE comment
    ADD CONSTRAINT FK_ticketcomment
        FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id);

#DOES NOT NEED
ALTER TABLE ticket
    ADD CONSTRAINT FK_ticketgroup
        FOREIGN KEY (group_id) REFERENCES group_list(group_id);


        #drop tables
DROP TABLE comment;
DROP TABLE ticket;
DROP TABLE archive;
DROP TABLE group_list;

        #testdata
INSERT INTO ticket(headline,content,picture,post_date,category,author)
VALUES ('Help with a product','This product has scratches','imgur.com/whatever', '2019-10-24 11:28:00', 'product support', 'Forfattersen');


        #select
SELECT * FROM ticket


