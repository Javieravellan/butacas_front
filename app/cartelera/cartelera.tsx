import { useState, useEffect } from 'react';
import FormCartelera from '~/components/cartelera/FormCartelera';
import { createBillboard, deleteBillboard, getAllBillboards } from '~/services/billboard.service';
import { formatDate } from '~/utils';
import { BillboardContext } from './BillboardContext';
import type { Billboard } from '~/model/billboard.model';
import ErrorBubble from '~/components/ErrorBubble';

export default function Cartelera() {
  // Estado para las carteleras
  const [carteleras, setCarteleras] = useState<Billboard[]>([]);
  const [cartelera, setCartelera] = useState<Billboard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const billboardContext = {
    billboards: carteleras,
    billboard: cartelera,
    error: null,
    updateIsSaved: setSaved,
    isSaved: saved,
    updateBillboard: (b: Billboard | null) => setCartelera(b),
    updateError: setError,
    refreshBillboard: async () => { },
    createBillboard: createBillboard,
    deleteBillboard: deleteBillboard
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

  const filteredCarteleras = carteleras.filter(cartelera =>
    cartelera?.startTime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cartelera?.endTime?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (cartelera: Billboard) => {
    setCartelera(cartelera);
  };

  const handleDelete = (id: number) => {
    setError(null);
    billboardContext.deleteBillboard(id)
      .then(() => getBillboard())
      .catch((error) => setError(error.toString()));
  };

  return (
    <BillboardContext.Provider value={{ ...billboardContext, refreshBillboard: getBillboard }}>
      <ErrorBubble message={error} onClose={() => setError(null)} />
      <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-2xl font-bold text-center mb-6">Gestión de Carteleras</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="min-w-0 md:w-2/5 w-full">
            <FormCartelera />
          </div>
          <div className="min-w-0 md:w-3/5 w-full">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Buscar carteleras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
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
        </div>

      </div>
    </BillboardContext.Provider>
  );
};