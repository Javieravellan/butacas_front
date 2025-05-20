import { useEffect, useState } from "react";
import { AppContext } from "~/components/reservas/AppReservaContext";
import ReservaList from "~/components/reservas/ReservasList";
import { deleteBooking, getAllBookingsToday } from "~/services/billboard.service";

export default function ReservasPage() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const reservasContext = {
    reservas,
    error,
    refreshReservas: async () => {},
    deleteReserva: async (id: number) => {
      try {
        setError(null);
        await deleteBooking(id);
        setReservas(reservas.filter((reserva) => reserva.id !== id));
      } catch (error) {
        setError('Error deleting reserva: ' + error);
      }
    }
  };

  const fetchReservas = async () => {
    try {
        setError(null);
        const response = await getAllBookingsToday();
        console.debug(response);
        setReservas(response);
      }
      catch (error) {
        setError('Error fetching reservas: ' + error);
      }
  }

  useEffect(() => { fetchReservas() }, []);

  return (
    <AppContext.Provider value={{...reservasContext, refreshReservas: fetchReservas}}>
      <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Reservas</h1>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="lg:col-span-2">
            <ReservaList />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}