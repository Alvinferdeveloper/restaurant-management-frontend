import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useQuery } from "@apollo/client"
import { GET_ORDERS } from "@/resolvers/user/order"
import { Badge } from "@/components/ui/badge"


type Order = {
  id: number,
  date: string,
  total: number,
}

interface Data {
  orders: Order[]
}

export default function UserOrders() {
  const { data } = useQuery<Data>(GET_ORDERS, { fetchPolicy:'no-cache'});
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Mi Historial de Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID de Orden</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(Number(order.date)).toLocaleString().toString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 transition-colors duration-200 font-semibold px-2 py-1 text-sm rounded-md"
                    >
                      ${order.total.toFixed(2)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <a href={`/User/order/${order.id}`}>
                      <Button variant="outline">Ver detalles</Button>
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}