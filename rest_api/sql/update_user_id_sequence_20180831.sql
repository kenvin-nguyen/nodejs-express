CREATE SEQUENCE nodejs_express.user_id_seq;
ALTER TABLE nodejs_express.user ALTER id SET DEFAULT NEXTVAL('user_id_seq');

ALTER SEQUENCE nodejs_express.user_id_seq RESTART 10;