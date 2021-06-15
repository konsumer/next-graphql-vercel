import { ApolloServer, gql } from 'apollo-server-micro'

import usersMock from '../../test/users.json'

export const typeDefs = gql`
type  User {
  id: ID
  login: String
  avatar_url: String
}

type  Query {
  getUsers: [User]
  getUser(name: String!): User!
}


type Mutation {
  deleteUser(name: String!): User!
}

`

let users = [...usersMock]

// these are example resolvers
export const resolvers = {
  Query: {
    getUsers () {
      return users
    },

    getUser (o, { name }) {
      const user = users.find(row => row.login.toLowerCase() === name.toLowerCase())
      if (!user) {
        throw new Error('User not found.')
      }
      return user
    }
  },
  Mutation: {
    deleteUser (o, { name }) {
      const user = resolvers.Query.getUser(o, { name })
      users = users.filter(u => u.login !== name)
      return user
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
