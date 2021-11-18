const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    bookCount : Int
    savedbooks : [Book]
    }

type Book {
    bookId :  String!
    authors : [String]
    description: String
    title : String!
    image: 
    link: String
}
type Auth {
    token: ID!
    user: User
}

type Query {
   me: User
  }

  input SaveBook {
    bookId :  String!
    authors : [String]
    description: String
    title : String!
    image: 
    link: String
}

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook:(input:SaveBook): User
    removeBook:(bookId : String!): User
  }
`
