import { gql, useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { Edit2, Table, Trash2, PlusCircle } from 'lucide-react'
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
import { toast } from 'sonner'


interface Table {
    id: number
    name: string,
    seats: number,
    table_number: number,
    createdAt: number,
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
const ADD_TABLE = gql`
    mutation ADD_TABLE($tableInput: TableInput) {
        addTable(tableInput: $tableInput) {
         name
    }
}
`

const UPDATE_TABLE = gql`
    mutation UPDATE_TABLE($tableUpdate: TableUpdate) {
        updateTable(tableUpdate: $tableUpdate) {
         name
         seats
    }
}
`
const DELETE_TABLE = gql`
    mutation DELETE_TABLE($id: ID) {
        deleteTable(id:$id)
  }
`
export default function AdminTables() {
    const { data } = useQuery<Data>(GET_TABLES);
    const [editingTable, setEditingTable] = useState<Table | null>(null);
    const [updateTableMutation] = useMutation(UPDATE_TABLE, { refetchQueries: [{ query: GET_TABLES }] });
    const [addTableMutation] = useMutation(ADD_TABLE, { refetchQueries: [{ query: GET_TABLES }] });
    const [deleteTableMutation] = useMutation(DELETE_TABLE, { refetchQueries: [{ query: GET_TABLES }] });
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newTable, setNewTable] = useState({
        name: '',
        seats: 0
    });
    const handleEdit = (table: Table) => {
        setEditingTable(table);
        setIsDialogOpen(true)
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (editingTable) {
            updateTableMutation({ variables: { tableUpdate: { id: editingTable.id, name: editingTable.name, seats: Number(editingTable.seats) } } });
            setIsDialogOpen(false);
            toast("Informacion de la mesa actualizada", {
                description: `Ahora el nombre de la mesa es: ${editingTable.name} y asientos: ${editingTable.seats} `,
                action: {
                    label: "Aceptar",
                    onClick: () => { },
                },
            })
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

    const handleNewTableInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTable({
            ...newTable,
            [event.target.name]: event.target.value
        })
    }

    const handleAddTable = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addTableMutation({
            variables: {
                tableInput: { name: newTable.name, seats: Number(newTable.seats) }
            }
        })
        setIsAddDialogOpen(false);
        setNewTable({ name: '', seats: 0 })
    }

    const handleDeleteTable = (id: number) => {
        console.log(id);
        deleteTableMutation({ variables: { id: Number(id) }})
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Mesas del Restaurante</h1>
            <div className="mb-4 flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex items-center" onClick={() => setIsAddDialogOpen(true)}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Agregar Mesa
                        </Button>
                    </DialogTrigger>
                    {isAddDialogOpen && (
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Agregar Nueva Mesa</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddTable} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-name">Nombre de la mesa</Label>
                                    <Input
                                        id="new-name"
                                        name="name"
                                        value={newTable.name}
                                        onChange={handleNewTableInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-seats">Cantidad de asientos</Label>
                                    <Input
                                        id="new-seats"
                                        name="seats"
                                        type="number"
                                        value={newTable.seats}
                                        onChange={handleNewTableInputChange}
                                        required
                                    />
                                </div>
                                <Button type="submit">Agregar Mesa</Button>
                            </form>
                        </DialogContent>
                    )}
                </Dialog>
            </div>
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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleEdit(table)}>
                                            <Edit2 className="h-4 w-4 mr-1" />
                                            Editar
                                        </Button>
                                    </DialogTrigger>
                                    {
                                        isDialogOpen && (
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
                                        )
                                    }
                                </Dialog>
                                <Button variant="destructive" size="sm" className="flex items-center" onClick={()=>handleDeleteTable(table.id)}>
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