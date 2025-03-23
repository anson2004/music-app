import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaintState {
  color: string;
  setColor: (color: string) => void;
}

const usePaintStore = create<PaintState>()(
  persist(
    (set) => ({
      color: "#000000",
      setColor: (color) => set({ color }),
    }),
    {
      name: "paint-storage",
    }
  )
);

export default usePaintStore;
