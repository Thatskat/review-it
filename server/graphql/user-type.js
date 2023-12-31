const gql = require("graphql-tag");

const userType = gql`
  type UserType {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    isAdmin: Boolean
    displayName: String!
    token: String
  }
  type UserReturnType {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    isAdmin: Boolean
    displayName: String!
    token: String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    isAdmin: Boolean
    displayName: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    getUser(id: ID): UserType
    searchUsers(search: String): [UserType]
    getAllUsers: [UserType]
  }
  type Mutation {
    addUser(input: UserInput): UserReturnType
    editUser(id: ID!, input: UserInput): UserReturnType
    deleteUser(id: ID!): UserReturnType
    loginUser(input: LoginInput):UserReturnType
  }
`;

module.exports = userType;
