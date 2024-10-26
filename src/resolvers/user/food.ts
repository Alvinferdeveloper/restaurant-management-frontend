import { gql } from "@apollo/client"
export const GET_FOODS = gql`
    query food {
        foods {
            id
            name
            ingredients
            price
            preparation_time
            image
    }
}

`