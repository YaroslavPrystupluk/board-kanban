import {
  FC,
  KeyboardEvent,
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Spinner, Alert, Container } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { fetchIssues } from "./store/slice/getIssuesSlice";
import SearchIssues from "./components/SearchIssues/SearchIssues";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Board from "./components/Board/Board";
import { DropResult } from "react-beautiful-dnd";
import { Iissues } from "./model/Iissues";
import { fetchStars } from "./store/slice/getStarsSlice";
import StarsRepo from "./components/StarsRepo/StarsRepo";
import { actionStorage } from "./store/slice/getIssuesSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { issues, loading, error } = useAppSelector((state) => state.issues);
  const { stars } = useAppSelector((state) => state.stars);

  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [open, setOpen] = useState<Iissues[]>([]);
  const [inProgress, setInProgress] = useState<Iissues[]>([]);
  const [closed, setClosed] = useState<Iissues[]>([]);
  const [items, setItems] = useState<Iissues[]>([]);
  console.log(items);

  const url = repositoryUrl.split("/");
  const owner = url[3];
  const repo = url[4];

  useEffect(() => {
    setOpen(issues.filter((issue) => issue.state === "open"));
    setInProgress(issues.filter((issue) => issue.state === "in progress"));
    setClosed(issues.filter((issue) => issue.state === "closed"));
  }, [issues, setOpen, setClosed, setInProgress]);

  const handleKeyDoun = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") dispatch(fetchIssues([owner, repo]));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepositoryUrl(e.target.value);
  };

  function saveDataToLocalStorage(items: Iissues[]) {
    const key = repo;
    const jsonData = JSON.stringify(items);
    localStorage.setItem(key, jsonData);
  }

  const showIssues = useCallback(() => {
    dispatch(fetchStars([owner, repo]));
    const key = repo;
    const storedItems = localStorage.getItem(key);
    if (storedItems) {
      dispatch(actionStorage(JSON.parse(storedItems)));
    } else {
      dispatch(fetchIssues([owner, repo]));
    }
  }, [dispatch, owner, repo]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add: Iissues;
    if (source.droppableId === "1") {
      add = open[source.index];
      open.splice(source.index, 1);
    } else if (source.droppableId === "2") {
      add = inProgress[source.index];
      inProgress.splice(source.index, 1);
    } else {
      add = closed[source.index];
      closed.splice(source.index, 1);
    }

    if (destination.droppableId === "1") {
      open.splice(destination.index, 0, { ...add, state: "open" });
    } else if (destination.droppableId === "2") {
      inProgress.splice(destination.index, 0, { ...add, state: "in progress" });
    } else {
      closed.splice(destination.index, 0, { ...add, state: "closed" });
    }

    const arr: Iissues[] = [...open, ...inProgress, ...closed];
    setItems(arr);
    saveDataToLocalStorage(arr);
  };

  return (
    <Container>
      <SearchIssues
        handleKeyDoun={handleKeyDoun}
        showIssues={showIssues}
        handleChange={handleChange}
        repositoryUrl={repositoryUrl}
      />
      {issues.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "30px",
          }}
        >
          <Breadcrumbs
            owner={owner}
            repo={repo}
            repositoryUrl={repositoryUrl}
          />
          <StarsRepo stars={stars} />
        </div>
      )}

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
        <Board
          handleDragEnd={handleDragEnd}
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
      )}
    </Container>
  );
};

export default App;
