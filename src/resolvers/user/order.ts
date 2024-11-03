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