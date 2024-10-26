import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2 } from "lucide-react"
import { useQuery, useMutation } from '@apollo/client'
import { GET_FOODS, DELETE_FOOD, TOOGLE_STATUS } from "@/resolvers/admin/food"
import { Dialog} from '@/components/ui/dialog'
import { useState } from "react"
import EditFoodForm from "./EditFoodForm"

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


export default function FoodList() {
  const { data } = useQuery<Data>(GET_FOODS);
  const [ isEditOpen, setIsEditOpen ] = useState(false);
  const [ deleteFoodMutation ] = useMutation(DELETE_FOOD, { refetchQueries: [ { query: GET_FOODS}]});
  const [ toogleStatusMutation] = useMutation(TOOGLE_STATUS, { refetchQueries: [ { query: GET_FOODS}]})
  const [ editingFood, setEditingFood] = useState<Food>()
  const handleDelete = (id: number) => {
    deleteFoodMutation({ variables: { id }});
  }

  const handleAvailability = (id: number) => {
   toogleStatusMutation({ variables: { id }});
  }

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setIsEditOpen(true)
}

  const closeEditDialog = () => {
    setIsEditOpen(false);
  }

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
              <TableHead>Precio</TableHead>
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
                <TableCell>{food.price}$</TableCell>
                <TableCell>
                  <Switch
                    checked={food.available}
                    onCheckedChange={() => handleAvailability(food.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={()=> handleEdit(food)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(food.id)}>
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
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <EditFoodForm food={editingFood} closeEditDialog = { closeEditDialog}/>
      </Dialog>
    </div>
  )
}