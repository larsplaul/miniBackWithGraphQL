var express = require('express');
var router = express.Router();

const graphqlHTTP = require('express-graphql');
const {schema} = require('../graphQL/schema');

//console.log("SKEMA",schema)

router.use('/', graphqlHTTP({
  schema,
  graphiql: true
}))

module.exports = router;
