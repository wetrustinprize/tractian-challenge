import { create } from "zustand";

import { ICompany } from "./interfaces/ICompany";
import { IAsset } from "./interfaces/IAsset";

const store = create<{
    selectedCompany?: ICompany;
    selectedAsset?: IAsset;
    searchParams?: string;
    filterCritical: boolean;
    filterEnergy: boolean;
}>(() => ({
    filterCritical: false,
    filterEnergy: false,
}));

export default store;
export const useStore = store;
