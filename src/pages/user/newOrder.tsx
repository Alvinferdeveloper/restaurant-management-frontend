import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ShoppingCart } from "lucide-react"
import { useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_ORDER } from '@/resolvers/user/order'
import Spinner from '@/components/shared/spiner'
import { Dialog } from '@/components/ui/dialog'
import OrderConfirmation from '@/components/user/orderConfirmation'
import OrderBill from '../../components/user/orderBill'


type Food = {
  id: number
  name: string
  price: number
  ingredients: string
  preparation_time: number
  image: string
}

interface FoodCart extends Food {
  id: number,
  amount: number,
  total: number
}
export default function NewOrder() {
  const location = useLocation();
  const { foodCart, totalPrice } = location.state as { foodCart: FoodCart[], totalPrice: number } || { foodCart: [], totalPrice: 0 };
  const [addOrderMutation, { loading, error }] = useMutation(ADD_ORDER)
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const handleConfirmOrder = () => {
    const order = {
      total: totalPrice,
      foodOrders: foodCart.map(food => ({ food_id: Number(food.id), amount: food.amount, total: food.total }))
    }
    addOrderMutation({ variables: { orderInput: order } });
    setOrderConfirmed(true);
    setConfirmationDialog(true)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Factura</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderBill foodCart={foodCart}/>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">Total del Pedido:</span>
          </div>
          <span className="text-2xl font-bold">{totalPrice.toFixed(2)} €</span>
        </div>
        <Dialog open={confirmationDialog && !error} onOpenChange={setConfirmationDialog}>
          <OrderConfirmation />
        </Dialog>

        {
          orderConfirmed ? (<div className="flex items-center text-green-600">
            <Check className="mr-2 h-5 w-5" />
            <span>Pedido confirmado</span>
          </div>
          ) : (
            <Button onClick={handleConfirmOrder} className="w-full">
              Confirmar Pedido
            </Button>
          )
        }

        {
          loading && (
            <Spinner />
          )
        }
      </CardFooter>
    </Card>
  )
}