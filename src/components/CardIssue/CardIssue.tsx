import { FC } from "react";
import { Card } from "react-bootstrap";
import { Iissues } from "../../model/Iissues";
import { Draggable } from "react-beautiful-dnd";

import { CardWrapp } from "./styledCardItem";

interface CardIssueProps {
	issue: Iissues;
	index: number;
}

const CardIssue: FC<CardIssueProps> = ({ issue, index }) => {
	const today = new Date();
	const updatedate = new Date(issue.updated_at);
	const diffInMs = today.getTime() - updatedate.getTime();
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	const date =
		diffInDays > 0 ? `opened ${diffInDays} days ago` : `opened ${updatedate.toLocaleDateString()}`;

	return (
		<Draggable draggableId={`${issue.id.toString()}`} key={issue.id} index={index}>
			{(provided, snapshot) => (
				<CardWrapp
					data-testid="card-wrapper"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}>
					<Card.Body data-testid="card-body">
						<Card.Title>{issue.title}</Card.Title>
						<Card.Text data-testid="date">
							#{issue.number} {date}
						</Card.Text>
						<Card.Text data-testid="user">
							{issue.user.type} | Comments: {issue.comments}
						</Card.Text>
					</Card.Body>
				</CardWrapp>
			)}
		</Draggable>
	);
};

export default CardIssue;
