import { createContext } from "react";

interface AppReservaContext {
    reservas: any[];
    billboard: any;
    error: String|null;
    refreshBillboard: () => Promise<void>;
    refreshReservas: () => Promise<void>;
    deleteReserva: (id: number) => Promise<void>;
}

export const AppContext = createContext<AppReservaContext>({
    reservas: [],
    billboard: null,
    error: null,
    refreshBillboard: async () => {},
    refreshReservas: async () => {},
    deleteReserva: async (id: number) => {}
})
