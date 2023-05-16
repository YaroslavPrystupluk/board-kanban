import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TabletCards from "../TabletCards/TabletCards";

interface BoardProps {
  handleDragEnd: (result: DropResult) => void;
}

const Board: FC<BoardProps> = ({ handleDragEnd }) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <TabletCards title="To Do" id="1" />
      {/* <TabletCards title="In Progress" id="2" />
      <TabletCards title="Done" id="3" /> */}
    </DragDropContext>
  );
};

export default Board;
