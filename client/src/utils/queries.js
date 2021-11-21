import { gql } from '@apollo/client';

export const GET_ME = gql`
query user($userId : ID!) {
    user (userId: $userId){
        _id
        username
        email
        bookCount
        savedbooks {
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