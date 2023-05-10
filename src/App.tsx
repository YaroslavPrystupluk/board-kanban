import { FC, KeyboardEvent, ChangeEvent, DragEvent, useState } from "react";
import { Spinner, Alert, ThemeProvider, Container } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { fetchIssues } from "./store/slice/getIssuesSlice";
import SearchIssues from "./components/SearchIssues/SearchIssues";
import TabletCards from "./components/TabletCartds/TabletCards";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import { Iissues } from "./model/Iissues";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { issues, loading, error } = useAppSelector((state) => state.issues);

  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [cardList, setCardList] = useState<Iissues[]>([]);
  console.log(cardList);

  const [currentCard, setCurrentCard] = useState<Iissues>();
  //   console.log(currentCard);

  const url = repositoryUrl.split("/");
  const owner = url[3];
  const repo = url[4];

  const handleKeyDoun = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") dispatch(fetchIssues([owner, repo]));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepositoryUrl(e.target.value);
  };

  const showIssues = () => {
    dispatch(fetchIssues([owner, repo]));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.target.style.background = "lightgrey";
  };
  const handleDragStart = (issue: Iissues) => {
    setCurrentCard(issue);
  };
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.target.style.background = "white";
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>, issue: Iissues) => {
    e.preventDefault();
    setCardList(
      cardList.map((i: Iissues): Iissues => {
        console.log(i);

        if (i.id === issue.id) {
          return { ...i, number: currentCard.number };
        }
        if (i.id === currentCard.id) {
          return { ...i, number: issue.number };
        }
        return i;
      })
    );
    e.target.style.background = "white";
  };

  const sortCard = (a: Iissues, b: Iissues): number => {
    if (a.number > b.number) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container>
        <SearchIssues
          handleKeyDoun={handleKeyDoun}
          showIssues={showIssues}
          handleChange={handleChange}
          repositoryUrl={repositoryUrl}
        />
        {issues.length > 0 && <Breadcrumbs owner={owner} repo={repo} />}

        {loading ? (
          <Spinner
            style={{ position: "absolute", top: "50%", right: "50%" }}
            animation="border"
            variant="primary"
          />
        ) : error ? (
          <Alert style={{ textAlign: "center" }} variant="danger">
            Error: {error}
          </Alert>
        ) : (
          <TabletCards
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDrop={handleDrop}
            sortCard={sortCard}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
