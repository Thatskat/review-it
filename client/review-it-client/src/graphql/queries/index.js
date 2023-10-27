import { gql } from "@apollo/client";

export const FIND_ACTOR_BY_ID = gql`
  query Query($findActorByIdId: ID!) {
    findActorById(id: $findActorByIdId) {
      _id
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;
export const FIND_ALL_ACTORS = gql`
  query Query {
    findAllActors {
      _id
      imdbProfileLink
      lastName
      profilePicture
      firstName
    }
  }
`;

export const SEARCH_ACTOR_BY_FIRST_NAME = gql`
  query ($firstName: String!) {
    searchActorByFirstName(firstName: $firstName) {
      _id
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;

export const SEARCH_ACTOR_BY_LAST_NAME = gql`
  query ($lastName: String!) {
    searchActorByLastName(lastName: $lastName) {
      _id
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;
export const GET_TV_SHOW = gql`
  query Query($getTvShowId: ID) {
    getTvShow(id: $getTvShowId) {
      description
      id
      episodeNo
      imdbLink
      showPoster
      title
    }
  }
`;

export const GET_ALL_TV_SHOWS = gql`
  query Query {
    getAllTvShows {
      id
      showPoster
      title
    }
  }
`;

export const SEARCH_SHOW = gql`
  query Query($title: String!) {
    searchShow(title: $title) {
      cast {
        _id
        birthDate
        firstName
        imdbProfileLink
        lastName
        profilePicture
      }
      description
      episodeNo
      id
      imdbLink
      showPoster
      title
    }
  }
`;

export const GET_USER = gql`
  query GetUser($getUserId: ID) {
    getUser(id: $getUserId) {
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

export const SEARCH_USERS = gql`
  query Query($search: String) {
    searchUsers(search: $search) {
      displayName
      email
      firstName
      id
      isAdmin
      lastName
      password
      profilePicture
      username
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  query Query {
    getAllComments {
      _id
      comment
      createdAt
      show
      updatedAt
      user
    }
  }
`;

export const GET_ALL_COMMENTS_BY_USER = gql`
  query Query($userId: ID!) {
    getAllCommentsByUser(userId: $userId) {
      _id
      comment
      show
      updatedAt
      user
      createdAt
    }
  }
`;

export const GET_ALL_COMMENTS_FOR_SHOW = gql`
  query Query($showId: ID!) {
    getAllCommentsForShow(showId: $showId) {
      _id
      comment
      createdAt
      show
      updatedAt
      user
    }
  }
`;

export const GET_COMMENT_BY_ID = gql`
  query Query($commentId: ID!) {
    getCommentById(commentId: $commentId) {
      _id
      comment
      show
      createdAt
      updatedAt
      user
    }
  }
`;
