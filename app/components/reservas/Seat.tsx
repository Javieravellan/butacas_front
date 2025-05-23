import { useEffect, useState } from "react";

export const Seat = (props: { items: any[], onSelectedSeats: (seats: any[]) => void }) => {
    const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

    const onSelectSeat = (seatId: number) => {
        if (selectedSeats.some((id) => id === seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
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
                const isSelected = selectedSeats.some((id) => id === seat.id);

                return <button
                    key={seat.id}
                    type="button"
                    onClick={() => !isReserved && onSelectSeat(seat.id)}
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