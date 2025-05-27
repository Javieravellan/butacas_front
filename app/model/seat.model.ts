export type Seat = {
    id?: number;
    rowNumber: number|null;
    number: number|null;
    status: boolean;
    roomName?: string;
    roomId: number;
}