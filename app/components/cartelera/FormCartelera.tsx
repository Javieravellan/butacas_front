import { use, useContext, useEffect, useState } from "react";
import { BillboardContext } from "~/cartelera/BillboardContext";
import type { Billboard } from "~/model/billboard.model";

export default function FormCartelera() {
    const [status, setStatus] = useState(1);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const { createBillboard, refreshBillboard, updateError, billboard } = useContext(BillboardContext);

    useEffect(() => {
        console.debug("FormCartelera: billboard", billboard);
        if (billboard) {
            setStatus(billboard.status ? 1 : 0);
            setStartTime(billboard.startTime || '');
            setEndTime(billboard.endTime || '');
        }
    }, [billboard]);
    function handleSubmit(e: any) {
        e.preventDefault();
        const newCartelera: Billboard = {
            id: billboard?.id || undefined,
            status: status === 1 ? true : false,
            startTime: start_time,
            endTime: end_time,
        };

        updateError(null); // Limpiar errores previos
        createBillboard(newCartelera)
            .then((res) => {
                console.debug("Cartelera creada:", res);
                refreshBillboard();
                setStatus(0);
                setStartTime('');
                setEndTime('');
            }
            ).catch((error) => {
                console.error("Error al crear la cartelera:", error);
                updateError("Error al crear la cartelera: " + error);
            });

    }

    function handleToggle(value: boolean) {
        setStatus(value ? 1 : 0);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
                {billboard?.id ? 'Editar Cartelera' : 'Agregar Nueva Cartelera'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Habilitar</label>
                        <SimpleToggle value={status == 1} onChange={handleToggle} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {billboard?.id ? 'Actualizar' : 'Agregar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const SimpleToggle = (props: any) => {
    const { value, onChange } = props;
    const [isOn, setIsOn] = useState(value);

    useEffect(() => { setIsOn(value) }, [value])
    function handleToggle() {
        setIsOn(!isOn);
        if (onChange) {
            onChange(!isOn);
        }
    }

    return (
        <button type="button" style={{ verticalAlign: "baseline", marginTop: "0.5rem" }}
            onClick={() => handleToggle()}
            className={`w-16 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
            aria-pressed={isOn}
        >
            <span
                className={`bg-white w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-full' : 'translate-x-0'
                    }`}
            />
        </button>
    );
};