import { useState, useContext } from "react";
import { ButacaContext } from "~/butacas/AppButacaContext";
import type { Seat } from "~/model/seat.model";

export default function FormButaca(props: { onSent: (e: any) => void }) {
    const [formButaca, setFormButaca] = useState<Seat>({
        id: null,
        number: null, 
        rowNumber: 0,
        roomId: 0,
        roomName: "",
        status: false,
    });

    const { rooms } = useContext(ButacaContext);

    function handleSubmit(e: any) {
        e.preventDefault();
        
    }

    function onInputChange(e: any) {
        const { name, value } = e.target;
        setFormButaca({
            ...formButaca,
            [name]: value,
        })
    }
    
    function onChange(e: any) {
        const { value } = e.target;
        const room = rooms.find((room: any) => room.id === Number(value));
        console.debug(room?.name)
        setFormButaca({
            ...formButaca,
            roomId: Number(value),
            roomName: room?.name||"",
        });
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
                Agregar Nuevo
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fila</label>
                        <input
                            type="text"
                            value={formButaca.rowNumber|| ""}
                            name="rowNumber"
                            onChange={onInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                            maxLength={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número</label>
                        <input
                            type="text"
                            value={formButaca.number|| ""}
                            name="number"
                            onChange={onInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Asignar a</label>
                        <select
                            value={formButaca.roomId}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        >
                            <option value="" defaultValue={""} hidden>
                                Selecciona una sala
                            </option>
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
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    );
}