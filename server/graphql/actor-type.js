const gql = require("graphql-tag");

const actorType = gql`
  scalar Date
  type ActorType {
    _id: ID
    firstName: String!
    lastName: String!
    birthDate: Date!
    imdbProfileLink: String!
    profilePicture: String!
  }
  input ActorInput {
    firstName: String!
    lastName: String!
    birthDate: Date!
    imdbProfileLink: String!
    profilePicture: String!
  }
  type Query {
    findActorById(id: ID!): ActorType
    findAllActors: [ActorType]
    searchActorByFirstName(firstName: String!): [ActorType]
    searchActorByLastName(lastName: String!): [ActorType]
  }
  type Mutation {
    addActor(input: ActorInput): ActorType
    editActor(input: ActorInput): ActorType
    deleteActor(id: ID!): ActorType
  }
`;

module.exports = actorType;
