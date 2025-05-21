
import { useState, useEffect } from 'react';
import FormButaca from '../components/butacas/FormButaca';
import { ButacaContext } from './AppButacaContext';
import { getAllRooms, getAllSeats } from '~/services/room.service';
import ErrorBubble from '~/components/ErrorBubble';
import type { Seat } from '~/model/seat.model';
import type { Room } from '~/model/room.model';

export function Butacas() {
  const [butacas, setButacas] = useState<Seat[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [butaca, setButaca] = useState<Seat|null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const butacaContext = {
    butacas,
    rooms,
    error: null,
    updateError: setError,
    refreshButacas: async () => { },
    deleteButaca: async (id: number) => { }
  };

  const fetchButacas = async () => {
    setError(null);
    getAllSeats()
    .then((res) => {
      res.sort((a: Seat, b: Seat) => {
        if (a.rowNumber === b.rowNumber) {
          return a.number! - b.number!; // Ordenar por número si las filas son iguales
        }
        return a.rowNumber! - b.rowNumber!; // Ordenar por fila
      })
      setButacas(res)
    })
    .catch((error) => {
      console.error('Error fetching butacas:', error);
      setError(error);
    });
  }

  const fetchRooms = async () => {
    setError(null);
    getAllRooms()
    .then(setRooms)
    .catch(setError);
  };

  useEffect(() => {
    fetchRooms();
    fetchButacas();
  }, []);

  const filteredButacas = butacas.filter(butaca =>
    butaca.number?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    butaca.rowNumber?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    butaca.roomName?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (butaca: Seat) => {
    setButaca(butaca);
  };

  const handleDelete = (id: number) => {
    setButacas(butacas.filter(butaca => butaca.id !== id));
  };

  const toggleEstado = (id: number) => {
    console.debug('id', id);
    setButacas(butacas.map(butaca =>
      butaca.id === id
        ? {
          ...butaca,
          status: !butaca.status
        }
        : butaca
    ));
  };

  const onSentButaca = (butaca: Seat) => {
    const index = butacas.findIndex(b => b.id == butaca.id);
    console.debug('index', index);
    if (index !== -1) {
      // Actualizar butaca existente
      const updatedButacas = [...butacas];
      updatedButacas[index] = butaca;
      setButacas(updatedButacas);
    } else {
      // Agregar nueva butaca
      console.debug('butaca', butaca);
      setButacas([...butacas, butaca]);
    }
    setButaca(null); // Limpiar el formulario después de enviar
  }

  return (
    <ButacaContext.Provider value={{...butacaContext, refreshButacas: fetchButacas, refreshRooms: fetchRooms}}>
      <ErrorBubble message={error} onClose={() => setError("")} />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Gestión de Butacas</h1>

        <FormButaca onSent={onSentButaca} />

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar butacas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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
                      <div className="text-sm font-medium text-gray-900">{butaca.rowNumber}{butaca.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                        {butaca.roomName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleEstado(butaca?.id!)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer
                        ${butaca.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {butaca.status ? 'Disponible' : 'No Disponible'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(butaca?.id!)}
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
    </ButacaContext.Provider>
  );
};