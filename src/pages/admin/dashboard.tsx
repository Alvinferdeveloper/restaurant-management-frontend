import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { CreditCardIcon, UsersIcon, UtensilsIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from '@apollo/client'
import { GET_STATISTICS } from '@/resolvers/admin/statistics'

type WeeklySales = {
    day: string;
    total: number;
}
type BestSellingFood = {
    image: string;
    name: string;
    totalSold: number;
}

type OrderStatistics = {
    totalSales: number;
    servedClients: number;
    foodSold: number;
    weeklySales: WeeklySales[];
    bestSellingFood: BestSellingFood[];

}

interface Data {
    orderStatistics: OrderStatistics;
}
export default function AdminDashboard() {
  const { data } = useQuery<Data>(GET_STATISTICS);
  const {  totalSales, servedClients, foodSold, weeklySales, bestSellingFood } = data?.orderStatistics || {};
  return (
    <div className="flex-col md:flex bg-gray-900 text-white min-h-screen">
      <div className="border-b border-gray-800">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard del Restaurante</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-80">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Vista General</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 ">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                  <CreditCardIcon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${ totalSales }</div>
                  <p className="text-xs text-gray-400">+18% respecto a ayer</p>
                </CardContent>
              </Card>
             
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
                  <UsersIcon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ servedClients }</div>
                  <p className="text-xs text-gray-400">+12% respecto a ayer</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platos Vendidos</CardTitle>
                  <UtensilsIcon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ foodSold}</div>
                  <p className="text-xs text-gray-400">+8% respecto a ayer</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 text-white">
              <Card className="col-span-4 bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Ventas Semanales</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={weeklySales}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Platos Más Vendidos</CardTitle>
                  <CardDescription className="text-gray-400">Top 4 platos de la semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {bestSellingFood?.map((dish, index) => (
                      <div className="flex items-center" key={dish.name}>
                        <Avatar className="h-9 w-9 bg-gray-700">
                          <AvatarImage src={dish.image} alt={dish.name} />
                          <AvatarFallback>{index + 1}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{dish.name}</p>
                          <p className="text-sm text-gray-400">
                            {dish.totalSold} unidades vendidas
                          </p>
                        </div>
                        <div className="ml-auto font-medium">{((dish.totalSold / 312) * 100).toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}