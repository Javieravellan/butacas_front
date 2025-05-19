import { useEffect, useState } from "react";
import { onlyHours } from "~/utils";

const Accordion = (props: { items: any[] }) => {
    const { items } = props;
    const [activeIndex, setActiveIndex] = useState(null);
    const [itemsData, setItemsData] = useState<any[]>([]);
    const [seatsData, setSeatsData] = useState<any[]>([]);
    
    useEffect(() => {
        if (items?.length == 0) {
            setItemsData(itemsData);
        }
    }, [items])
    
    const toggleItem = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const onSelectSeat = (seat: any) => {
        const seatIndex = seatsData.findIndex((s: any) => s.id === seat.id);
        if (seatIndex >= 0) {
            setSeatsData(seatsData.filter((s: any) => s.id !== seat.id));
        } else {
            setSeatsData([...seatsData, { ...seat, status: false }]);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            {items?.map((item, index) => (
                <div key={index} className="mb-2 border rounded-lg overflow-hidden">
                    <button type="button"
                        onClick={() => toggleItem(index)}
                        className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors flex justify-between items-center"
                    >
                        <span className="font-medium"> <span className="text-gray-600">{onlyHours(item.showTime)}</span> {item.movie.name} {item.room.name}</span><br />
                        <span className="text-gray-600">
                            {activeIndex === index ? '−' : '+'}
                        </span>
                    </button>

                    <div className={`p-4 bg-white ${activeIndex === index ? 'block' : 'hidden'}`}>
                        <div className="grid grid-cols-3 gap-2">
                        {item.room.seats.map((seat:any) => (
                            <button
                                key={seat.id}
                                type="button"
                                onClick={() => onSelectSeat(seat)}
                                className={`p-2 border rounded-md text-center text-sm ${seatsData.some((s: any) => s.id === seat.id)
                                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                                    : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                {seat.rowNumber}{seat.number}
                            </button>
                        ))}
                    </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;