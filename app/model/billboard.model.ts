import type { BillboardMovie } from "./billboard_movie.model";

export type Billboard = {
    id?: number;
    date?: string;
    showTime?: string;
    startTime: string;
    endTime: string;
    status: boolean;
    billboardMovies?: BillboardMovie[];
};