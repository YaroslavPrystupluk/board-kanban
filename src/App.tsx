import { FC, KeyboardEvent, ChangeEvent, DragEvent, useState } from "react";
import { Spinner, Alert, ThemeProvider, Container } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { fetchIssues } from "./store/slice/getIssuesSlice";
import SearchIssues from "./components/SearchIssues/SearchIssues";
import TabletCards from "./components/TabletCartds/TabletCards";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import { Iissues } from "./model/Iissues";

interface IMyDragEvent extends DragEvent<HTMLDivElement> {
  target: HTMLDivElement & { style: CSSStyleDeclaration };
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { issues, loading, error } = useAppSelector((state) => state.issues);

  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [currentCard, setCurrentCard] = useState<Iissues | null>(null);
  //   console.log("currentCard", currentCard);

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

  const handleDragOver = (e: IMyDragEvent) => {
    e.preventDefault();
    e.target.style.boxShadow = "0 4px 3px grey";
  };
  const handleDragStart = (issue: Iissues) => {
    console.log("drag", issue);
    setCurrentCard(issue);
  };
  const handleDragEnd = (e: IMyDragEvent) => {
    e.target.style.boxShadow = "none";
  };
  const handleDrop = (e: IMyDragEvent, issue: Iissues) => {
    e.preventDefault();
    console.log("drop", issue);

    issues.map((i: Iissues): Iissues => {
      if (i.id === issue.id) {
        const updatedIssue = { ...i, number: currentCard.number };
        dispatch(fetchIssues(updatedIssue));
        console.log("нижній присваюєм верхній", updatedIssue);
        console.log("нижній присваюєм верхній", issues);

        return updatedIssue;
      }
      if (i.id === currentCard.id) {
        const updatedIssue = { ...i, number: issue.number };
        dispatch(fetchIssues(updatedIssue));
        console.log("вкрхній присвоюєм нижній ", updatedIssue);
        console.log("вкрхній присвоюєм нижній ", issues);
        return updatedIssue;
      }

      return i;
    });

    e.target.style.boxShadow = "none";
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
