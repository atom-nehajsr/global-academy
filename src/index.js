const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const courseRouter = require('./routes/course.routes')
const app = express()

app.use(cors())
app.use(express.json())

// API logs
morgan.token('body', (req) => JSON.stringify(req.body))
const reqFormat = ''
	+ '\n:method :url :status [:response-time ms] | :res[content-length]'
	+ '\n:req[content-length] :body'
app.use(morgan(reqFormat))


app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Global Academy" });
});

app.use('/course', courseRouter);

// Error handler
app.use((err, req, res, next) => {
	console.error(err)
	if (res.headersSent) next(err)
	else res.status(500).json({ message: err.message })
})

app.listen(process.env.PORT, () => {
	console.log(`listening on :${process.env.PORT}`)
})

module.exports = app;
