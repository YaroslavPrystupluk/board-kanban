import { describe, it, expect, vi, Mock } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import axios from "axios";
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

const owner = "facebook";
const repo = "react";

vi.mock("axios");

describe("testing component 'App'", () => {
	it("renders app with breadcrambs and stars", async () => {
		const mockStars = mockState.stars.stars.stargazers_count;
		const mockBreadcrumbs = ["Home", "Page"];
		const mockedAxios = axios.get as Mock;

		mockedAxios.mockResolvedValueOnce({ data: mockStars });
		mockedAxios.mockResolvedValueOnce({ data: mockBreadcrumbs });

		const { container } = render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		const inputElement = screen.getByTestId("input-search");
		fireEvent.change(inputElement, {
			target: { value: `https://example.com/${owner}/${repo}` },
		});

		const button = screen.getByRole("button", { name: /Load issues/i });
		userEvent.click(button);

		await waitFor(() => {
			expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}`);
			expect(axios.get).toHaveBeenCalledWith(
				`https://api.github.com/repos/${owner}/${repo}/issues`,
			);
		});

		const starsElement = screen.getByTestId("star");
		const breadcrumbsElement = screen.getByTestId("breadcrumbs");

		expect(container).toMatchSnapshot();
		expect(button).toBeInTheDocument();
		expect(starsElement).toBeInTheDocument();
		expect(breadcrumbsElement).toBeInTheDocument();
	});

	it("should fetch issues when Enter key is pressed", async () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		const inputElement = screen.getByTestId("input-search");

		fireEvent.change(inputElement, {
			target: { value: `https://example.com/${owner}/${repo}` },
		});

		fireEvent.keyDown(inputElement, { key: "Enter" });

		await waitFor(() => {
			const stars = getByTestId("star");
			const breadcrumbs = getByTestId("breadcrumbs");

			expect(stars.textContent).toBe(" stars");
			expect(breadcrumbs.textContent).toBe("facebook>react");
		});
	});

	it("renders app with error", async () => {
		const mockedAxios = axios.get as Mock;
		const error = "Erorr";

		mockedAxios.mockRejectedValue({ data: error });
		const { getByTestId } = render(
			<Provider store={store}>
				<App />
			</Provider>,
		);

		const inputElement = screen.getByTestId("input-search");
		fireEvent.change(inputElement, {
			target: { value: `https://example.com/${owner}/${repo}` },
		});
		fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });

		const button = screen.getByRole("button", { name: /Load issues/i });
		userEvent.click(button);

		await waitFor(() => {
			const errorMessage = getByTestId("error");
			expect(errorMessage).toBeInTheDocument();
		});
	});

	it("should store the data in localStorage with the correct key and value", () => {
		// 	const items = [
		// 		{ id: 1, title: "Задача 1" },
		// 		{ id: 2, title: "Задача 2" },
		// 	];
		// 	const key = "repo";
		// 	render(
		// 		<Provider store={store}>
		// 			<App />
		// 		</Provider>,
		// 	);
		// 	expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(items));
	});
});
