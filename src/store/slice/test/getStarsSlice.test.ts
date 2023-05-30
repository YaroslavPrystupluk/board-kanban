import axios from "axios";
import { beforeEach, describe, it, vi, expect, Mock } from "vitest";
import { fetchStars, starsSlice } from "../getStarsSlice";
import { DOMAIN } from "../../../config/API";

const mockState = {
	stars: { stargazers_count: 0, id: 0 },
	loading: false,
	error: null,
};

const mockResponseData = {
	data: {
		id: 1,
		stargazers_count: 5,
	},
};

vi.mock("axios");
describe("testing 'getStarsSlice'", () => {
	const owner = "facebook";
	const repo = "react";
	const dispatchMock = vi.fn();
	const rejectWithValueMock = vi.fn();
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("a positive response from the server should come ", async () => {
		const mockedAxios = axios.get as Mock;
		mockedAxios.mockResolvedValue(mockResponseData);

		await fetchStars([owner, repo])(dispatchMock, rejectWithValueMock, () => {
			null;
		});

		const { calls } = dispatchMock.mock;

		const [start, end] = calls;

		expect(calls).toHaveLength(2);
		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/repos/${owner}/${repo}`);
		expect(start[0].type).toBe(fetchStars.pending.type);
		expect(end[0].type).toBe(fetchStars.fulfilled.type);
		expect(end[0].payload).toEqual(mockResponseData.data);
	});

	it("a error response from the server should come ", async () => {
		const mockErrorMessage = "Request failed";

		const mockedAxios = axios.get as Mock;

		mockedAxios.mockRejectedValue(new Error(mockErrorMessage));

		await fetchStars([owner, repo])(dispatchMock, rejectWithValueMock, () => {
			null;
		});

		const { calls } = dispatchMock.mock;

		const [start, end] = calls;
		console.log(end);

		expect(calls).toHaveLength(2);
		expect(axios.get).toHaveBeenCalledWith(`${DOMAIN}/repos/${owner}/${repo}`);
		expect(start[0].type).toBe(fetchStars.pending.type);
		expect(end[0].type).toBe(fetchStars.rejected.type);
		expect(end[0].payload).toBe("Request failed");
	});

	describe("testing starsSlice", () => {
		it("should handle pending state", () => {
			const newState = starsSlice.reducer(mockState, { type: fetchStars.pending.type });

			expect(newState.loading).toBe(true);
			expect(newState.error).toBeNull;
		});

		it("should handle fulfilled state", () => {
			const payload = mockResponseData.data;
			const newState = starsSlice.reducer(
				mockState,
				fetchStars.fulfilled(payload, "arg", [owner, repo]),
			);

			expect(newState.loading).toBe(false);
			expect(newState.stars).toEqual(payload);
			expect(newState.error).toBeNull;
		});

		it("should handle rejected state", () => {
			const payload = "Request failed";
			const newState = starsSlice.reducer(
				mockState,
				fetchStars.rejected(payload, "arg", [owner, repo]),
			);
			expect(newState.loading).toBe(false);
			expect(newState.error).toBe(payload);
		});
	});
});
