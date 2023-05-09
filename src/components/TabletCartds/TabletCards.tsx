import { FC } from "react";
import { useAppSelector } from "../../hooks/hook";
import CardItem from "../Card/Card";

const TabletCards: FC = () => {
  const { issues } = useAppSelector((state) => state.issues);

  return (
    <div>
      {issues.map((issue) => (
        <div key={issue.id}>
          <CardItem item={issue} />
        </div>
      ))}
    </div>
  );
};

export default TabletCards;
