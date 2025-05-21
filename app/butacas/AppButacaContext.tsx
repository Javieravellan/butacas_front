import { createContext } from "react";
import type { Room } from "~/model/room.model";
import type { Seat } from "~/model/seat.model";

interface AppButacaContext {
    butacas: Seat[];
    rooms: Room[];
    error: string|null;
    updateError: (error: string|null) => void;
    refreshButacas: () => Promise<void>;
    refreshRooms: () => Promise<void>;
    deleteButaca: (id: number) => Promise<void>;
}

export const ButacaContext = createContext<AppButacaContext>({
    butacas: [],
    rooms: [],
    error: null,
    refreshRooms: async () => {},
    updateError: (error: string|null) => {},
    refreshButacas: async () => {},
    deleteButaca: async (id: number) => {}
});