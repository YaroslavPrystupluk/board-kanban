import { FC, ChangeEvent, KeyboardEvent } from "react";
import { Button, Form, Stack } from "react-bootstrap";

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
		<Stack className="mb-3 mt-4" direction="horizontal" gap={3}>
			<Form.Control
				className="me-auto"
				as="input"
				type="text"
				name="search"
				value={repositoryUrl}
				onChange={handleChange}
				onKeyDown={handleKeyDoun}
				placeholder="Enter repository URL"
				data-testid="input-search"
			/>
			<Button className="text-nowrap" variant="outline-success" type="submit" onClick={showIssues}>
				Load issues
			</Button>
		</Stack>
	);
};

export default SearchIssues;
