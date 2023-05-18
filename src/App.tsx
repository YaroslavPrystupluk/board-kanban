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

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { issues, loading, error } = useAppSelector((state) => state.issues);

  const [repositoryUrl, setRepositoryUrl] = useState<string>("");
  const [open, setOpen] = useState<Iissues[]>([]);
  const [inProgress, setInProgress] = useState<Iissues[]>([]);
  const [closed, setClosed] = useState<Iissues[]>([]);

  console.log("open", open);
  console.log("closed", closed);

  const url = repositoryUrl.split("/");
  const owner = url[3];
  const repo = url[4];

  useEffect(() => {
    setOpen(issues.filter((issue) => issue.state === "open"));
    setClosed(issues.filter((issue) => issue.state === "closed"));
  }, [issues, setOpen, setClosed]);

  const handleKeyDoun = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") dispatch(fetchIssues([owner, repo]));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepositoryUrl(e.target.value);
  };

  const showIssues = useCallback(() => {
    dispatch(fetchIssues([owner, repo]));
  }, [dispatch, owner, repo]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    if (source.droppableId == "1") {
      setOpen(removeItemById(draggableId, open));
    } else if (source.droppableId == "2") {
      setInProgress(removeItemById(draggableId, inProgress));
    } else if (source.droppableId == "3") {
      setClosed(removeItemById(draggableId, closed));
    }

    const issue = findItemById(draggableId, [
      ...closed,
      ...open,
      ...inProgress,
    ]);

    if (destination.droppableId == "1") {
      setOpen([{ ...issue, state: "open" }, ...open]);
    } else if (destination.droppableId == "2") {
      setInProgress([{ ...issue, state: "in progress" }, ...inProgress]);
    } else if (destination.droppableId == "3") {
      setClosed([{ ...issue, state: "closed" }, ...closed]);
    }
  };

  function findItemById(id, array) {
    console.log("array", array);

    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
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
