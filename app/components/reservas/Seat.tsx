import { useEffect, useState } from "react";

export const Seat = (props: { items: any[] }) => {
    const [seatsData, setSeatsData] = useState<any[]>([]);

    useEffect(() => {
        setSeatsData(props.items?.filter(({ status }) => !status));
    }, [props.items]);

    const onSelectSeat = (seat: any) => {
        const seatIndex = seatsData.findIndex((s: any) => s.id === seat.id);
        if (seatIndex >= 0) {
            setSeatsData(seatsData.filter((s: any) => s.id !== seat.id));
        }
        else {
            setSeatsData([...seatsData, { ...seat, status: false }]);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-2 w-full">
            {props.items?.map((seat: any) => (
                <button
                    key={seat.id}
                    type="button"
                    onClick={() => onSelectSeat(seat)}
                    className={`p-2 border rounded-md text-center text-sm ${seatsData?.some((s: any) => s.id === seat.id)
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                >
                    {seat.rowNumber}{seat.number}
                </button>
            ))}
        </div>
    )
}