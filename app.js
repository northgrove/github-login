const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const doRequests = require('./doRequests')



const app = express()
app.use(logger('dev'))

// CORS
const cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', host)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  return next()
}
app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/', router)

app.use(
  session({
    name: 'github',
    keys: ['key1', 'key2']
  })
)

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send(err)
  next()
})

// STARTUP
const host = 'localhost'
const port = 5050
try {
  console.log(`Starting github getToken app`)
  app.listen(port, () => {
    console.log(`Done. I am listening on ${host}:${port}`)
  })
} catch (err) {
  throw new Error('Error starting express server:', err)
}

app.get('/auth', doRequests.getCode())
app.get('/callback', doRequests.getToken())
app.get('/user', doRequests.getUser())
app.get('/repos', doRequests.getRepos())
//app.post('/callback', (req, res) => { token.getToken(req.query.code)})        



module.exports = app
