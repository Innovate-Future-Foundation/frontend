import { getInitialData } from ".";
import { Board } from "./shared/Board";

const DayBuilder = () => {
  return <Board initial={getInitialData()} />;
};

export default DayBuilder;
