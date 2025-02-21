import { createContext, useContext, useState } from "react";

interface TourBuilderContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const TourBuilderContext = createContext<TourBuilderContextType | undefined>(undefined);

export const TourBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return <TourBuilderContext.Provider value={{ currentStep, setCurrentStep }}>{children}</TourBuilderContext.Provider>;
};

export const useTourBuilder = () => {
  const context = useContext(TourBuilderContext);
  if (!context) {
    throw new Error("useTourBuilder must be used within a TourBuilderProvider");
  }
  return context;
};
