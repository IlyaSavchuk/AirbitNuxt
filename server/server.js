require('dotenv').config({ path: '.env' })

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/users', (req, res) => {
  const { userId, name } = req.body
  chatkit
    .createUser({
      id: userId,
      name
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(err => {
      res.status(err.status).json(err)
    })
})

app.get('/users', (req, res) => {
  chatkit
    .getUsers({})
    .then(users => {
      res.status(200).send({
        users
      })
    })
    .catch(err => {
      res.status(500).send({
        err
      })
    })
})

app.set('port', process.env.SERVER_PORT || 5200)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
