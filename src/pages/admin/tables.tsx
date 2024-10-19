import { gql, useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { Edit2, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


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

const UPDATE_TABLE = gql`
    mutation UPDATE_TABLE($tableUpdate: TableUpdate) {
        updateTable(tableUpdate: $tableUpdate) {
         name
    }
}
`

export default function AdminTables() {
    const { data } = useQuery<Data>(GET_TABLES);
    const [editingTable, setEditingTable] = useState<Table | null>(null);
    const [ addTableMutation ] = useMutation(UPDATE_TABLE, { refetchQueries:[ { query: GET_TABLES}] });
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleEdit = (table: Table) => {
        setEditingTable(table);
        setIsDialogOpen(true)
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (editingTable) {
           addTableMutation({ variables: { tableUpdate: { id:editingTable.id, name: editingTable.name, seats: Number(editingTable.seats)}}});
           setIsDialogOpen(false)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editingTable) {
            setEditingTable({
                ...editingTable,
                [event.target.name]: event.target.value
            })
        }
    }

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
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleEdit(table)}>
                                            <Edit2 className="h-4 w-4 mr-1" />
                                            Editar
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Editar Mesa {table.table_number}</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSave} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Nombre de la mesa</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={editingTable?.name || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="number">Número de mesa</Label>
                                                <Input
                                                    id="number"
                                                    name="number"
                                                    type="number"
                                                    value={editingTable?.table_number || ""}
                                                    disabled
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="seats">Cantidad de asientos</Label>
                                                <Input
                                                    id="seats"
                                                    name="seats"
                                                    type="number"
                                                    value={editingTable?.seats || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <Button type="submit">Guardar cambios</Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
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