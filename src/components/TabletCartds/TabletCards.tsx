import { FC, DragEvent } from "react";
import { useAppSelector } from "../../hooks/hook";
import CardItem from "../Card/Card";
import { Iissues } from "../../model/Iissues";

interface TabletCardsProps {
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDragStart: (issue: Iissues) => void;
  handleDragEnd: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>, issue: Iissues) => void;
  sortCard: (a: Iissues, b: Iissues) => number;
}

const TabletCards: FC<TabletCardsProps> = ({
  handleDragOver,
  handleDragStart,
  handleDragEnd,
  handleDrop,
  //   sortCard,
}) => {
  const { issues } = useAppSelector((state) => state.issues);

  return (
    <div>
      {issues.map((issue) => (
        <div
          key={issue.id}
          draggable="true"
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={(e) => handleDragEnd(e)}
          onDragStart={() => handleDragStart(issue)}
          onDragEnd={(e) => handleDragEnd(e)}
          onDrop={(e) => handleDrop(e, issue)}
        >
          <CardItem item={issue} />
        </div>
      ))}
    </div>
  );
};

export default TabletCards;
