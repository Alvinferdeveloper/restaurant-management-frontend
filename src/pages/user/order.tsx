import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import OrderBill from "@/components/user/orderBill";
import { GET_ORDER } from "@/resolvers/user/order";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

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
  const foodCart = data?.order.food_order.map(foodOrder => ({
    id: foodOrder.food.id,
    amount: foodOrder.amount,
    name: foodOrder.food.name,
    price: foodOrder.food.price,
    total: foodOrder.amount * foodOrder.food.price
  }));
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Factura</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderBill foodCart={foodCart} />
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">Total del Pedido:</span>
          </div>
          <span className="text-2xl font-bold">{data?.order.total.toFixed(2)} €</span>
        </div>
      </CardFooter>
    </Card>
  )
}