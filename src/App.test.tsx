import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, useDispatch } from "react-redux";
import * as reduxHooks from "react-redux";
import App from "./App";
import store from "./store/store";

const mockState = {
	issues: {
		issues: [
			{ id: 1, state: "open", title: "Issue 1", user: { type: "user" } },
			{ id: 2, state: "in progress", title: "Issue 2", user: { type: "user" } },
			{ id: 3, state: "closed", title: "Issue 3", user: { type: "user" } },
		],
		loading: false,
		error: null,
	},
	stars: {
		stars: {
			stargazers_count: 100,
		},
	},
};

vi.mock("react-redux");
const mockedUseSelektor = vi.spyOn(reduxHooks, "useSelector");

describe("testing component 'App'", () => {
	it("renders app with issues and stars", async () => {
		mockedUseSelektor.mockReturnValue(mockState.issues.issues);
		const { container } = render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		expect(container).toMatchSnapshot();

		// expect(screen.queryByTestId("problem-list")).toBeNull();

		// const button = screen.getByRole("button", { name: /Load issues/i });
		// userEvent.click(button);
		// expect(dispatchMock).toHaveBeenCalledTimes(1);

		// await waitFor(() => {
		// 	expect(screen.getByTestId("problem-list")).toBeInTheDocument();
		// });

		// expect(screen.getByText("Issue 1")).toBeInTheDocument();
		// expect(screen.getByText("Issue 2")).toBeInTheDocument();
		// expect(screen.getByText("Issue 3")).toBeInTheDocument();
		// expect(screen.getByText("Stars: 100")).toBeInTheDocument();
	});

	// it("displays loading spinner", () => {
	// 	const loadingState = {
	// 		...mockState,
	// 		issues: {
	// 			...mockState.issues,
	// 			loading: true,
	// 		},
	// 	};

	// 	render(
	// 		<Provider store={store}>
	// 			<App />
	// 		</Provider>,
	// 	);

	// 	expect(screen.getByRole("status")).toBeInTheDocument();
	// });
});
