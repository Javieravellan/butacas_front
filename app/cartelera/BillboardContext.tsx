import { createContext } from "react";
import type { Billboard } from "~/model/billboard.model";

interface BillboardContext {
    billboards: Billboard[]; // Replace 'any' with the actual type of your billboard items
    billboard?: Billboard | null; // Optional billboard for editing
    error: string | null;
    isSaved?: boolean;
    updateIsSaved?: (isSaved: boolean) => void; // Optional setter for isSaved
    updateError: (error: string | null) => void;
    updateBillboard?: (billboard: Billboard|null) => void; // Optional for updating a billboard
    refreshBillboard: () => Promise<void>;
    createBillboard: (billboard: Billboard) => Promise<void>;
    deleteBillboard: (id: number) => Promise<void>;
}

export const BillboardContext = createContext<BillboardContext>({
    billboards: [],
    isSaved: false,
    error: null,
    billboard: null,
    updateIsSaved: (isSaved: boolean) => {},
    updateBillboard: (billboard: Billboard|null) => {},
    updateError: (error: string | null) => {},
    refreshBillboard: async () => {},
    createBillboard: async (billboard: Billboard) => {},
    deleteBillboard: async (id: number) => {}
});