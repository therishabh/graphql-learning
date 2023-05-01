import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    user(id: ID!): User
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
  type Mutation {
    addNewUserDummy(userNew: UserInput!): User
  }
  input UserInput {
    firstName: String!, 
    lastName: String!, 
    email: String!, 
    password: String!
  }
`;

export default typeDefs;