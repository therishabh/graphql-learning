import {ApolloServer, gql} from 'apollo-server';
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
import {quotes, users} from './fakedb.js';

const typeDefs = gql`
    type Query{
        users:[User]
        quotes : [Quote]
        user(id:ID!): User
    }
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String   
        quotes: [Quote]
    }
    type Quote {
        name: String
        by: String
    }

`

const resolvers = {
    Query : {
        users : () => {
            return users
        },
        quotes : () => {
            return quotes
        },
        user: (_, args) => {
            console.log(args)
            return users.find(user => user.id === args.id)
        }
    },
    User : {
        quotes : (user) => {
            return quotes.filter(quote => quote.by === user.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins : [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})