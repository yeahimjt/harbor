import { create } from 'zustand';

interface DialogStore {
  type: string;
  id: string | null;
  isOpen: boolean;
  setType: (value: string) => void;
  setId: (value: string) => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  type: '',
  id: null,
  setType: (value: string) => set({ type: value }),
  setId: (value: string | null) => set({ id: value }),
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));
