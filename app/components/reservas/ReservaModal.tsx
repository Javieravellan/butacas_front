import React, { useContext, useState } from 'react';
import type { BillboardMovie } from '~/model/billboard_movie.model';
import { createBooking } from '~/services/billboard.service';
import { onlyHours } from '~/utils';
import { Seat } from './Seat';
import ApiButton from '../ApiButton';
import { AppContext } from './AppReservaContext';

const ReservaModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
    const [formData, setFormData] = useState<any | null>({
        documentNumber: '',
        customerName: '',
        phoneNumber: '',
        customerEmail: '',
        billboardMovieId: '',
        customerAge: '',
        seatIds: [],
    });

    const [functionSelected, setFunctionSelected] = useState<BillboardMovie | null>(null);

    const { billboard, updateError, refreshBillboard, refreshReservas } = useContext(AppContext);

    const onSelectMovie = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        billboard?.billboardMovies?.filter((funcion: BillboardMovie) => {
            if (funcion.id === Number(value)) {
                setFunctionSelected(funcion);
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const onSeletedSeats = (seatIds: any[]) => {
        setFormData({ ...formData, seatIds });
    };

    const handleSubmit = async () => {
        try {
            updateError('')
            await createBooking(formData)
            setFunctionSelected(null);
            setFormData(null);
            refreshReservas(); // actualiza la lista de reservas
            refreshBillboard(); // actualiza la cartelera para mostrar las butacas ocupadas
            onClose();
        } catch (error) {
            updateError('Error reservando asientos:' + error);
        }
    };

    const onCancel = () => {
        setFunctionSelected(null);
        setFormData(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-10 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Nueva Reserva</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID del Cliente</label>
                            <input
                                name="documentNumber"
                                type="text" maxLength={10}
                                pattern="[0-9]*"
                                value={formData?.documentNumber}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
                            <input
                                type="text"
                                name="customerName"
                                value={formData?.customerName}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                            <input
                                type="email"
                                name="customerEmail"
                                value={formData?.customerEmail}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                maxLength={13}
                                pattern="[0-9]*"
                                placeholder="Ej: 0987654321"
                                value={formData?.phoneNumber}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Edad</label>
                            <input
                                name="customerAge"
                                type="tel" maxLength={3}
                                pattern="[0-9]*"
                                value={formData?.customerAge}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Películas</label>
                        <select
                            name="billboardMovieId"
                            value={formData?.billboardMovieId}
                            onChange={onSelectMovie}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        >
                            <option value="">Selecciona una función</option>
                            {billboard?.billboardMovies?.map((funcion: BillboardMovie) => (
                                <option key={funcion.id} value={funcion.id}>
                                    {`${funcion.movie.name} - ${funcion.room.name} - ${onlyHours(funcion.showTime)}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-4">Elegir asientos</label>
                        <div className="flex flex-wrap gap-2">
                            <Seat items={functionSelected?.room.seats!} onSelectedSeats={onSeletedSeats} />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                        >
                            Cancelar
                        </button>
                        <ApiButton onClick={handleSubmit} clazz='bg-blue-600 hover:bg-blue-700 text-white' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservaModal;