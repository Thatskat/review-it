const gql = require("graphql-tag");

const tvShowType = gql`
  scalar Cursor
  type tvShowType {
    id: ID
    title: String!
    description: String!
    episodeNo: Int!
    showPoster: String!
    imdbLink: String!
  }
  input tvShowInput {
    title: String!
    description: String!
    episodeNo: Int!
    showPoster: String!
    imdbLink: String!
  }
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String!
    endCursor: String!
  }
  type tvShowEdge {
    node: tvShowType!
    cursor: String!
  }
  type tvShowConnection {
    totalCount: Int!
    edges: [tvShowEdge!]!
    pageInfo: PageInfo!
  }
  type Query {
    getTvShow(id: ID): tvShowType
    getAllTvShows: [tvShowType]
    searchShow(title: String!): [tvShowType]
    paginationTest(first: Int, after: String, last: Int, before: String): tvShowConnection!
  }
  type Mutation {
    addTvShow(input: tvShowInput): tvShowType
    editTvShow(id: ID!, input: tvShowInput): tvShowType
    deleteShow(id: ID!): tvShowType
  }
`;

module.exports = tvShowType;
