import { createContext } from "react";
import type { Billboard } from "~/model/billboard.model";

interface BillboardContext {
    billboards: Billboard[]; // Replace 'any' with the actual type of your billboard items
    error: string | null;
    updateError: (error: string | null) => void;
    refreshBillboard: () => Promise<void>;
    createBillboard: (billboard: Billboard) => Promise<void>;
    deleteBillboard: (id: number) => Promise<void>;
}

export const BillboardContext = createContext<BillboardContext>({
    billboards: [],
    error: null,
    updateError: (error: string | null) => {},
    refreshBillboard: async () => {},
    createBillboard: async (billboard: Billboard) => {},
    deleteBillboard: async (id: number) => {}
});