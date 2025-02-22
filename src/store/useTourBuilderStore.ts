import { navMenu } from "@/pages/TourBuilder/navMenu";
import { Tour } from "@/types";
import { create } from "zustand";

type TourBuilderState = {
  tourId?: string;
  currentStep: number;
  tourData: Tour | null;
  visitedFlags: boolean[];
  setTourId: (id?: string) => void;
  setTourData: (data: Tour) => void;
  setCurrentStep: (currentStep: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
};

export const useTourBuilderStore = create<TourBuilderState>(set => ({
  tourId: undefined,
  currentStep: 0,
  tourData: null,
  visitedFlags: [true, ...Array(navMenu?.length - 1 || 0).fill(false)],
  setTourId: (id?: string) => set({ tourId: id }),
  setTourData: (data: Tour) => set({ tourData: data }),
  setCurrentStep: (currentStep: number) =>
    set(state => ({
      currentStep: currentStep >= 0 && currentStep < navMenu?.length ? currentStep : state.currentStep,
      visitedFlags:
        currentStep >= 0 && currentStep < navMenu?.length ? state.visitedFlags.map((e, index) => (index === currentStep ? true : e)) : state.visitedFlags
    })),
  goToNextStep: () =>
    set(state => ({
      currentStep: Math.min(state.currentStep + 1, navMenu?.length - 1),
      visitedFlags: state.visitedFlags.map((e, index) => (index === state.currentStep ? true : e))
    })),
  goToPrevStep: () =>
    set(state => ({
      currentStep: Math.max(state.currentStep - 1, 0)
    })),
  reset: () => set({ tourId: undefined, currentStep: 0, tourData: null, visitedFlags: [true, ...Array(navMenu?.length - 1 || 0).fill(false)] })
}));
