const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')
const express = require('express')
const questions = require('./stackoverflow/questions')
const app = express()
app.use('/questions', graphqlHTTP({schema:questions, pretty: true}))
app.listen(3000, function () {
  console.log('Server on.')
})
