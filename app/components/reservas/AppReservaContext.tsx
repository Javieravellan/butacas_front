import { createContext } from "react";

interface AppReservaContext {
    reservas: any[];
    error: String|null,
    refreshReservas: () => Promise<void>;
    deleteReserva: (id: number) => Promise<void>;
}

export const AppContext = createContext<AppReservaContext>({
    reservas: [],
    error: null,
    refreshReservas: async () => {},
    deleteReserva: async (id: number) => {}
})
