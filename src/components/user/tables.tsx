import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Square, Menu } from "lucide-react"
import { useQuery } from '@apollo/client'
import { GET_TABLES } from '@/resolvers/user/table'

type Table = {
    id: number
    table_number: number,
    seats: number
}

interface Data {
    tables: [Table]
}


export default function UserTables() {
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const { data } = useQuery<Data>(GET_TABLES);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Selecciona tu Mesa</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
                    {data?.tables.map((table) => (
                        <button
                            key={table.id}
                            onClick={() => setSelectedTable(table.id)}
                            className={`relative p-4 rounded-lg transition-all duration-300 ${selectedTable === table.id ? 'bg-white ring-2 ring-primary' :' bg-white hover:bg-slate-200'
                                }`}
                        >
                            <span className="block mt-2 text-sm font-medium text-gray-600">
                                Mesa 5
                            </span>
                           
                            <Square className={`w-16 h-16 ${selectedTable === table.id ? 'text-primary' : 'text-secondary'}`} />
                            <span className="block mt-2 text-sm font-medium text-gray-600">
                                {table.seats} asientos
                            </span>
                        </button>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-medium text-gray-700">
                        {selectedTable
                            ? `Mesa ${selectedTable} seleccionada`
                            : 'Selecciona una mesa para continuar'}
                    </p>
                    <Dialog>
                        {
                            selectedTable && (
                                <DialogTrigger asChild>
                                    <Button className="bg-black hover:bg-primary/90">
                                        <Menu className="mr-2 h-4 w-4" />
                                        Ver Menú
                                    </Button>
                                </DialogTrigger>
                            )
                        }

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Menú del Restaurante</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <span className="font-medium">Paella Valenciana</span>
                                    <span className="text-right">€18.99</span>
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <span className="font-medium">Gazpacho</span>
                                    <span className="text-right">€8.99</span>
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <span className="font-medium">Tortilla Española</span>
                                    <span className="text-right">€10.99</span>
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <span className="font-medium">Pulpo a la Gallega</span>
                                    <span className="text-right">€22.99</span>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}