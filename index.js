require('dotenv').config()

const envConfig = require('./.env.config.js')

async function envPreCheck() {
	const missing = []
	envConfig.forEach(({ name, critical }) => {
		if (process.env[name] == null && critical) missing.push(name)
	})

	if (missing.length) {
		throw new Error(`Missing environment variables\n${missing.join('\n')}`)
	}
}

async function main() {
	require('./src/index')
}

envPreCheck()
	.then(main)
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})
