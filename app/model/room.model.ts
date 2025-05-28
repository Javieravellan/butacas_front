import type { Seat } from "./seat.model";

export type Room = {
    id: number;
    name: string;
    status: boolean;
    number: number;
    seats: Seat[];
}