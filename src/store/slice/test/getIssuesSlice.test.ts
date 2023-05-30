import axios from "axios";
import { beforeEach, describe, it, vi, expect, Mock } from "vitest";
import { fetchIssues, searchIssuesSlice, actionStorage } from "../getIssuesSlice";
import { DOMAIN } from "../../../config/API";

const mockState = {
	issues: [],
	loading: false,
	error: null,
};

const mockResponseData = {
	data: [
		{
			id: 1,
			number: 2,
			title: "string",
			updated_at: "string",
			user: {
				type: " string",
			},
			comments: "string",
		},
	],
};

const owner = "facebook";
const repo = "react";

vi.mock("axios");
describe("testing 'getIssuesSlice'", () => {
	const dispatchMock = vi.fn();
	const rejectWithValueMock = vi.fn();
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("a positive response from the server should come ", async () => {
		const mockedAxios = axios.get as Mock;
		mockedAxios.mockResolvedValue(mockResponseData);

		await fetchIssues([owner, repo])(dispatchMock, rejectWithValueMock, () => {
			null;
		});

		const { calls } = dispatchMock.mock;

		const [start, end] = calls;

		expect(calls).toHaveLength(2);
		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/repos/${owner}/${repo}/issues`);
		expect(start[0].type).toBe(fetchIssues.pending.type);
		expect(end[0].type).toBe(fetchIssues.fulfilled.type);
		expect(end[0].payload).toEqual(mockResponseData.data);
	});

	it("a error response from the server should come ", async () => {
		const mockErrorMessage = "Request failed";

		const mockedAxios = axios.get as Mock;

		mockedAxios.mockRejectedValue(new Error(mockErrorMessage));

		await fetchIssues([owner, repo])(dispatchMock, rejectWithValueMock, () => {
			null;
		});

		const { calls } = dispatchMock.mock;

		const [start, end] = calls;

		expect(calls).toHaveLength(2);
		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/repos/${owner}/${repo}/issues`);
		expect(start[0].type).toBe(fetchIssues.pending.type);
		expect(end[0].type).toBe(fetchIssues.rejected.type);
		expect(end[0].payload).toBe("Request failed");
	});
});

describe("testing searchIssuesSlice", () => {
	it("should read from local storage", () => {
		const action = { type: actionStorage.type, payload: mockResponseData.data };
		const result = searchIssuesSlice.reducer(mockState, action);

		expect(result.issues).toEqual(mockResponseData.data);
	});

	it("should handle pending state", () => {
		const newState = searchIssuesSlice.reducer(mockState, { type: fetchIssues.pending.type });

		expect(newState.loading).toBe(true);
		expect(newState.error).toBeNull;
	});

	it("should handle fulfilled state", () => {
		const payload = mockResponseData.data;
		const newState = searchIssuesSlice.reducer(
			mockState,
			fetchIssues.fulfilled(payload, "arg", [owner, repo]),
		);

		expect(newState.loading).toBe(false);
		expect(newState.issues).toEqual(payload);
		expect(newState.error).toBeNull;
	});

	it("should handle rejected state", () => {
		const payload = new Error("Request failed");
		const newState = searchIssuesSlice.reducer(
			mockState,
			fetchIssues.rejected(payload, "arg", [owner, repo]),
		);
		expect(newState.loading).toBe(false);
		expect(newState.error).toBe("Request failed");
	});
});
