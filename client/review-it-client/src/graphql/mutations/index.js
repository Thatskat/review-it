import { gql } from "@apollo/client";

export const ADD_ACTOR = gql`
  mutation Mutation($input: ActorInput) {
    addActor(input: $input) {
      _id
      birthDate
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;

export const EDIT_ACTOR = gql`
  mutation EditActor($input: ActorInput) {
    editActor(input: $input) {
      _id
      birthDate
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;

export const DELETE_ACTOR = gql`
  mutation DeleteActor($deleteActorId: ID!) {
    deleteActor(id: $deleteActorId) {
      _id
      birthDate
      firstName
      imdbProfileLink
      lastName
      profilePicture
    }
  }
`;

export const ADD_TV_SHOW = gql`
  mutation AddTvShow($input: tvShowInput) {
    addTvShow(input: $input) {
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

export const EDIT_TV_SHOW = gql`
  mutation EditTvShow($input: tvShowInput) {
    editTvShow(input: $input) {
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

export const DELETE_SHOW = gql`
  mutation DeleteShow($deleteShowId: ID!) {
    deleteShow(id: $deleteShowId) {
      cast {
        _id
        birthDate
        firstName
        imdbProfileLink
        lastName
        profilePicture
      }
      description
      id
      episodeNo
      showPoster
      title
      imdbLink
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: UserInput) {
    addUser(input: $input) {
      displayName
      email
      id
      firstName
      isAdmin
      lastName
      profilePicture
      username
      password
    }
  }
`;
export const EDIT_USER = gql`
  mutation EditUser($input: UserInput) {
    editUser(input: $input) {
      displayName
      email
      id
      firstName
      isAdmin
      lastName
      password
      profilePicture
      username
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
      profilePicture
      username
    }
  }
`;
