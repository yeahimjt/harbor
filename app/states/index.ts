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

interface PlayerStore {
  uris: string | null;
  setUris: (value: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  uris: null,
  setUris: (value: string | null) => set({ uris: value }),
}));

interface InitialGenerationStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useInitialGenerationStore = create<InitialGenerationStore>(
  (set) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
  })
);
