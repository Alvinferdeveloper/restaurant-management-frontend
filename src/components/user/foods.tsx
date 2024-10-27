import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FOODS } from '@/resolvers/user/food'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Utensils, Plus, Minus, ShoppingCart } from "lucide-react"
import { useNavigate } from 'react-router-dom'

type Food = {
    id: number
    name: string
    price: number
    ingredients: string
    preparation_time: number
    image: string
}

interface Data {
    foods: [Food]
}

export default function MenuDialog() {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
    const [orderFoods, setOrderFoods] = useState<Food[]>();
    const navigate = useNavigate();
    const { data } = useQuery<Data>(GET_FOODS)

    const updateQuantity = (id: number, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }))
    }


    const totalPrice = data?.foods.reduce((sum, food) => sum + food.price * (quantities[food.id] || 0), 0);

    const addFood = (food: Food) => {
        setOrderFoods((prev = []) => {
            const foodIndex = prev.findIndex(fd => fd.id === food.id);

            if (foodIndex > -1) {
                const updatedFoods = [...prev];
                updatedFoods[foodIndex] = food;
                return updatedFoods;
            }
            return [...prev, food];
        });
    }

    const removeFood = (food: Food) => {
        setOrderFoods(prev => prev?.filter(fd => fd.id != food.id))
    }

    return (
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-full">
            <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center">Nuestro Menú</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[calc(90vh-10rem)] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {data?.foods.map((food) => (
                        <Card key={food.id} className="overflow-hidden">
                            <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className=" object-contain w-full h-full"
                                    />
                                    <Badge className="absolute top-2 right-2">Platos Principales</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle>{food.name}</CardTitle>
                                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-4 w-4" />
                                    <span>{food.preparation_time} minutos</span>
                                </div>
                                <div className="mt-2">
                                    <h4 className="font-semibold text-sm">Ingredientes:</h4>
                                    <p className="text-sm text-muted-foreground">{food.ingredients}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center p-4 bg-secondary/10">
                                <div className="flex items-center">
                                    <Utensils className="mr-2 h-4 w-4" />
                                    <span className="font-bold">{food.price.toFixed(2)} €</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            updateQuantity(food.id, -1);
                                            removeFood(food);
                                        }}
                                        disabled={!quantities[food.id]}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">{quantities[food.id] || 0}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            updateQuantity(food.id, 1);
                                            addFood(food)
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
            <div className=" p-4 bg-secondary/10 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <ShoppingCart className="mr-2 h-6 w-6" />
                        <span className="text-xl font-bold">Total del Pedido:</span>
                    </div>
                    <span className="text-2xl font-bold">{totalPrice?.toFixed(2)} €</span>
                    <Button className="bg-black hover:bg-primary/90" onClick={() => {
                        const foodCart = orderFoods?.map(food => ({ ...food, amount: quantities[food.id], total: quantities[food.id] * food.price }));
                        navigate('/User/NewOrder', { state: { foodCart, totalPrice } })
                    }}>

                        Confirmar
                    </Button>
                </div>
            </div>
        </DialogContent>
    )
}