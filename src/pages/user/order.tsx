import OrderBill from "@/components/user/orderBill";
import { GET_ORDER } from "@/resolvers/user/order";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

type FoodOrder = {
  amount: number
  food: {
    id: number
    name: string,
    price: number
  }
}

type Order = {
  total: number,
  food_order: FoodOrder[]
}

interface Data {
  order: Order;
}

export default function UserOrder() {
  const { orderId } = useParams();
  const { data } = useQuery<Data>(GET_ORDER, { variables: { orderId } });
  const foodCart = data?.order.food_order.map(foodOrder => ({ id: foodOrder.food.id, amount: foodOrder.amount, name: foodOrder.food.name, price: foodOrder.food.price, total: foodOrder.amount * foodOrder.food.price }));
  return <OrderBill foodCart={foodCart} />
}