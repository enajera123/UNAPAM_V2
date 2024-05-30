import { create } from "zustand";
import { PolicyState } from "@/types/state";
import {
  getPolicy,
  getPolicyById,
  updatePolicy,
  createPolicy,
  deletePolicy,
} from "@/services/policyService";
import { Policy } from "@/types/prisma";

export const usePolicyStore = create<PolicyState>((set) => ({
  policys: [] as Policy[],
  setPolicys: (policys) => set({ policys }),

  getPolicys: async () => {
    const policys = await getPolicy();
    set({ policys });
  },

  getPolicyById: async (id: number) => {
    const policy = await getPolicyById(id);
    if (!policy) return null;
    set((state) => ({
      policys: state.policys.map((p) => (p.id === id ? policy : p)),
    }));
    return policy;
  },

  postPolicy: async (policy: Policy) => {
    const newPolicy = await createPolicy(policy);
    if (!newPolicy) return null;
    if (newPolicy) {
      set((state) => ({ policys: [...state.policys, newPolicy] }));
    }
    return newPolicy;
  },

  putPolicy: async (id: number, policy: Policy) => {
    const updatedPolicy = await updatePolicy(id, policy);
    if (!updatedPolicy) return null;
    set((state) => ({
      policys: state.policys.map((p) => (p.id === id ? updatedPolicy : p)),
    }));
    return updatedPolicy;
  },

  deletePolicy: async (id: number) => {
    const response = await deletePolicy(id);
    if (!response) return false;
    set((state) => ({
      policys: state.policys.filter((p) => p.id !== id),
    }));
    return true;
  },
}));
