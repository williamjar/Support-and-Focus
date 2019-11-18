CREATE TABLE ticket(
                       ticket_id int NOT NULL AUTO_INCREMENT,
                       headline VARCHAR(255),
                       content VARCHAR(255),
                       priority int DEFAULT 2,
                       picture VARCHAR(255),
                       post_date DATETIME,
                       category VARCHAR(255),
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


ALTER TABLE comment
    ADD CONSTRAINT FK_ticketcomment
        FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id);


        #drop tables
DROP TABLE comment;
DROP TABLE ticket;

        #testdata
INSERT INTO ticket(headline,content,picture,post_date,category,author)
VALUES ('Help with a product','This product has scratches','imgur.com/whatever', '2019-10-24 11:28:00', 'product support', 'Forfattersen');


        #select
SELECT * FROM ticket


CREATE TABLE archive(
                       ticket_id int,
                       headline VARCHAR(255),
                       content VARCHAR(255),
                       priority int DEFAULT 2,
                       picture VARCHAR(255),
                       post_date DATETIME,
                       category VARCHAR(255),
                       author VARCHAR(255),
                       PRIMARY KEY(ticket_id)
)