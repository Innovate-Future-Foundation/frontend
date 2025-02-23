import { Activity } from "@/types";
import { Board } from "./shared/Board";
import { TBoard, TColumn } from "./shared/data";
import { useParams } from "react-router-dom";
import { useTourBuilderStore } from "@/store";
import { useCallback, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const activitiesTemplatesData: Activity[] = [
  {
    id: "4fb93bda-de55-4e31-a1db-8c922ea26817",
    title: "Activity template 01",
    comment: "An exciting tour exploring STEM fields",
    location: "Opera House",
    startTime: "2025-02-25T10:30:00Z",
    endTime: "2025-02-25T11:30:00Z",
    coverImgUrl:
      "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "92068c7e-4056-4a99-9e69-4d604a7e7f07",
    title: "Activity template 02",
    comment: "An exciting tour exploring STEM fields",
    location: "Rundle mall",
    startTime: "2025-02-25T12:30:00Z",
    endTime: "2025-02-25T14:30:00Z",
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

  if (!activityTemplates) {
    return <ClipLoader />;
  }

  return <Board initial={getInitialActivitiesData()} type={"activity"} />;
};

export default ActivityBuilder;
