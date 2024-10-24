import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2 } from "lucide-react"
import { useQuery, gql } from '@apollo/client'

type Food = {
  id: number
  name: string
  ingredients: string,
  price: number,
  preparation_time: number
  image: string
  available: boolean
}

interface Data {
    foods: [Food]
}

const GET_FOODS = gql`
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


export default function FoodList() {
  const { data } = useQuery<Data>(GET_FOODS);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Gestión de Menú</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Ingredientes</TableHead>
              <TableHead>Tiempo de Preparación</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.foods.map((food) => (
              <TableRow key={food.id}>
                <TableCell>
                  <img src={food.image} alt={food.name} className="w-16 h-16 object-cover rounded-md" />
                </TableCell>
                <TableCell className="font-medium">{food.name}</TableCell>
                <TableCell className="hidden md:table-cell">{food.ingredients}</TableCell>
                <TableCell>{food.preparation_time} minutos</TableCell>
                <TableCell>
                  <Switch
                    checked={food.available}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}