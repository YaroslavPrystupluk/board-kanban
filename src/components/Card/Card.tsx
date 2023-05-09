import { FC } from "react";
import { Card } from "react-bootstrap";
import { Iissues } from "../../model/Iissues";

interface CardItemProps {
  item: Iissues;
}

const CardItem: FC<CardItemProps> = ({ item }) => {
  const today = new Date();
  const updatedate = new Date(item.updated_at);
  const diffInMs = today.getTime() - updatedate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const date =
    diffInDays > 0
      ? `opened ${diffInDays} days ago`
      : `opened ${updatedate.toLocaleDateString()}`;

  return (
    <Card className="mb-3" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          #{item.number} {date}
        </Card.Text>
        <Card.Text>
          {item.user.type} | Comments: {item.comments}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
