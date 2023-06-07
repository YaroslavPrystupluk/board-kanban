import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "../Board";

const mockIssue = [
	{
		id: 1,
		number: 2,
		title: "Sample Issue",
		updated_at: new Date().toISOString(),
		user: {
			type: "User",
		},
		comments: "3",
		state: "open",
	},
];

const onDragEndMock = vi.fn();

describe("testing component 'Board'", () => {
	it("should handle drag and drop", () => {
		render(
			<DragDropContext onDragEnd={onDragEndMock}>
				<Board
					open={mockIssue}
					inProgress={mockIssue}
					closed={mockIssue}
					handleDragEnd={onDragEndMock}
				/>
			</DragDropContext>,
		);

		expect(screen.getByText("To Do")).toBeInTheDocument();
		expect(screen.getByText("In Progress")).toBeInTheDocument();
		expect(screen.getByText("Done")).toBeInTheDocument();

		const draggableItem = screen.getAllByText("Sample Issue");
		const droppableContainer = screen.getAllByTestId("IssuesList");
		fireEvent.drag(draggableItem[0]);
		fireEvent.drop(droppableContainer[1]);
	});
});
