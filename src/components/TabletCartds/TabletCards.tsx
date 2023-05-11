import { FC, DragEvent } from "react";
import { useAppSelector } from "../../hooks/hook";
import CardItem from "../Card/Card";
import { Iissues } from "../../model/Iissues";

interface IMyDragEvent extends DragEvent<HTMLDivElement> {
  target: HTMLDivElement & { style: CSSStyleDeclaration };
}

interface TabletCardsProps {
  handleDragOver: (e: IMyDragEvent) => void;
  handleDragStart: (issue: Iissues) => void;
  handleDragEnd: (e: IMyDragEvent) => void;
  handleDrop: (e: IMyDragEvent, issue: Iissues) => void;
  sortCard: (a: Iissues, b: Iissues) => number;
}

const TabletCards: FC<TabletCardsProps> = ({
  handleDragOver,
  handleDragStart,
  handleDragEnd,
  handleDrop,
  sortCard,
}) => {
  const { issues } = useAppSelector((state) => state.issues);

  return (
    <div>
      {issues.sort(sortCard).map((issue) => (
        <div
          key={issue.id}
          draggable="true"
          onDragOver={(e: IMyDragEvent) => handleDragOver(e)}
          onDragLeave={(e: IMyDragEvent) => handleDragEnd(e)}
          onDragStart={() => handleDragStart(issue)}
          onDragEnd={(e: IMyDragEvent) => handleDragEnd(e)}
          onDrop={(e: IMyDragEvent) => handleDrop(e, issue)}
        >
          <CardItem item={issue} />
        </div>
      ))}
    </div>
  );
};

export default TabletCards;
