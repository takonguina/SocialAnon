CREATE DATABASE mydb;

\c mydb

/* CREATE TABLE IF NOT EXISTS countries(
    id_country SERIAL PRIMARY KEY,
    name VARCHAR(64)
); */


CREATE TABLE IF NOT EXISTS users(
    id_user SERIAL PRIMARY KEY,
/*     id_country INT NOT NULL, */
    email VARCHAR(320) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email_validated BOOLEAN NOT NULL DEFAULT FALSE,
    date_insert TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
/*     CONSTRAINT fk_country FOREIGN KEY(id_country) REFERENCES countries(id_country) */
);


CREATE TABLE IF NOT EXISTS posts(
    id_post SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    content VARCHAR(320),
    likes_post INT DEFAULT 0,
    date_insert TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(id_user) REFERENCES users(id_user)
);

CREATE TABLE IF NOT EXISTS likes(
    id_like SERIAL PRIMARY KEY,
    id_post INT NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT fk_post FOREIGN KEY(id_post) REFERENCES posts(id_post),
    CONSTRAINT fk_user FOREIGN KEY(id_user) REFERENCES users(id_user)
);

CREATE TABLE IF NOT EXISTS conversations(
    id_conversation SERIAL PRIMARY KEY,
    id_post INT NOT NULL,
    CONSTRAINT fk_post FOREIGN KEY(id_post) REFERENCES posts(id_post)
);

CREATE TABLE IF NOT EXISTS messages(
    id_message SERIAL PRIMARY KEY,
    id_conversation INT NOT NULL,
    id_post INT NOT NULL,
    id_sender INT NOT NULL,
    id_receiver INT NOT NULL,
    message_text VARCHAR(1000) NOT NULL,
    date_insert TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_sender FOREIGN KEY(id_sender) REFERENCES users(id_user),
    CONSTRAINT fk_receiver FOREIGN KEY(id_receiver) REFERENCES users(id_user),
    CONSTRAINT fk_post FOREIGN KEY(id_post) REFERENCES posts(id_post),
    CONSTRAINT fk_id_conversation FOREIGN KEY(id_conversation) REFERENCES conversations(id_conversation)
);

CREATE TABLE IF NOT EXISTS admins(
    id_admin SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_admin_user FOREIGN KEY(id_user) REFERENCES users(id_user)
);

