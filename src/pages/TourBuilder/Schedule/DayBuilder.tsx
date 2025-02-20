import { getInitialData } from ".";
import { Board } from "./TwoColumns/shared/board";

const DayBuilder = () => {
  return <Board initial={getInitialData()} />;
};

export default DayBuilder;
