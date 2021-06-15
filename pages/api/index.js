import { ApolloServer, gql } from 'apollo-server-micro'

import users from '../../test/users.json'

export const typeDefs = gql`
type  User {
  id: ID
  login: String
  avatar_url: String
}

type  Query {
  getUsers: [User]
  getUser(name: String!): User!
}`

// these are example resolvers
export const resolvers = {
  Query: {
    getUsers () {
      return users
    },

    getUser (o, { name }) {
      return users.find(row => row.login.toLowerCase() === name.toLowerCase())
    }
  }
}

export const server = new ApolloServer({ typeDefs, resolvers })
export const config = {
  api: {
    bodyParser: false
  }
}
export default server.createHandler({ path: '/api' })
