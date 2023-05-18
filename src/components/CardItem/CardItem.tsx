import { FC } from "react";
import { Card } from "react-bootstrap";
import { Iissues } from "../../model/Iissues";
import { Draggable } from "react-beautiful-dnd";

import { CardWrapp } from "./styledCardItem";

interface CardissueProps {
  issue: Iissues;
  index: number;
}

const Cardissue: FC<CardissueProps> = ({ issue, index }) => {
  const today = new Date();
  const updatedate = new Date(issue.updated_at);
  const diffInMs = today.getTime() - updatedate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const date =
    diffInDays > 0
      ? `opened ${diffInDays} days ago`
      : `opened ${updatedate.toLocaleDateString()}`;

  return (
    <Draggable draggableId={`${issue.id}`} key={issue.id} index={index}>
      {(provided, snapshot) => (
        <CardWrapp
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          //  isDragging={snapshot.isDragging}
        >
          <Card.Body>
            <Card.Title>{issue.title}</Card.Title>
            <Card.Text>
              #{issue.number} {date}
            </Card.Text>
            <Card.Text>
              {issue.user.type} | Comments: {issue.comments}
            </Card.Text>
            <Card.Text>State: {issue.state}</Card.Text>
          </Card.Body>
          {/* {provided.placeholder} */}
        </CardWrapp>
      )}
    </Draggable>
  );
};

export default Cardissue;
