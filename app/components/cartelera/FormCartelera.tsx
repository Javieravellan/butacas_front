import { useEffect, useState } from "react";

export default function FormCartelera(props: { onSent: (e: any) => void, cartelera?: { id: number, status: boolean, start_time: string, end_time: string } }) {
    const [status, setStatus] = useState(1);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const { onSent, cartelera } = props;

    useEffect(() => {
        if (cartelera) {
            setStatus(cartelera.status ? 1 : 0);
            setStartTime(cartelera.start_time);
            setEndTime(cartelera.end_time);
        } else {
            // Limpiar el formulario si no hay cartelera
            setStatus(0);
            setStartTime('');
            setEndTime('');
        }
    }, [cartelera]);

    function handleSubmit(e: any) {
        e.preventDefault();
        if (cartelera?.id) {
            // Actualizar en servidor

            // enviar al padre
            onSent({ id: cartelera.id, status: status == 1 ? true : false, start_time, end_time });
        } else {
            // crear en servidor
            const newCartelera = {
                id: Date.now(),
                status: status === 1 ? true : false,
                start_time,
                end_time
            };

            // enviar al padre luego del envío
            onSent(newCartelera)
        }
        setStatus(0);
        setStartTime('');
        setEndTime('');

    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
                {cartelera?.id ? 'Editar Cartelera' : 'Agregar Nueva Cartelera'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Estado</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                        >
                            <option value="1">Activa</option>
                            <option value="0">Inactiva</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha/Hora Inicio</label>
                        <input
                            type="datetime-local"
                            value={start_time}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha/Hora Fin</label>
                        <input
                            type="datetime-local"
                            value={end_time}
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
                        {cartelera?.id ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
            </form>
        </div>
    );
}