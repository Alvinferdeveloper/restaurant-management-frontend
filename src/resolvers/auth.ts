import { gql } from "@apollo/client"
export const GET_USER_AUTH = gql`
    query USER {
        user {
            id
            name
            roles
    }
}

`