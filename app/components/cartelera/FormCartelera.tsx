import { useContext, useEffect, useState } from "react";
import { BillboardContext } from "~/cartelera/BillboardContext";
import type { Billboard } from "~/model/billboard.model";
import SimpleToggle from "./SimpleToggle";
import FormFunciones from "./FormFunciones";
import ApiButton from "../ApiButton";
import type { BillboardMovie } from "~/model/billboard_movie.model";

export default function FormCartelera() {
    const [status, setStatus] = useState(1);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const [functions, setFunctions] = useState<BillboardMovie[]>([]);
    
    const { createBillboard, refreshBillboard, updateError, billboard, updateBillboard, updateIsSaved } = useContext(BillboardContext);
    
    useEffect(() => {
        if (billboard) {
            setStatus(billboard.status ? 1 : 0);
            setStartTime(billboard.startTime || '');
            setEndTime(billboard.endTime || '');
            if (billboard.billboardMovies) {
                setFunctions(billboard.billboardMovies);
            }
        }
    }, [billboard]);

    function handleSubmit() {
        const newCartelera: Billboard = {
            id: billboard?.id || undefined,
            status: status === 1 ? true : false,
            startTime: start_time,
            endTime: end_time,
        };

        if (functions.length > 0) {
            newCartelera.billboardMovies = functions;
            console.debug("Funciones asignadas:", functions);
        }
        updateError('');
        createBillboard(newCartelera)
            .then((res) => {
                console.debug("Cartelera creada:", res);
                refreshBillboard();
                setStatus(0);
                setStartTime('');
                setEndTime('');
                setFunctions([]); 
                
                if (updateBillboard) {
                    updateBillboard(null);
                }
                if (updateIsSaved) {
                    updateIsSaved(true); // esta bandera la uso para indicar al otro componente que se ha guardado y debe resetear la data.
                }
            }
            ).catch((error) => {
                console.error("Error al crear la cartelera:", error);
                updateError("Error al crear la cartelera: " + error);
            });

    }

    function handleToggle(value: boolean) {
        setStatus(value ? 1 : 0);
    }

    function onFunctionAdded(func: any) {
        setFunctions((prev) => [...prev, func]);
    }

    function onFunctionDeleted(func: BillboardMovie) {
        console.debug(functions);
        const filtered = functions.filter(f => !(f.movie.id === func.movie.id && f.room.id === func.room.id));
        console.debug("Funciones después de eliminar:", filtered);
        setFunctions(filtered);

    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
                {billboard?.id ? 'Editar' : 'Agregar nueva'}
            </h2>
            <form className="space-y-4">
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

                <br />
                <h3 className="h-5">Asignar películas</h3>
                <FormFunciones onFunctionAdded={onFunctionAdded} onDeleted={onFunctionDeleted} />
                <div className="flex justify-end">
                    <ApiButton onClick={handleSubmit}
                        type="submit"
                        text={billboard?.id ? 'Actualizar' : 'Guardar'}
                        clazz="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                     />
                </div>
            </form>
        </div>
    );
}