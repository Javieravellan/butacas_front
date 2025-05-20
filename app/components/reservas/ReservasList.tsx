import { useContext, useState } from 'react';
import ReservaModal from './ReservaModal';
import { onlyHours } from '~/utils';
import { AppContext } from './AppReservaContext';

const ReservaList = () => {
    const [showModal, setShowModal] = useState(false);
    const [lastModified, setLastModified] = useState(new Date());
    const { reservas, refreshReservas } = useContext(AppContext);
    
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4">
                <div className="">
                    <h2 className="text-lg font-medium text-gray-900">Reservas del día</h2>
                    <p className="text-sm text-gray-500">Total: {reservas.length}</p>
                    <p className="text-sm text-gray-500">Última actualización: {lastModified.toLocaleString()}</p>
                </div>
                <div className="">
                    <button className='px-4 py-2 bg-gray-400 text-white text-sm rounded hover:bg-gray-500'
                        onClick={() => {
                            setLastModified(new Date())
                            refreshReservas();
                        }}
                    >
                        Refrescar
                    </button>&nbsp;
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
                    >
                        Agregar Reserva
                    </button>
                </div>
                
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Película</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Butacas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {reservas.length > 0 ? (
                        reservas.map((reserva: any) => (
                            <tr key={reserva.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{reserva.customer.name}</div>
                                    <div className="text-xs text-gray-500">ID: {reserva.customer.documentNumber}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium">{reserva.movie.name}</div>
                                    <div className="text-xs text-gray-500">{reserva.movie.genre}</div>
                                    <div className="text-xs text-gray-500">{reserva.roomName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm">{onlyHours(reserva.showTime)}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {reserva.seats.map((seat: any) => (
                                            <span
                                                key={seat.id}
                                                className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800"
                                            >
                                                {seat.rowNumber}{seat.number}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
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
                                No hay reservas registradas
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ReservaModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default ReservaList;