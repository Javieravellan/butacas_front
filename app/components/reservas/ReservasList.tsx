import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import ReservaModal from './ReservaModal';

const ReservaList = (props: { reservas: any, onEdit: any, onDelete: any }) => {
    const { reservas, onEdit, onDelete } = props;
    const [showModal, setShowModal] = useState(false);
    
    const formatDateTime = (date: any, time: any) => {
        try {
            const dateObj = new Date(`${date}T${time}`);
            return format(dateObj, "dd/MM/yyyy HH:mm", { locale: es });
        } catch {
            return `${date} ${time}`;
        }
    };

    const handleAdd = (data: any) => {
        console.debug(data);
        setShowModal(false);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-medium text-gray-900">Reservas del día</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
                >
                    Agregar Reserva
                </button>
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
                                    <div className="text-sm font-medium text-gray-900">{reserva.customerName}</div>
                                    <div className="text-xs text-gray-500">ID: {reserva.customerId}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium">{reserva.movie.name}</div>
                                    <div className="text-xs text-gray-500">{reserva.movie.genre}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm">{formatDateTime(reserva.date, reserva.showTime)}</div>
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
                                        onClick={() => onEdit(reserva)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(reserva.id)}
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
                onSubmit={handleAdd}
                funciones={null!}
            />
        </div>
    );
};

export default ReservaList;