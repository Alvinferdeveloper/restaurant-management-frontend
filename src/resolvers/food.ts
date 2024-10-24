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
            available
    }
}

`
export const  DELETE_FOOD = gql`
    mutation DELETE_FOOD($id: ID) {
        deleteFood(id:$id)
  }
`

export const ADD_FOOD = gql`
  mutation Food($foodInput: FoodInput){
  addFood(foodInput: $foodInput) {
    name
  }
}
`