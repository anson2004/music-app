import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PaintState {
  color: string;
  selectedImage: {
    id: string;
    source: any;
    label: string;
  };
  setColor: (color: string) => void;
  setSelectedImage: (image: { id: string; source: any; label: string }) => void;
}

const IMAGES = [
  { id: 'duck', source: require('../../assets/paint/duck.jpg'), label: 'Duck' },
  { id: 'mario', source: require('../../assets/paint/mario.jpg'), label: 'Mario' },
];

const usePaintStore = create<PaintState>()(
  (set) => ({
    color: "#000000",
    selectedImage: IMAGES[0],
    setColor: (color) => set({ color }),
    setSelectedImage: (image) => set({ selectedImage: image }),
  })
);

export default usePaintStore;
