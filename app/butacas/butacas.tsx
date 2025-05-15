
import { useState, useEffect } from 'react';

const rooms = [
  { id: 1, name: 'Sala 1' },
  { id: 2, name: 'Sala 2' },
  { id: 3, name: 'Sala 3' },
  { id: 4, name: 'Sala 4' },
  { id: 5, name: 'Sala 5' },
]

export function Butacas() {
  // Estado para las butacas
  const [butacas, setButacas] = useState<any[]>([]);
  const [numero, setNumero] = useState(0);
  const [fila, setFila] = useState(0);
  const [roomName, setRoomName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roomId, setRoomId] = useState(0);

  // Datos iniciales (simulando una API)
  useEffect(() => {
    const initialData: any = [
      { id: 1, numero: 1, fila: 1, roomName: 'Sala 1', roomId: 1, status: true },
      { id: 2, numero: 2, fila: 1, roomName: 'Sala 1', roomId: 1, status: true },
      { id: 3, numero: 1, fila: 1, roomName: 'Sala 2', roomId: 2, status: true },
    ];
    setButacas(initialData);
  }, []);

  // Filtrar butacas
  const filteredButacas = butacas.filter(butaca =>
    butaca.numero.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    butaca.fila.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear o actualizar butaca
  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (editingId) {
      // Actualizar
      setButacas(butacas.map(butaca =>
        butaca.id === editingId ? { ...butaca, numero, fila, roomName, roomId, status } : butaca
      ));
      setEditingId(null);
    } else {
      // Crear
      const newButaca = {
        id: Date.now(),
        numero,
        fila,
        roomName,
        status: true
      };
      setButacas([...butacas, newButaca]);
    }

    // Limpiar formulario
    setNumero(0);
    setFila(0);
    setRoomName('');
  };

  // Editar butaca
  const handleEdit = (butaca: any) => {
    setNumero(butaca.numero);
    setFila(butaca.fila);
    setRoomName(butaca.roomName);
    setEditingId(butaca.id);
  };

  // Eliminar butaca
  const handleDelete = (id: number) => {
    setButacas(butacas.filter(butaca => butaca.id !== id));
  };

  // Cambiar estado de disponibilidad
  const toggleEstado = (id: number) => {
    setButacas(butacas.map(butaca =>
      butaca.id === id
        ? {
            ...butaca,
            status: !butaca.status
          }
        : butaca
    ));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">Gestión de Butacas</h1>
      
      {/* Formulario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Editar Butaca' : 'Agregar Nueva Butaca'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fila</label>
              <input
                type="text"
                value={fila}
                onChange={(e) => setFila(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
                maxLength={1}
                placeholder="Ej: A"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Número</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
                placeholder="Ej: 1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={roomId}
                onChange={(e) => setRoomName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              >
                {rooms.map((room: any) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar butacas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      {/* Tabla de butacas */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Butaca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredButacas.length > 0 ? (
              filteredButacas.map((butaca) => (
                <tr key={butaca.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{butaca.fila}{butaca.numero}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                      {butaca.roomName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleEstado(butaca.id)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer
                        ${butaca.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {butaca.status ? 'Disponible' : 'No Disponible'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(butaca)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(butaca.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron butacas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};