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
