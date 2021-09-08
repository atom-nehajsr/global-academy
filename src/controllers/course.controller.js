const mysql = require('../resources/mysql')
const { mysql: { globalAcademy: ACADEMY } } = require('../utils/constant')

function getQuery({
	country, gpa, greScore, course
}){
	const params = []
	const addParam = (value) => { params.push(value); return '?' }

	let query = `
		SELECT u.name as universityName, u.country as country, c.name as courseName, c.teacherName as teacherName, u.gpa as minGpa, u.greScore as minGreScore
		FROM ${ACADEMY.courses} c 
		LEFT JOIN
			${ACADEMY.university} u ON c.universityId = u.universityId 
		WHERE 
			country	=  ${addParam(country)} AND 
			gpa >=  ${addParam(gpa)} AND
			greScore >=  ${addParam(greScore)} 
	`
	if(course && course.trim().length){
		query += `
		AND( 
			SOUNDEX(${addParam(course.trim())}) = SOUNDEX(c.name) OR
			c.name LIKE  '%${course.trim()}' OR
			c.name LIKE  '${course.trim()}%' OR
			c.name LIKE  '%${course.trim()}%'
		)
		`
	}

	return { query, params }
}

async function queryExecutorCourses({
	country, gpa, greScore, course,
}) {
	const { query, params } = getQuery({
		country, gpa, greScore, course,
	})

	const rows = await mysql.query(query, params).catch((error) => {
		console.error('Error in fetching courses', error)
	})

	return rows || []
}

/**
 * @param  {object} searchParams
 * @returns {Promise<Array<{course}>>}
*/
async function getCourses(searchParams) {
	const {
		country, gpa, greScore, course,
	} = searchParams

	const results = await queryExecutorCourses({
		country, gpa, greScore, course,
	})
	return results
}

module.exports = {
	getCourses,
}
