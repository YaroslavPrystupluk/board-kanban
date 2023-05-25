import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import CardItem from "../CardItem/CardItem";

import { Container, Title, IssuesList } from "./styledTableCards";
import { Iissues } from "../../model/Iissues";

interface TabletCardsProps {
	title: string;
	id: string;
	issues: Iissues[];
}

const TabletCards: FC<TabletCardsProps> = ({ title, issues, id }) => {
	return (
		<Container>
			<Title>{title}</Title>
			<Droppable droppableId={id}>
				{(provided) => (
					<IssuesList ref={provided.innerRef} {...provided.droppableProps}>
						{issues.map((issue, index) => (
							<CardItem key={issue.id} issue={issue} index={index} />
						))}
						{provided.placeholder}
					</IssuesList>
				)}
			</Droppable>
		</Container>
	);
};

export default TabletCards;
