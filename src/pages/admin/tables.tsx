import { gql } from '@apollo/client'
import { useQuery} from '@apollo/client'
import { Edit2, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'


interface Table {
    id: number
    name: string,
    seats: number,
    table_number: number,
    createdAt: number,
    x: number,
    y: number
}
interface Data {
    tables: [Table]
}

const GET_TABLES = gql`
    query Table {
        tables {
            id
            name
            seats
            table_number
            createdAt
    }
}

`

export default function AdminTables() {
    const { data } = useQuery<Data>(GET_TABLES);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Mesas del Restaurante</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.tables?.map((table) => (
                    <div key={table.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-semibold text-primary">Mesa {table.table_number}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                                <span className="font-medium">Asientos:</span> {table.seats}
                            </div>
                            <div className="text-xs text-muted-foreground mb-4">
                                <span className="font-medium">Creada el:</span> {new Date(Number(table.createdAt)).toLocaleString().toString()}
                            </div>
                            <div className="flex justify-between">
                                <Button variant="outline" size="sm" className="flex items-center">
                                    <Edit2 className="h-4 w-4 mr-1" />
                                    Editar
                                </Button>
                                <Button variant="destructive" size="sm" className="flex items-center">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}