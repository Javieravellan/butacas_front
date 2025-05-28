import React, { useContext, useEffect, useState } from "react";
import { BillboardContext } from "~/cartelera/BillboardContext";
import type { BillboardMovie } from "~/model/billboard_movie.model";
import type { MovieShort } from "~/model/movie-short.model";
import type { Room } from "~/model/room.model";
import { getAllMovies } from "~/services/movie.service";
import { getAllRooms } from "~/services/room.service";
import { showTodayOrDateDefault } from "~/utils";

export default function FormFunciones({onFunctionAdded, onDeleted}: { onFunctionAdded?: (func: BillboardMovie) => void,
    onDeleted?: (func: BillboardMovie) => void }) {
    const [movies, setMovies] = useState<MovieShort[]>([]);
    const [showTime, setShowTime] = useState('');
    const [movieId, setMovieId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [functions, setFunctions] = useState<BillboardMovie[]>([]);

    const { updateError, isSaved, billboard } = useContext(BillboardContext);

    useEffect(() => {
        updateError('');
        getAllMovies()
        .then((data) => {
            console.debug("Películas obtenidas:", data);
            if (!Array.isArray(data)) return;
            setMovies(data);
        }).catch((error) => {
            updateError("Error al obtener las películas: " + error);
        });

        getAllRooms()
        .then(data => {
            console.debug("Salas obtenidas:", data);
            if (!Array.isArray(data)) return;
            setRooms(data);
        }).catch((error) => {
            updateError("Error al obtener las salas: " + error);
        })
    }, [])

    useEffect(() => {
        if (isSaved) {
            setFunctions([])
        }
        
        if (billboard && billboard.billboardMovies) {
            setFunctions(billboard.billboardMovies);
        } else {
            setFunctions([]);
        }
    }, [isSaved, billboard]);

    function handleAddFunction(e: any) {
        e.preventDefault();
        if (!movieId || !roomId || !showTime) {
            updateError("Por favor, complete todos los campos.");
            return;
        }

        const selectedMovie = movies.find(movie => movie.id === parseInt(movieId));
        const selectedRoom = rooms.find(room => room.id === parseInt(roomId));

        if (!selectedMovie || !selectedRoom) {
            updateError("Película o sala no encontrada.");
            return;
        }

        const newFunction: BillboardMovie = {
            movie: {
                id: selectedMovie?.id!,
                name: selectedMovie?.name || '',
                genre: selectedMovie?.genre || '',
            },
            showTime: showTime,
            status: true,
            room: {
                id: selectedRoom?.id!,
                name: selectedRoom?.name || '',
                number: selectedRoom?.number || 0, // capacity
                seats: selectedRoom?.seats as any,
            }
        }

        const existingFunction = functions.find(func =>
            func.movie.id === newFunction.movie.id && func.showTime === newFunction.showTime && func.room.id === newFunction.room.id
        );

        if (existingFunction) {
            updateError("Ya existe una función para esta película a esta hora.");
            return;
        }

        setFunctions([...functions, newFunction]);

        if (onFunctionAdded) {
            onFunctionAdded(newFunction);
        }

        setMovieId('');
        setRoomId('');
        setShowTime('');
        updateError(''); 
    }

    function handleRemoveFunction(movieId: number, roomId: number) {
        const func = functions.find(f => f.movie.id === movieId && f.room.id === roomId);
        if (!func) return;
        setFunctions(functions.filter(f => f.movie.id !== movieId  || f.room.id !== roomId));
        if (onDeleted) {
            onDeleted(func);
        }
        updateError('');
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700">Películas</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" value={movieId}
                    onChange={(e) => setMovieId(e.target.value)} required
                >
                    <option defaultValue="" defaultChecked>Seleccione una película</option>
                    {movies?.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                            {movie.name} ({movie.genre})
                        </option>
                    ))}
                </select>
            </div>
            <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700">Salas</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    value={roomId} required
                    onChange={(e) => setRoomId(e.target.value)}
                >
                    <option defaultValue="" defaultChecked>Seleccione una sala</option>
                    {rooms?.map((room) => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                </select>
            </div>
            <div className="min-w-0 col-span-full">
                <label className="block text-sm font-medium text-gray-700">Fecha función</label>
                <input
                    type="datetime-local"
                    value={showTime}
                    onChange={(e) => setShowTime(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    required
                />
            </div>
            <div  className="col-span-full">
                <button type="button" onClick={handleAddFunction} className="px-4 py-2 bg-white text-indigo-700 border border-indigo-300 rounded-md hover:bg-indigo-100">
                    + Agregar
                </button>
            </div>
            <div className="col-span-full">
                {functions.length > 0 && functions.map((func) => (
                    <Chip label={`${func.movie.name} - ${func.room.name} - ${showTodayOrDateDefault(func.showTime)}`}
                    onRemove={() => handleRemoveFunction(func.movie.id, func.room.id)} />
                ))}
            </div>
        </div>
    )
}

const Chip = ({ label, onRemove }: { label: string, onRemove?: () => void }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 mr-2 mb-2">
    {label}
    {onRemove && (
      <button
        type="button"
        onClick={() => onRemove()}
        className="ml-2 text-indigo-400 hover:text-indigo-700 focus:outline-none"
        aria-label="Eliminar"
      >
        &times;
      </button>
    )}
  </span>
);