
import { useState, useEffect } from 'react';
import FormButaca from '../components/butacas/FormButaca';

export function Butacas() {
  // Estado para las butacas
  const [butacas, setButacas] = useState<any[]>([]);
  const [butaca, setButaca] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Editar butaca
  const handleEdit = (butaca: any) => {
    setButaca(butaca);
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

  const onSentButaca = (butaca: any) => {
    const index = butacas.findIndex(b => b.id == butaca.id);
    console.debug('index', index);
    if (index !== -1) {
      // Actualizar butaca existente
      const updatedButacas = [...butacas];
      updatedButacas[index] = butaca;
      setButacas(updatedButacas);
    } else {
      // Agregar nueva butaca
      setButacas([...butacas, butaca]);
    }
    setButaca(null); // Limpiar el formulario después de enviar
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">Gestión de Butacas</h1>
      
      {/* Formulario */}
      <FormButaca onSent={onSentButaca} butaca={butaca} />
      
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
                      onClick={() => toggleEstado(butaca)}
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