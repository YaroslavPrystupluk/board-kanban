import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useAppSelector } from "../../hooks/hook";
import CardItem from "../CardItem/CardItem";

import { Container, Title, IssuesList } from "./styledTableCards";

interface TabletCardsProps {
  title: string;
  id: string;
}

const TabletCards: FC<TabletCardsProps> = ({ title, id }) => {
  const { issues } = useAppSelector((state) => state.issues);

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
