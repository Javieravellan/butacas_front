import { useState, useEffect } from 'react';
import type { Billboard } from '~/model/billboard.model';
import { getBillboardToday } from '~/services/billboard.service';
import Accordion from './MovieAccordeon';

const ReservaForm = (props: { onSave: (e: any) => void, initialData: any }) => {
    const { onSave, initialData } = props;
    const [formData, setFormData] = useState({
        date: '',
        showTime: '',
        customerId: '',
        customerName: '',
        seats: [],
        movie: { name: '', genre: '' }
    });
    const [billboard, setBillboard] = useState<Billboard|null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                date: '',
                showTime: '',
                customerId: '',
                customerName: '',
                seats: [],
                movie: { name: '', genre: '' }
            });
        }

        if (billboard == null) {
            getBillboardToday()
                .then(setBillboard)
                .catch(console.error);
        }
    }, [initialData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSave(formData);
        setFormData({
            date: '',
            showTime: '',
            customerId: '',
            customerName: '',
            seats: [],
            movie: { name: '', genre: '' }
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                {initialData ? 'Editar Reserva' : 'Nueva Reserva'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Datos básicos */}

                {/* Datos del cliente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cédula</label>
                        <input
                            type="text" maxLength={10}
                            pattern="[0-9]*"
                            name="customerId"
                            value={formData.customerId}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre Cliente</label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                        <input
                            type="text"
                            name="customerLastName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Edad</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                </div>

                {/* Selección de película */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Películas disponibles</label>
                    {!billboard ? <div className='mt-2 text-gray-600'>No se encontraron registros para el día actual.</div> : <Accordion items={billboard?.billboardMovies!} />}
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        {initialData ? 'Actualizar' : 'Guardar'} Reserva
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservaForm;