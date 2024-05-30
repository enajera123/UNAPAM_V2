import { create } from "zustand";
import { ReferenceContactState } from "@/types/state";
import {
  getReference,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
  searchContacts,
} from "@/services/referenceContactService";

export const useReferenceContactStore = create<ReferenceContactState>(
  (set) => ({
    contacts: [] as ReferenceContact[],
    setContacts: (contacts) => set({ contacts }),

    getContacts: async () => {
      const contacts = await getReference();
      set({ contacts });
    },

    getContactById: async (id: number) => {
      const referenceContact = await getReferenceById(id);
      set((state) => ({
        contacts: state.contacts.map((rc) =>
          rc.id === id ? referenceContact : rc
        ),
      }));
    },

    postContact: async (reference: ReferenceContact) => {
      const newReference = await createReference(reference);
      if (newReference) {
        set((state) => ({ contacts: [...state.contacts, newReference] }));
      }
    },

    putContact: async (id: number, reference: ReferenceContact) => {
      const updatedReference = await updateReference(id, reference);
      set((state) => ({
        contacts: state.contacts.map((rc) =>
          rc.id === id ? updatedReference : rc
        ),
      }));
    },

    deleteContact: async (id: number) => {
      await deleteReference(id);
      set((state) => ({
        contacts: state.contacts.filter((rc) => rc.id !== id),
      }));
    },

    searchContact: async (searchTerm: string) => {
      const searchedContacts = await searchContacts(searchTerm);
      set({ contacts: searchedContacts });
    },
  })
);
