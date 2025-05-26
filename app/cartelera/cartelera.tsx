import { useState, useEffect } from 'react';
import FormCartelera from '~/components/cartelera/FormCartelera';
import { createBillboard, getAllBillboards } from '~/services/billboard.service';
import { formatDate } from '~/utils';
import { BillboardContext } from './BillboardContext';
import type { Billboard } from '~/model/billboard.model';
import ErrorBubble from '~/components/ErrorBubble';

export default function Cartelera() {
  // Estado para las carteleras
  const [carteleras, setCarteleras] = useState<Billboard[]>([]);
  const [cartelera, setCartelera] = useState<Billboard|null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const billboardContext = {
    billboards: carteleras,
    billboard: cartelera,
    error: null,
    updateError: setError,
    refreshBillboard: async () => { },
    createBillboard: createBillboard,
    deleteBillboard: async (id: number) => { }
  }

  const getBillboard = async () => {
    setError(null);
    getAllBillboards()
      .then((res) => {
        res.sort((a: any, b: any) => {
          return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
        });
        setCarteleras(res);
      }).catch(setError);
  }

  // Datos iniciales (simulando una API)
  useEffect(() => {
    getBillboard();
  }, []);

  // Filtrar carteleras
  const filteredCarteleras = carteleras.filter(cartelera =>
    cartelera?.startTime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cartelera?.endTime?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear o actualizar cartelera
  const onSent = (cart: any) => {
    const index = carteleras.findIndex(c => c?.id === cart?.id);
    if (index !== -1) {
      // Actualizar cartelera existente
      const updatedCarteleras = [...carteleras];
      updatedCarteleras[index] = cart;
      setCarteleras(updatedCarteleras);
    } else {
      setCarteleras([...carteleras, cart]);
    }
    setCartelera(null); // Limpiar el formulario después de enviar
  };

  // Editar cartelera
  const handleEdit = (cartelera: any) => {
    setCartelera(cartelera);
  };

  // Eliminar cartelera
  const handleDelete = (id: number) => {
    setCarteleras(carteleras.filter(cartelera => cartelera.id !== id));
  };

  return (
    <BillboardContext.Provider value={{ ...billboardContext, refreshBillboard: getBillboard }}>
      <ErrorBubble error={error} onClose={() => setError(null)} />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Gestión de Carteleras</h1>

        <FormCartelera />

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar carteleras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCarteleras.length > 0 ? (
                filteredCarteleras.map((cartelera) => (
                  <tr key={cartelera.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cartelera.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${cartelera.status ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                        {cartelera.status ? 'Habilitado' : 'Deshabilitado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(cartelera.startTime)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(cartelera.endTime)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(cartelera)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(cartelera.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No se encontraron carteleras
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </BillboardContext.Provider>
  );
};