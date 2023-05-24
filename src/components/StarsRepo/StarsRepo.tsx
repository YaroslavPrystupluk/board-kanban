import { FC } from "react";
import { Istars } from "../../model/Iissues";
import { AiFillStar } from "react-icons/ai";

interface StarsRepoProps {
  stars: Istars;
}

const StarsRepo: FC<StarsRepoProps> = ({ stars }) => {
  const formattedNumber = () => {
    if (stars.stargazers_count > 1000) {
      return `${Math.ceil(stars.stargazers_count / 1000)} K`;
    } else {
      return stars.stargazers_count;
    }
  };

  const starsNum = formattedNumber();

  return (
    <div style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
      <AiFillStar style={{ color: "#e67700", fontSize: "30px" }} />
      {starsNum} stars
    </div>
  );
};
export default StarsRepo;
