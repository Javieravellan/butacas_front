import { useEffect, useState } from "react";
import ReservaForm from "~/components/reservas/FormReserva";
import ReservaList from "~/components/reservas/ReservasList";
import { getBillboardToday } from "~/services/billboard.service";

export default function ReservasPage() {
    const [reservas, setReservas] = useState<any[]>([]);
    const [editingReserva, setEditingReserva] = useState<any>(null);

    // Datos de ejemplo
    const initialData: any[] = [
        {
            id: 1,
            date: '2023-06-15',
            showTime: '18:00',
            customerId: 101,
            customerName: 'Juan Pérez',
            seats: [
                { id: 1, number: 1, rowNumber: 1, status: false },
                { id: 2, number: 2, rowNumber: 1, status: false }
            ],
            movie: { name: 'Avengers: Endgame', genre: 'Acción' }
        }
    ];

    useEffect(() => {
        setReservas(initialData);
    }, []);

    const handleSave = (reservaData: any) => {
        if (editingReserva) {
            setReservas(reservas.map(r => r.id === editingReserva.id ? reservaData : r));
        } else {
            setReservas([...reservas, { ...reservaData, id: Date.now() }]);
        }
        setEditingReserva(null);
    };

    const handleDelete = (id: number) => {
        setReservas(reservas.filter(r => r.id !== id));
    };

    return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Reservas</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <ReservaForm 
            onSave={handleSave} 
            initialData={editingReserva} 
            key={editingReserva?.id || 'new'}
          />
        </div>
        
        {/* Lista */}
        <div className="lg:col-span-2">
          <ReservaList 
            reservas={reservas} 
            onEdit={setEditingReserva} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
    </div>
  );
}