import { useEffect, useState } from 'react'
import { PlusCircle, Edit2, Trash2, Coffee } from 'lucide-react'
import { gql } from '@apollo/client'
import { useQuery, useMutation
    
 } from '@apollo/client'


interface Table {
    id: number
    name: string,
    seats: number,
    table_number: number,
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


export default function UserTables() {
    const { loading, error, data } = useQuery<Data>(GET_TABLES);
    const [ tables, setTables] = useState<Table[]>();
    const [addTableMutation] = useMutation(ADD_TABLE, { refetchQueries:[ { query: GET_TABLES}] });
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);

    useEffect(()=> {
        if(!data) return;
        const tableWithPosition = data?.tables.map( table => ({ ...table, x: Math.random() * 80, y: Math.random() * 80}));
        setTables(tableWithPosition)
    }, [data])

    const addTable = () => {
       addTableMutation( { variables: { tableInput: { name: "prueba desde cliente"}}})
    }

    const editTable = (table: Table) => {
        setSelectedTable(table)
    }

    const deleteTable = (id: number) => {

        setSelectedTable(null)
    }

    const updateTable = (updatedTable: Table) => {

        setSelectedTable(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">Diseño del Restaurante</h1>
                <div className="relative bg-gray-100 w-full h-[32rem] rounded-lg mb-6 overflow-hidden border-4 border-indigo-300">
                    {tables?.map(table => (
                        <div
                            key={table.id}
                            className="absolute bg-white rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-indigo-400"
                            style={{
                                width: '100px',
                                height: '100px',
                                left: `${table.x}%`,
                                top: `${table.y}%`,
                            }}
                            onClick={() => editTable(table)}
                        >
                            <Coffee className="text-indigo-500 w-12 h-12 mb-2 animate-bounce" />
                            <span className="font-bold text-gray-800">Mesa {table.id}</span>
                            <span className="text-sm text-gray-600">{4} asientos</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={addTable}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
                    >
                        <PlusCircle className="mr-2" size={20} />
                        Agregar Mesa
                    </button>
                </div>
                {selectedTable && (
                    <div className="bg-indigo-100 p-6 rounded-lg shadow-inner">
                    <h2 className="text-xl font-bold mb-4 text-indigo-800">Editar Mesa {selectedTable.table_number}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-indigo-700">Nombre de la mesa</label>
                        <input
                          type="text"
                          value={selectedTable.name}
                          onChange={e => updateTable({ ...selectedTable, name: e.target.value })}
                          className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-indigo-700">Número de Asientos</label>
                        <input
                          type="number"
                          value={selectedTable.seats}
                          onChange={e => updateTable({ ...selectedTable, seats: parseInt(e.target.value) })}
                          className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={() => updateTable(selectedTable)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
                      >
                        <Edit2 className="mr-2" size={16} />
                        Guardar
                      </button>
                      <button
                        onClick={() => deleteTable(selectedTable.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
                      >
                        <Trash2 className="mr-2" size={16} />
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
            </div>
        </div>
    )
}