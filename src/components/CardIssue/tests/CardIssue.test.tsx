import { describe, it, expect, vi } from "vitest";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { render, screen } from "@testing-library/react";
import CardIssue from "../CardIssue";
import TabletCards from "../../TabletCards/TabletCards";

const mockIssue = {
	id: 1,
	number: 2,
	title: "Sample Issue",
	updated_at: new Date().toISOString(),
	user: {
		type: "User",
	},
	comments: "3",
};

const mockIndex = 0;

const onDragEndMock = vi.fn();

describe("testing component 'CardItem'", () => {
	it("should match the snapshot and drag and drop works", () => {
		const { container } = render(
			<DragDropContext onDragEnd={onDragEndMock}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<TabletCards
							title="Some Title"
							issues={[mockIssue]}
							id="1"
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}>
							<Draggable
								draggableId={`${mockIssue.id.toString()}`}
								key={mockIssue.id}
								index={mockIndex}>
								{(provided) => (
									<CardIssue
										issue={mockIssue}
										index={mockIndex}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
									/>
								)}
							</Draggable>
						</TabletCards>
					)}
				</Droppable>
			</DragDropContext>,
		);

		expect(container).toMatchSnapshot();

		const draggableElement = screen.getByTestId("IssuesList");
		expect(draggableElement).toBeInTheDocument();
	});

	it("renders the correct date based on the provided values", () => {
		render(
			<DragDropContext onDragEnd={onDragEndMock}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<TabletCards
							title="Some Title"
							issues={[mockIssue]}
							id="1"
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}>
							<Draggable
								draggableId={`${mockIssue.id.toString()}`}
								key={mockIssue.id}
								index={mockIndex}>
								{(provided) => (
									<CardIssue
										issue={mockIssue}
										index={mockIndex}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
									/>
								)}
							</Draggable>
						</TabletCards>
					)}
				</Droppable>
			</DragDropContext>,
		);
		const dateElement = screen.getByTestId("date");
		expect(dateElement).toBeInTheDocument();
	});
});
