require('dotenv').config()

const mysql = require('./mysql')
const C = require('../utils/constant')

const query = `
CREATE DATABASE IF NOT EXISTS academy;

CREATE TABLE IF NOT EXISTS ${C.mysql.globalAcademy.university}(
	universityId MEDIUMINT NOT NULL AUTO_INCREMENT,
	name VARCHAR(24) NOT NULL,
	country VARCHAR(24) NOT NULL,
	description VARCHAR(50),
	gpa INT NOT NULL,
	greScore INT NOT NULL,
	PRIMARY KEY (universityId),
	INDEX (country,gpa,greScore)
);

CREATE TABLE IF NOT EXISTS ${C.mysql.globalAcademy.courses}(
	courseId MEDIUMINT NOT NULL AUTO_INCREMENT,
	universityId MEDIUMINT NOT NULL,
	name VARCHAR(24) NOT NULL,
	teacherName VARCHAR(24) NOT NULL,
	PRIMARY KEY (courseId, universityId),
	INDEX (universityId,name),
	FOREIGN KEY (universityId)
		REFERENCES academy.university(universityId)
);

INSERT INTO universiniversity (name,country,description,gpa,greScore) VALUES ('LNMIIT','INDIA','DEEMED UNIVERSITY',75,80);
INSERT INTO university (name,country,description,gpa,greScore) VALUES ('MNIT','INDIA','PUBLIC TECHNICAL UNIVERSITY',85,80);
INSERT INTO university (name,country,description,gpa,greScore) VALUES ('JECRC','INDIA','GOVERMENT UNIVERSITY',65,70);

INSERT INTO courses (universityId,name,teacherName) VALUES (1,'DATA SCIENCE','BINDU');
INSERT INTO courses (universityId,name,teacherName) VALUES (1,'COMPUTER SCIENCE','AJEET');
INSERT INTO courses (universityId,name,teacherName) VALUES (1,'MATHS','RAJ');
INSERT INTO courses (universityId,name,teacherName) VALUES (1,'ARTSC','VIDYA');
INSERT INTO courses (universityId,name,teacherName) VALUES (2,'DATA SCIENCE','Neha');
INSERT INTO courses (universityId,name,teacherName) VALUES (2,'COMPUTER SCIENCE','RAJU')
INSERT INTO courses (universityId,name,teacherName) VALUES (2,'HISTORY','SANA');
INSERT INTO courses (universityId,name,teacherName) VALUES (3,'ECONOMICS','TEJAL');
INSERT INTO courses (universityId,name,teacherName) VALUES (3,'ARTS','SAPNA');
INSERT INTO courses (universityId,name,teacherName) VALUES (3,'ECO','MAYANK');

`
mysql
	.query(query)
	.then(() => {
		console.log('CREATED')
		process.exit()
	})
	.catch((err) => {
		console.error(err)
		process.exit()
	})
