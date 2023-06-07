import { describe, it, expect, vi } from "vitest";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fireEvent, render, screen } from "@testing-library/react";
import CardIssue from "../CardIssue";
import TabletCards from "../../TabletCards/TabletCards";
import { CardWrapp } from "../styledCardItem";

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
							ref={provided.innerRef}
							{...provided.droppableProps}>
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
		fireEvent.dragStart(draggableElement);
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
							ref={provided.innerRef}
							{...provided.droppableProps}>
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

	it("renders with correct styles when dragging is true", () => {
		const { container } = render(<CardWrapp isDragging />);
		const cardWrappElement = container.firstChild;

		expect(cardWrappElement).toHaveStyle(`
      border-radius: 10px;
      box-shadow: 5px 5px 5px 2px grey;
      margin: 0 10px 8px 10px;
      cursor: grab;
      background: #49bcf8;
    `);
	});
});
