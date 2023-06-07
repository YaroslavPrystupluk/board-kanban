import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TabletCards from "../TabletCards";
import { DragDropContext } from "react-beautiful-dnd";

const mockIssue = [
	{
		id: 1,
		number: 2,
		title: "Sample Issue",
		updated_at: "2023-05-01",
		user: {
			type: "User",
		},
		comments: "3",
		state: "open",
	},
];

const onDragEndMock = vi.fn();

describe("testing components 'TabletCards;", () => {
	it("should create Issues list", () => {
		const { container } = render(
			<DragDropContext onDragEnd={onDragEndMock}>
				<TabletCards title="Some Title" issues={mockIssue} id="1" />
			</DragDropContext>,
		);
		expect(container).toMatchSnapshot();
		expect(screen.getByText("Some Title")).toBeInTheDocument();
		expect(screen.getByText("Sample Issue")).toBeInTheDocument();
		expect(screen.getByTestId("date")).toBeInTheDocument();
		expect(screen.getByTestId("user")).toBeInTheDocument();
	});
});
