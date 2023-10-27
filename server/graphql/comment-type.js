const gql = require("graphql-tag");

const commentType = gql`
  type CommentType {
    _id: ID
    comment: String!
    createdAt: String!
    updatedAt: String!
    user: ID!
    show: ID!
  }

  input CommentInput {
    comment: String!
    user: ID!
    show: ID!
  }
  type Query {
    getAllComments: [CommentType]
    getAllCommentsByUser(userId: ID!): [CommentType]
    getCommentById(commentId: ID!): CommentType
    getAllCommentsForShow(showId: ID!): [CommentType]
  }
  type Mutation {
    createComment(input: CommentInput!): CommentType!
    editComment(id: ID!, userId: ID!, input: CommentInput!): CommentType!
    deleteComment(commentId: ID!): CommentType!
  }
`;

module.exports = commentType;
