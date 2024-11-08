import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
interface FoodCart {
    id: number,
    name: string,
    price: number,
    amount: number,
    total: number
  }
export default function OrderBill({foodCart}:{ foodCart: FoodCart[] | undefined}){
    return (
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
            {foodCart?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.price.toFixed(2)} €</TableCell>
                <TableCell>{item.total} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}