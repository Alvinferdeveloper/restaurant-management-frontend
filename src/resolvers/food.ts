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
export const TOOGLE_STATUS = gql`
    mutation TOOGLE_STATUS($id: ID){
        toogleStatus(id: $id){
            name
        }
    }
`
export const UPDATE_FOOD = gql`
    mutation UPDATE_FOOD($foodUpdate: FoodUpdate){
        updateFood(foodUpdate: $foodUpdate){
            name
        }
    }
`
