const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course.controller')

router.get('/searchCourse', async (req, res) => {
	const {
		country, gpa, greScore
	} = req.query

	if (!country || !gpa || !greScore)  return res.status(422).json({ message: 'Required field missing!!!!' })

	const responses = await courseController.getCourses(req.query).catch((err) => {
		return res.status(500).json({ message: 'Internal server Error!!!!' })
	})
	return res.status(200).json(responses)
})

module.exports = router
