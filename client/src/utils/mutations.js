import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: SaveBook!){
    SaveBook(input:$input) {
        _id
        username
        bookCount
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($input :SaveBook!) {
    SaveBook(input : $input) {
        _id
        username
        bookCount
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;
