const mysql = require('mysql')

const connection = mysql.createPool({
	connectionLimit: 100,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
	port: process.env.MYSQL_PORT,
	multipleStatements: true,
})

const query = async (sql, params = []) => new Promise((resolve, reject) => {
	connection.query(sql, params, (error, results) => {
		if (error) reject(error)
		else resolve(results)
	})
})

module.exports.query = query
module.exports.pool = connection