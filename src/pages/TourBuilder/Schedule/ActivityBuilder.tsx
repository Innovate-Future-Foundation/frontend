import { getInitialData } from ".";
import { Board } from "./TwoColumns/shared/board";

const ActivityBuilder = () => {
  return <Board initial={getInitialData()} />;
};

export default ActivityBuilder;
