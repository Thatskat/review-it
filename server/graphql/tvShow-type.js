const gql = require("graphql-tag");

const tvShowType = gql`
  type tvShowType {
    id: ID
    title: String!
    description: String!
    episodeNo: Int!
    cast: [ActorType!]
    showPoster: String!
    imdbLink: String!
  }
  input tvShowInput {
    title: String!
    description: String!
    episodeNo: Int!
    cast: [ID!]
    showPoster: String!
    imdbLink: String!
  }
  type Query {
    getTvShow(id: ID): tvShowType
    getAllTvShows: [tvShowType]
    searchShow(title: String!): [tvShowType]
  }
  type Mutation {
    addTvShow(input: tvShowInput): tvShowType
    editTvShow(input: tvShowInput): tvShowType
    deleteShow(id: ID!): tvShowType
  }
`;

module.exports = tvShowType;