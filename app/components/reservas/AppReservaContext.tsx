import { createContext } from "react";

interface AppReservaContext {
    reservas: any[];
    billboard: any;
    error: String|null;
    updateError: (error: string|null) => void;
    refreshBillboard: () => Promise<void>;
    refreshReservas: () => Promise<void>;
    deleteReserva: (id: number) => Promise<void>;
}

export const AppContext = createContext<AppReservaContext>({
    reservas: [],
    billboard: null,
    error: null,
    updateError: (error: String|null) => {},
    refreshBillboard: async () => {},
    refreshReservas: async () => {},
    deleteReserva: async (id: number) => {}
})
