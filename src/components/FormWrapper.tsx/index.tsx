import React, { ReactNode, useEffect, useState } from "react";
import { CheckCheck, CircleX, Loader2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface FormPieceProp {
  formTitle?: string;
  children: ReactNode;
  onSave?: () => void;
  disabled?: boolean;
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export const SaveButton: React.FC<{
  onSave?: () => void;
  disabled: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}> = ({ onSave, disabled, isPending, isSuccess, isError }) => {
  const [delayedPending, setDelayedPending] = useState(false);

  useEffect(() => {
    if (isPending) {
      setDelayedPending(true);
    } else {
      const timer = setTimeout(() => {
        setDelayedPending(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPending]);

  return (
    <Button
      disabled={disabled}
      variant="secondary"
      className={clsx(
        "rounded-full text-xs uppercase flex items-center gap-2 transition-all duration-300 ease-in-out",
        isSuccess && !delayedPending && "bg-secondary-green text-secondary-foregroundGreen",
        isError && !delayedPending && "bg-destructive text-destructive-foreground"
      )}
      onClick={onSave}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {delayedPending ? (
          <motion.div
            key="saving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <Loader2 size={12} className="animate-spin" />
            Saving
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <CheckCheck className="text-secondary-foregroundGreen" />
            Saved
          </motion.div>
        ) : isError ? (
          <motion.div
            key="notSaved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <CircleX className="text-destructive-foreground" />
            Not Saved
          </motion.div>
        ) : (
          <motion.div
            key="save"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="flex items-center gap-2"
          >
            <Save />
            Save
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

const FormWrapper: React.FC<FormPieceProp> = ({ formTitle, children, onSave, disabled = true, isPending = false, isSuccess = false, isError = false }) => {
  return (
    <Card className="rounded-md shadow-none w-full overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-primary-foreground30">{formTitle}</CardTitle>
          {onSave && <SaveButton onSave={onSave} disabled={disabled} isPending={isPending} isSuccess={isSuccess} isError={isError} />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
