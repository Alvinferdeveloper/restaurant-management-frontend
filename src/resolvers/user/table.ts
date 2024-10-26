import { gql } from "@apollo/client"
export const GET_TABLES = gql`
    query table {
        tables {
            id
            table_number
            seats
    }
}

`