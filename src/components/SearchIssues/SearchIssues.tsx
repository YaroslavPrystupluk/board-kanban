import { FC, ChangeEvent, KeyboardEvent } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

interface SearchIssuesProps {
  handleKeyDoun: (e: KeyboardEvent<HTMLInputElement>) => void;
  showIssues: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  repositoryUrl: string;
}

const SearchIssues: FC<SearchIssuesProps> = ({
  handleKeyDoun,
  showIssues,
  handleChange,
  repositoryUrl,
}) => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md={10}>
          <Form.Control
            as="input"
            type="text"
            name="search"
            value={repositoryUrl}
            onChange={handleChange}
            onKeyDown={handleKeyDoun}
            placeholder="Enter repository URL"
          />
        </Col>
        <Col>
          <Button variant="outline-success" type="submit" onClick={showIssues}>
            Load issues
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchIssues;
