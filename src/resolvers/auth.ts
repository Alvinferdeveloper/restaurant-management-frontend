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

export const LOGIN = gql`
 mutation LOGIN($email: String!, $password: String!) {
 login(email: $email, password: $password) {
  name
  roles{
    name
  }
 }
}

`;