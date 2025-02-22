import { navMenu } from "@/pages/TourBuilder/navMenu";
import { Activity, Day, ProfileInfo, Tour } from "@/types";
import { create } from "zustand";

type TourBuilderState = {
  tourId?: string;
  currentStep: number;
  visitedFlags: boolean[];

  tourDetails: Tour | null;
  contactLeaderProfile: ProfileInfo | null;
  scheduleDays: Day[] | null;
  enrolledStudents: ProfileInfo[] | null;

  daysTemplates: Day[] | null;
  activityTemplates: Activity[] | null;

  setTourId: (id?: string) => void;
  setCurrentStep: (currentStep: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;

  setTourDetails: (tour?: Tour) => void;
  setContactLeaderProfile: (leader?: ProfileInfo) => void;
  setScheduleDays: (days?: Day[]) => void;
  setEnrolledStudents: (students?: ProfileInfo[]) => void;

  setDaysTemplates: (days?: Day[]) => void;
  setActivitiesTemplates: (activities?: Activity[]) => void;
};

export const useTourBuilderStore = create<TourBuilderState>(set => ({
  tourId: undefined,
  currentStep: 0,
  visitedFlags: [true, ...Array(navMenu?.length - 1 || 0).fill(false)],

  tourDetails: null,
  contactLeaderProfile: null,
  scheduleDays: null,
  enrolledStudents: null,

  daysTemplates: null,
  activityTemplates: null,

  setTourId: (id?: string) => set({ tourId: id }),
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
  goToPrevStep: () => set(state => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  setTourDetails: (tour?: Tour) =>
    set({
      tourDetails: {
        title: tour?.title,
        comment: tour?.comment,
        summary: tour?.summary,
        coverImgUrl: tour?.coverImgUrl,
        text: tour?.text,
        startTime: tour?.startTime,
        endTime: tour?.endTime
      }
    }),
  setContactLeaderProfile: (contactLeaderProfile?: ProfileInfo) => set({ contactLeaderProfile }),
  setScheduleDays: (days?: Day[]) => set({ scheduleDays: days }),
  setEnrolledStudents: (enrolledStudents?: ProfileInfo[]) => set({ enrolledStudents }),

  setDaysTemplates: (daysTemplates?: Day[]) => set({ daysTemplates }),
  setActivitiesTemplates: (activityTemplates?: Activity[]) => set({ activityTemplates }),

  reset: () =>
    set({
      tourId: undefined,
      currentStep: 0,
      visitedFlags: [true, ...Array(navMenu?.length - 1 || 0).fill(false)],
      tourDetails: null,
      contactLeaderProfile: null,
      scheduleDays: null,
      enrolledStudents: null,
      daysTemplates: null,
      activityTemplates: null
    })
}));
