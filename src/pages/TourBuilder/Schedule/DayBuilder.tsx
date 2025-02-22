import { Day } from "@/types";
import { Board } from "./shared/Board";
import { TBoard, TColumn } from "./shared/data";
import { useTourBuilderStore } from "@/store";
import { useCallback, useEffect } from "react";

const daysTemplatesData: Day[] = [
  {
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    coverImgUrl:
      "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    activities: [
      {
        title: "Team Building1",
        location: "Opera House"
      },
      {
        title: "Team Building2",
        location: "Adeliade"
      }
    ]
  },
  {
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    coverImgUrl:
      "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    activities: [
      {
        title: "Team Building3",
        location: "Opera House"
      },
      {
        title: "Team Building4",
        location: "Adeliade"
      }
    ]
  }
];

const DayBuilder = () => {
  const { daysTemplates, scheduleDays, setDaysTemplates } = useTourBuilderStore();

  const getInitialDaysData = useCallback(() => {
    const columns: TColumn[] = [
      { id: "column:a", title: "Column A", type: "destination", cards: scheduleDays },
      { id: "column:b", title: "Column B", type: "source", cards: daysTemplates }
    ];
    return { columns } as TBoard;
  }, [daysTemplates, scheduleDays]);

  useEffect(() => {
    setDaysTemplates(daysTemplatesData);
  }, [daysTemplates]);

  return <Board initial={getInitialDaysData()} type={"day"} />;
};

export default DayBuilder;
