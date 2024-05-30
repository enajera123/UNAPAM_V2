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
import { ReferenceContact } from "@/types/prisma";

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
      if (!referenceContact) return null
      set((state) => ({
        contacts: state.contacts.map((rc) =>
          rc.id === id ? referenceContact : rc
        ),
      }));
      return referenceContact;
    },

    postContact: async (reference: ReferenceContact) => {
      const newReference = await createReference(reference);
      if (!newReference) return null
      if (newReference) {
        set((state) => ({ contacts: [...state.contacts, newReference] }));
      }
      return newReference
    },

    putContact: async (id: number, reference: ReferenceContact) => {
      const updatedReference = await updateReference(id, reference);
      if (!updatedReference) return null
      set((state) => ({
        contacts: state.contacts.map((rc) =>
          rc.id === id ? updatedReference : rc
        ),
      }));
      return updatedReference
    },

    deleteContact: async (id: number) => {
      const response = await deleteReference(id);
      if (!response) return false
      set((state) => ({
        contacts: state.contacts.filter((rc) => rc.id !== id),
      }));
      return true;
    },

    searchContact: async (searchTerm: string) => {
      const searchedContacts = await searchContacts(searchTerm);
      set({ contacts: searchedContacts });
    },
  })
);
