import { useState, useEffect } from 'react';

const ReservaForm = (props: { onSave: (e:any) => void, initialData: any }) => {
    const { onSave, initialData } = props;
    const [formData, setFormData] = useState({
        date: '',
        showTime: '',
        customerId: '',
        customerName: '',
        seats: [],
        movie: { name: '', genre: '' }
    });

    // Datos de ejemplo para selects
    const movies = [
        { name: 'Avengers: Endgame', genre: 'Acción' },
        { name: 'The Shawshank Redemption', genre: 'Drama' }
    ];

    const availableSeats = [
        { id: 1, number: 1, rowNumber: 1, roomName: 'Sala 1', roomId: 1, status: true },
        { id: 2, number: 2, rowNumber: 1, roomName: 'Sala 1', roomId: 1, status: true },
        { id: 3, number: 1, rowNumber: 1, roomName: 'Sala 2', roomId: 2, status: true },
    ];

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
    }, [initialData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMovieChange = (e: any) => {
        const selectedMovie = movies.find(m => m.name === e.target.value);
        setFormData(prev => ({
            ...prev,
            movie: selectedMovie || { name: '', genre: '' }
        }));
    };

    const handleSeatToggle = (seat: any) => {
        setFormData((prev: any) => {
            const seatIndex = prev.seats.findIndex((s:any) => s.id === seat.id);
            if (seatIndex >= 0) {
                return {
                    ...prev,
                    seats: prev.seats.filter((s:any) => s.id !== seat.id)
                };
            } else {
                return {
                    ...prev,
                    seats: [...prev.seats, { ...seat, status: 'Reservado' }]
                };
            }
        });
    };

    const handleSubmit = (e:any) => {
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hora</label>
                        <input
                            type="time"
                            name="showTime"
                            value={formData.showTime}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            required
                        />
                    </div>
                </div>

                {/* Datos del cliente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID Cliente</label>
                        <input
                            type="text"
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
                </div>

                {/* Selección de película */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Película</label>
                    <select
                        value={formData.movie.name}
                        onChange={handleMovieChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        required
                    >
                        <option value="">Seleccione una película</option>
                        {movies.map(movie => (
                            <option key={movie.name} value={movie.name}>
                                {movie.name} ({movie.genre})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selección de butacas */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Butacas</label>
                    <div className="grid grid-cols-3 gap-2">
                        {availableSeats.map(seat => (
                            <button
                                key={seat.id}
                                type="button"
                                onClick={() => handleSeatToggle(seat)}
                                className={`p-2 border rounded-md text-center text-sm ${formData.seats.some((s:any) => s.id === seat.id)
                                        ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                                        : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                {seat.rowNumber}{seat.number}
                            </button>
                        ))}
                    </div>
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