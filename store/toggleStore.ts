
import { create } from "zustand";

type ToggleStore = {
    toggle: boolean;
    setToggle: () => void;
};

export const useToggleStore = create<ToggleStore>((set) => ({
    toggle: false,
    setToggle: () => set((state) => ({ toggle: !state.toggle })),
}));

