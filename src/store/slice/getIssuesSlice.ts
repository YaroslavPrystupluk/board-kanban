import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import { Iissues } from "../../model/Iissues";

interface issuesState {
	issues: Iissues[];
	loading: boolean;
	error: string | null;
}

const initialState: issuesState = {
	issues: [],
	loading: false,
	error: null,
};

export const fetchIssues = createAsyncThunk<Iissues[], [string, string], { rejectValue: string }>(
	"issues/fetchIssues",
	async ([owner, repo], thunkAPI) => {
		try {
			const response = await axios.get<Iissues[]>(`${DOMAIN}/repos/${owner}/${repo}/issues`);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue((error as Error).message);
		}
	},
);
export const searchIssuesSlice = createSlice({
	name: "issues",
	initialState,
	reducers: {
		actionStorage: (state, action) => {
			state.issues = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIssues.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchIssues.fulfilled, (state, action) => {
				state.loading = false;
				state.issues = action.payload;
			})
			.addCase(fetchIssues.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Something went wrong";
			});
	},
});

export const { actionStorage } = searchIssuesSlice.actions;
export default searchIssuesSlice.reducer;
