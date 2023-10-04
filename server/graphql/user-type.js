const gql = require("graphql-tag");

const userType = gql`
  type UserType {
    id: ID
    fistName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    isAdmin: Boolean
    profilePicture: String!
  }
  input UserInput {
    fistName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    isAdmin: Boolean
    profilePicture: String!
  }
  type Query {
    getUser(id: ID): UserType
    searchUsers(search: String): [UserType]
  }
  type Mutation {
    addUser(input: UserInput): UserType
    editUser(input: UserInput): UserType
    deleteUser(id: ID!): UserType
  }
`;

module.exports = userType;
