const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema/schema')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphQlResolvers = require('./graphql/resolvers/index');
const auth = require('./middleware/auth');

const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: graphQlResolvers,
  graphiql: true,
}));

mongoose.connect('mongodb+srv://wygarner:CuntShit88@cluster0.ktgu1.mongodb.net/Cluster0?retryWrites=true&w=majority', 
{ useNewUrlParser: true,
  useUnifiedTopology: true, 
})
  .then(() => {
    app.listen(3000);
    console.log('Running a GraphQL API server at http://localhost:3000/graphql');
  })
  .catch(err => {
    console.log(err);
  });
