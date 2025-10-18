import { create } from "zustand";

interface UsersState {
  hidden: number[];
  archived: number[];
  hideUser: (id: number) => void;
  archiveUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  hidden: [],
  archived: [],
  hideUser: (id) => set((s) => ({ hidden: [...s.hidden, id] })),
  archiveUser: (id) => set((s) => ({ archived: [...s.archived, id] })),
  unarchiveUser: (id) =>
    set((s) => ({ archived: s.archived.filter((uid) => uid !== id) })),
}));
    