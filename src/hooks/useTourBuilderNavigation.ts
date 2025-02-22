import { navMenu } from "@/pages/TourBuilder/navMenu";
import { useTourBuilderStore } from "@/store";
import { useNavigate } from "react-router-dom";

export const useTourBuilderNavigation = () => {
  const navigate = useNavigate();
  const { tourId, currentStep, visitedFlags, setCurrentStep, goToNextStep, goToPrevStep, setTourId } = useTourBuilderStore();

  const getNavItemPath = (step: number) => {
    return `/tours/${tourId}/${navMenu[step]?.path ?? ""}`;
  };

  const handleBackTourList = () => {
    navigate("/dashboard/tours");
  };

  const handleGoToNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < navMenu.length) {
      goToNextStep();
      navigate(getNavItemPath(nextStep));
    }
  };

  const handleGoToPrevStep = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      goToPrevStep();
      navigate(getNavItemPath(prevStep));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSetCurrentStep = (newStep: number) => {
    if (newStep >= 0 && newStep < navMenu.length) {
      setCurrentStep(newStep);
      navigate(getNavItemPath(newStep));
    }
  };

  return {
    tourId,
    currentStep,
    visitedFlags,
    setTourId,
    handleSetCurrentStep,
    handleGoToNextStep,
    handleGoToPrevStep,
    handleBackTourList,
    handleGoBack
  };
};
