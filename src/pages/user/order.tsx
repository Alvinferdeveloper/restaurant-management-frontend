import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Check } from "lucide-react"
import { useLocation } from 'react-router-dom'


type Food = {
    id: number
    name: string
    price: number
    ingredients: string
    preparation_time: number
    image: string
}

interface FoodCart extends Food {
    amount: number,
    total: number
}
export default function NewOrder() {
  const location = useLocation();
  const { foodCart, totalPrice } = location.state as { foodCart:  FoodCart[], totalPrice: number} || { foodCart: [], totalPrice:0}; // Ac
  console.log(location.state)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  

  const handleConfirmOrder = () => {
    setOrderConfirmed(true)
    // Aquí iría la lógica para enviar el pedido al servidor
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Factura</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plato</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodCart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.price.toFixed(2)} €</TableCell>
                <TableCell>{item.total} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">Total del Pedido:</span>
          </div>
          <span className="text-2xl font-bold">{totalPrice.toFixed(2)} €</span>
        </div>
        {orderConfirmed ? (
          <div className="flex items-center text-green-600">
            <Check className="mr-2 h-5 w-5" />
            <span>Pedido confirmado</span>
          </div>
        ) : (
          <Button onClick={handleConfirmOrder} className="w-full">
            Confirmar Pedido
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}