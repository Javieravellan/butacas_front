import { useEffect, useState } from "react";

export const Seat = (props: { items: any[], onSelectedSeats: (seats: any[]) => void }) => {
    const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

    const onSelectSeat = (seat: any) => {
        if (selectedSeats.some((s) => s.id === seat.id)) {
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, {...seat, status: false }]);
        }
    };

    useEffect(() => {
        // Hacemos esto para asegurar que los datos estén actualizados
        props.onSelectedSeats(selectedSeats);
    }, [selectedSeats]);

    return (
        <div className="grid grid-cols-3 gap-2 w-full">
            {props.items?.map((seat: any) => {
                const isReserved = !seat.status;
                const isSelected = selectedSeats.some((s) => s.id === seat.id);

                return <button
                    key={seat.id}
                    type="button"
                    onClick={() => !isReserved && onSelectSeat(seat)}
                    className={`p-2 border rounded-md text-center text-sm
                            ${isReserved
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : isSelected
                                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                                    : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                >
                    {seat.rowNumber}{seat.number}
                </button>
            })}
        </div>
    )
}