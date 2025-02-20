import { Progress } from "@/components/ui/progress";
import * as React from "react";

export function ProgresBar() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex gap-2 w-full items-center">
      <Progress value={progress} className="w-full inline" />
      <p className="text-muted-foreground/80">66%</p>
    </div>
  );
}
