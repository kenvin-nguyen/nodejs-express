-- create DB
CREATE DATABASE nodejs_express;

-- create table user
CREATE TABLE user
(
    id bigint NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    birthday date NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

-- insert data for user
INSERT INTO user VALUES('1', 'kevin nguyen','kevin', '123456','2000-01-01');