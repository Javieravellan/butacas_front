import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

export default function Cartelera() {
  // Estado para las carteleras
  const [carteleras, setCarteleras] = useState<any[]>([]);
  const [status, setStatus] = useState('Activa');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos iniciales (simulando una API)
  useEffect(() => {
    const initialData: any[] = [
      { 
        id: 1, 
        status: 'Activa', 
        start_time: '2023-06-01T10:00:00', 
        end_time: '2023-06-30T22:00:00' 
      },
      { 
        id: 2, 
        status: 'Inactiva', 
        start_time: '2023-07-01T10:00:00', 
        end_time: '2023-07-31T22:00:00' 
      },
    ];
    setCarteleras(initialData);
  }, []);

  // Filtrar carteleras
  const filteredCarteleras = carteleras.filter(cartelera =>
    cartelera.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cartelera.start_time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cartelera.end_time.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Crear o actualizar cartelera
  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (editingId) {
      // Actualizar
      setCarteleras(carteleras.map(cartelera =>
        cartelera.id === editingId ? { 
          ...cartelera, 
          status,
          start_time: startTime,
          end_time: endTime
        } : cartelera
      ));
      setEditingId(null);
    } else {
      // Crear
      const newCartelera = {
        id: Date.now(),
        status,
        start_time: startTime,
        end_time: endTime
      };
      setCarteleras([...carteleras, newCartelera]);
    }

    // Limpiar formulario
    setStatus('Activa');
    setStartTime('');
    setEndTime('');
  };

  // Editar cartelera
  const handleEdit = (cartelera: any) => {
    setStatus(cartelera.status);
    setStartTime(cartelera.start_time);
    setEndTime(cartelera.end_time);
    setEditingId(cartelera.id);
  };

  // Eliminar cartelera
  const handleDelete = (id: number) => {
    setCarteleras(carteleras.filter(cartelera => cartelera.id !== id));
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">Gestión de Carteleras</h1>
      
      {/* Formulario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Editar Cartelera' : 'Agregar Nueva Cartelera'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha/Hora Inicio</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha/Hora Fin</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                required
              />
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
          placeholder="Buscar carteleras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      {/* Tabla de carteleras */}
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
                      ${cartelera.status === 'Activa' ? 'bg-green-100 text-green-800' : 
                        cartelera.status === 'Inactiva' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {cartelera.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(cartelera.start_time)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(cartelera.end_time)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(cartelera)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cartelera.id)}
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
  );
};