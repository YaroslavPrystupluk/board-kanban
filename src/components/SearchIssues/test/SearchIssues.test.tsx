import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchIssues from "../SearchIssues";

const showIssuesMock = vi.fn();
const handleChangeMock = vi.fn();
const handleKeyDownMock = vi.fn();

describe("SearchIssues", () => {
	it("should render component", () => {
		render(
			<SearchIssues
				handleKeyDoun={handleKeyDownMock}
				showIssues={showIssuesMock}
				handleChange={handleChangeMock}
				repositoryUrl="https://example.com"
			/>,
		);

		expect(screen.getByPlaceholderText("Enter repository URL")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Load issues" })).toBeInTheDocument();
	});

	it("should call showIssues on button click", () => {
		render(
			<SearchIssues
				handleKeyDoun={handleKeyDownMock}
				showIssues={showIssuesMock}
				handleChange={handleChangeMock}
				repositoryUrl="https://example.com"
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Load issues" }));

		expect(showIssuesMock).toHaveBeenCalled();
	});

	it("should update repositoryUrl on input change", () => {
		render(
			<SearchIssues
				handleKeyDoun={handleKeyDownMock}
				showIssues={showIssuesMock}
				handleChange={handleChangeMock}
				repositoryUrl="https://example.com"
			/>,
		);
		const inputElement = screen.getByTestId("input-search");
		handleChangeMock({ target: { value: "https://example.com" } });
		fireEvent.change(inputElement, {
			target: { value: "https://example.com" },
		});
		expect(handleChangeMock).toHaveBeenCalledWith(
			expect.objectContaining({ target: { value: "https://example.com" } }),
		);
	});

	it("should call handleKeyDoun on when key enter is pressed", () => {
		render(
			<SearchIssues
				handleKeyDoun={handleKeyDownMock}
				showIssues={showIssuesMock}
				handleChange={handleChangeMock}
				repositoryUrl="https://example.com"
			/>,
		);

		const inputElement = screen.getByTestId("input-search");

		fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

		expect(handleKeyDownMock).toHaveBeenCalled();
	});
});
