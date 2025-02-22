import { Activity } from "@/types";
import { Board } from "./shared/Board";
import { TBoard, TColumn } from "./shared/data";
import { useParams } from "react-router-dom";
import { useTourBuilderStore } from "@/store";
import { useCallback, useEffect } from "react";

const activitiesTemplatesData: Activity[] = [
  {
    title: "Orientation",
    comment: "An exciting tour exploring STEM fields",
    location: "Opera House",
    coverImgUrl:
      "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Team Building",
    comment: "An exciting tour exploring STEM fields",
    location: "Opera House",
    coverImgUrl:
      "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const ActivityBuilder = () => {
  const { id } = useParams();
  console.log("day id", id);

  const { activityTemplates, scheduleDays, setActivitiesTemplates } = useTourBuilderStore();

  const getActivitiesOfTheDay = useCallback(() => {
    return scheduleDays?.find(day => day.id === id)?.activities ?? [];
  }, [scheduleDays, id]);

  const getInitialActivitiesData = useCallback(() => {
    const columns: TColumn[] = [
      { id: "column:a", title: "Column A", type: "destination", cards: getActivitiesOfTheDay() },
      { id: "column:b", title: "Column B", type: "source", cards: activityTemplates }
    ];
    return { columns } as TBoard;
  }, [activityTemplates, getActivitiesOfTheDay]);

  useEffect(() => {
    setActivitiesTemplates(activitiesTemplatesData);
  }, [activityTemplates]);

  return <Board initial={getInitialActivitiesData()} type={"activity"} />;
};

export default ActivityBuilder;
