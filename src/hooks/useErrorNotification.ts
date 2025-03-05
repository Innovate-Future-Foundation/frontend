import { useEffect } from "react";
import { useToast } from "./use-toast";

export const useErrorNotification = (isError: boolean, title: string, error: Error | null = null) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError && error) {
      toast({
        title: title,
        description: error.message,
        duration: 5000
      });
    }
  }, [error, title, isError, toast]);
};
