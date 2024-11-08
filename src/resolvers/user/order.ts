import { gql } from "@apollo/client"
export const ADD_ORDER = gql`
  mutation ADD_ORDER($orderInput: OrderInput){
  addOrder(orderInput: $orderInput) {
    total
  }
}
`
export const GET_ORDERS = gql`
  query GET_ORDERS{
    orders {
    total
    date
    id
  }
  }
`

export const GET_ORDER = gql`
  
query order($orderId: ID!){
  order(orderId: $orderId) {
    total
      food_order {
        amount
        food {
          id
          name
          price
        }
      }
    }
  }
`