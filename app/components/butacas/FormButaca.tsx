import { useState, useEffect } from "react";

const rooms = [
    { id: 1, name: 'Sala 1' },
    { id: 2, name: 'Sala 2' },
    { id: 3, name: 'Sala 3' },
    { id: 4, name: 'Sala 4' },
    { id: 5, name: 'Sala 5' },
]

export default function FormButaca(props: { onSent: (e: any) => void, butaca?: { id: number, numero: number, fila: number, roomName: string, roomId: number, status: boolean } }) {
    const { onSent, butaca } = props;
    const [numero, setNumero] = useState(0);
    const [fila, setFila] = useState(0);
    const [roomName, setRoomName] = useState(rooms[0].name);
    const [roomId, setRoomId] = useState(rooms[0].id);
    const [status, setStatus] = useState(true);

      // Actualizar el formulario cuando la prop `butaca` cambie
    useEffect(() => {
        if (butaca) {
            setNumero(butaca.numero);
            setFila(butaca.fila);
            setRoomName(butaca.roomName);
            setRoomId(butaca.roomId);
            setStatus(butaca.status);
        } else {
        // Limpiar el formulario si no hay butaca
            setNumero(0);
            setFila(0);
            setRoomName(rooms[0].name);
            setRoomId(rooms[0].id);
            setStatus(true);
        }
    }, [butaca]);

    function handleSubmit(e: any) {
        e.preventDefault();
        // buscar roomName por roomId
        if (butaca?.id) {
            // Actualizar
            onSent({ id: butaca.id, numero, fila, roomName, roomId, status });
        } else {
            // Crear
            const newButaca = {
                id: Date.now(),
                numero,
                fila,
                roomId,
                roomName,
                status
            };
            // enviar al servidor

            // enviar butaca al padre luego del envío
            onSent(newButaca);
            setNumero(0);
            setFila(0);
            setRoomName(rooms[0].name);
            setRoomId(rooms[0].id);
            setStatus(true);
        }
    }

    function onChange(e: any) {
        const { name, value } = e.target;
        console.debug({ name, value });
        const room = rooms.find((room: any) => room.id === Number(value));
        console.debug(room?.name)
        setRoomName(room?.name || '');
        setRoomId(Number(value));
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
                {butaca?.id ? 'Editar Butaca' : 'Agregar Nueva Butaca'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fila</label>
                        <input
                            type="text"
                            value={fila}
                            onChange={(e) => setFila(e.target.value as any)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                            maxLength={1}
                            placeholder="Ej: A"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número</label>
                        <input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value as any)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                            placeholder="Ej: 1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            value={roomId}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        >
                            {rooms.map((room: any) => (
                                <option key={room.id} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {butaca?.id ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
            </form>
        </div>
    );
}