import { gql } from "@apollo/client";

export const ADD_ACTOR = gql`
  mutation Mutation($input: ActorInput) {
    addActor(input: $input) {
      _id
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;

export const EDIT_ACTOR = gql`
  mutation Mutation($input: ActorInput, $editActorId: ID!) {
    editActor(input: $input, id: $editActorId) {
      _id
      firstName
      lastName
      profilePicture
      imdbProfileLink
    }
  }
`;

export const DELETE_ACTOR = gql`
  mutation Mutation($deleteActorId: ID!) {
    deleteActor(id: $deleteActorId) {
      _id
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;

export const ADD_TV_SHOW = gql`
  mutation Mutation($input: tvShowInput) {
    addTvShow(input: $input) {
      description
      episodeNo
      id
      imdbLink
      showPoster
      title
    }
  }
`;

export const EDIT_TV_SHOW = gql`
  mutation Mutation($editTvShowId: ID!, $input: tvShowInput) {
    editTvShow(id: $editTvShowId, input: $input) {
      id
      title
      description
      episodeNo
      showPoster
      imdbLink
    }
  }
`;

export const DELETE_SHOW = gql`
  mutation Mutation($deleteShowId: ID!) {
    deleteShow(id: $deleteShowId) {
      description
      episodeNo
      id
      imdbLink
      showPoster
      title
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput) {
    addUser(input: $input) {
      _id
      displayName
      email
      firstName
      isAdmin
      lastName
      username
      token
    }
  }
`;
export const EDIT_USER = gql`
  mutation Mutation($editUserId: ID!, $input: UserInput) {
    editUser(id: $editUserId, input: $input) {
      _id
      displayName
      email
      firstName
      lastName
      username
      isAdmin
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      displayName
      firstName
      email
      id
      lastName
      isAdmin
      password
      username
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($input: LoginInput) {
    loginUser(input: $input) {
      _id
      email
      firstName
      isAdmin
      token
      username
      lastName
      displayName
    }
  }
`;

export const CREATE_COMMENT = gql`
mutation Mutation($input: CommentInput!) {
  createComment(input: $input) {
    _id
    comment
    createdAt
    show
    updatedAt
    author
  }
}
`;

export const DELETE_COMMENT = gql`
  mutation Mutation($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
      comment
      createdAt
      show
      updatedAt
      author
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation Mutation($editCommentId: ID!, $userId: ID!, $input: CommentInput!) {
    editComment(id: $editCommentId, userId: $userId, input: $input) {
      _id
      comment
      createdAt
      show
      author
      updatedAt
    }
  }
`;
