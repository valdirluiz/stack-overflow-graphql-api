const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')
const express = require('express')
var cors = require('cors')
const questions = require('./stackoverflow/questions')

const app = express()
app.use(cors())
app.use('/', graphqlHTTP({schema:questions, pretty: true}))
app.listen(8000, function () {
  console.log('Server listen on 8000.')
})
