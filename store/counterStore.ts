import { create } from "zustand";

type CounterState={
 count:number,
 increase():void;
 decrease():void;
 reset():void;
}

const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => {
        if (state.count > 0) {
            return { count: state.count - 1 };
        } else {
            return { count: 0 }; 
        }
    }),

    reset: () => set({ count: 0 }),
}));

export default useCounterStore;