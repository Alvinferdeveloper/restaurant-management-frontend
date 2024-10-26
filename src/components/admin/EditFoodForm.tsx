import { useState, useEffect } from 'react'
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from '@apollo/client'
import { GET_FOODS, UPDATE_FOOD } from '@/resolvers/admin/food'

type Food = {
    id: number
    name: string
    ingredients: string,
    price: number,
    preparation_time: number
    image: string
    available: boolean
}
interface EditFoodProps {
    food?: Food
    closeEditDialog: ()=> void
}

export default function EditFoodForm({ food, closeEditDialog }: EditFoodProps) {
    const [ updateFoodMutation] = useMutation(UPDATE_FOOD, { refetchQueries: [ { query: GET_FOODS}]});
    const [formData, setFormData] = useState<Food>({
        id: 0,
        name: 'food',
        ingredients: "msd",
        price: 0,
        preparation_time: 0,
        image: "sd",
        available: true
    });

    useEffect(() => {
        if (food)
            setFormData(food)
    }, [food])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, available: checked }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateFoodMutation({ variables: { foodUpdate: { ...formData, id: Number(formData.id), price: Number(formData.price), preparation_time: Number(formData.preparation_time)}}});
        closeEditDialog();
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Actualizar Comida</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData?.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ingredients">Ingredientes (separados por coma)</Label>
                    <Textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData?.ingredients}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Precio</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        min={0}
                        value={formData?.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="preparation_time">Tiempo de Preparación (minutos)</Label>
                    <Input
                        id="preparation_time"
                        name="preparation_time"
                        type="number"
                        value={formData?.preparation_time}
                        min={0}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="image">Imagen Actual</Label>
                    <img src={formData?.image} alt="" className=' h-14' />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="available"
                        checked={formData?.available}
                        onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="available">Disponible</Label>
                </div>
                <Button type="submit" className="w-full">Actualizar Comida</Button>
            </form>
        </DialogContent>
    )
}