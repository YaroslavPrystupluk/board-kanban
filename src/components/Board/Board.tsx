import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TabletCards from "../TabletCards/TabletCards";
import { Iissues } from "../../model/Iissues";

import { WrapBoard } from "./styledBoard";

interface BoardProps {
	handleDragEnd: (result: DropResult) => void;
	open: Iissues[];
	closed: Iissues[];
	inProgress: Iissues[];
}

const Board: FC<BoardProps> = ({ handleDragEnd, open, inProgress, closed }) => {
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<WrapBoard>
				<TabletCards data-testid="isues-list" title="To Do" issues={open} id="1" />
				<TabletCards data-testid="isues-list" title="In Progress" issues={inProgress} id="2" />
				<TabletCards data-testid="isues-list" title="Done" issues={closed} id="3" />
			</WrapBoard>
		</DragDropContext>
	);
};

export default Board;
