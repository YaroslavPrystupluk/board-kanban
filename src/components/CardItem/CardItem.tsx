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
    <Draggable
      draggableId={`${issue.id.toString()}`}
      key={issue.id}
      index={index}
    >
      {(provided, snapshot) => (
        <CardWrapp
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card.Body
            style={{
              borderRadius: "10px",
              background: snapshot.isDragging ? "#49bcf8" : "#eaf4fc",
            }}
          >
            <Card.Title>{issue.title}</Card.Title>
            <Card.Text>
              #{issue.number} {date}
            </Card.Text>
            <Card.Text>
              {issue.user.type} | Comments: {issue.comments}
            </Card.Text>
            <Card.Text>State: {issue.state}</Card.Text>
          </Card.Body>
        </CardWrapp>
      )}
    </Draggable>
  );
};

export default Cardissue;
