import { gql } from "@apollo/client";

export const FIND_ACTOR_BY_ID = gql`
  query ($findActorByIdId: ID!) {
    findActorById(id: $findActorByIdId) {
      _id
      birthDate
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;
export const FIND_ALL_ACTORS = gql`
  query {
    findAllActors {
      _id
      birthDate
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;

export const SEARCH_ACTOR_BY_FIRST_NAME = gql`
  query ($firstName: String!) {
    searchActorByFirstName(firstName: $firstName) {
      _id
      birthDate
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
      birthDate
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;
export const GET_TV_SHOW = gql`
  query GetTvShow($getTvShowId: ID) {
    getTvShow(id: $getTvShowId) {
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

export const GET_ALL_TV_SHOWS = gql`
  query Query {
    getAllTvShows {
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
      imdbLink
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
  query Query($getUserId: ID) {
    getUser(id: $getUserId) {
      displayName
      email
      firstName
      isAdmin
      id
      password
      lastName
      profilePicture
      username
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
