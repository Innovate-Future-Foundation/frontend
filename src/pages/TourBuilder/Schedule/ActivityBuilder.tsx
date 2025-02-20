import { getInitialData } from ".";
import { Board } from "./shared/Board";

const ActivityBuilder = () => {
  return <Board initial={getInitialData()} />;
};

export default ActivityBuilder;
