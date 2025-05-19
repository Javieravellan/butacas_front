export type BillboardMovie = {
    id: number;
    showTime: string;
    movie: {
        id: number;
        name: string;
        genre: string;
    },
    room: {
        id: number;
        name: string;
        number: number; // capacity
        seats: [
            {
                id: number;
                number: number;
                rowNumber: number;
                status: boolean;
            }
        ]
    }
}