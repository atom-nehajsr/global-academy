require('dotenv').config()

const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
chai.use(http);

const app = require('../src/index');

describe('health test', () => {

  describe('App', () => {
    it('Should exists', () => {
      expect(app).to.be.a('function');
    })

    it('GET / should return 200 and message', (done) => {
      chai.request(app).get('/')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.contain('Welcome to Global Academy');
          done();
        }).catch(err => {
          console.log(err.message);
        })
    });
  })
})

describe('course search', () => {
	it('should return 200 and If all input are valid', (done) => {
	  const searchParams = {
		country:"INDIA",
		gpa:85,
		greScore:70,
		course: "compter scince"
	  }
	  //send request to the app
	  chai.request(app).get('/course/searchCourse')
	  	.query(searchParams)
		.then((res) => {
		  expect(res).to.have.status(200);
		 done();
		}).catch(err => {
		  console.log(err.message);
		})
	});

	it('should return 200 and If all input are valid', (done) => {
		const searchParams = {
		  country:"INDIA",
		  gpa:85,
		  greScore:70,
		}
		//send request to the app
		chai.request(app).get('/course/searchCourse')
			.query(searchParams)
		  .then((res) => {
			expect(res).to.have.status(200);
			done();
		  }).catch(err => {
			console.log(err.message);
		  })
	  });

	  it('should return warning signal if missing search params', (done) => {
		const searchParams = {
		  country: "INDIA",
		  greScore: 70,
		  course: "compter scince"
		}
		//send request to the app
		chai.request(app).get('/course/searchCourse')
			.query(searchParams)
		  .then((res) => {
			expect(res).to.have.status(422);
			done();
		  }).catch(err => {
			console.log(err.message);
		  })
	  });

	  it('should return warning signal if missing search params', (done) => {
		const searchParams = {
		  country:"INDIA",
		  gpa: undefined,
		  greScore: undefined,
		}
		//send request to the app
		chai.request(app).get('/course/searchCourse')
			.query(searchParams)
		  .then((res) => {
			expect(res).to.have.status(422);
			done();
		  }).catch(err => {
			console.log(err.message);
		  })
	  });
});