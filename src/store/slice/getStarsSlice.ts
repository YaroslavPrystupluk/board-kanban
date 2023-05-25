import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import { Istars } from "../../model/Iissues";

interface starsState {
	stars: Istars;
	loading: boolean;
	error: string | null;
}
type Owner = string;
type Repo = string;

const initialState: starsState = {
	stars: { stargazers_count: 0, id: 0 },
	loading: false,
	error: null,
};

export const fetchStars = createAsyncThunk<Istars, [Owner, Repo], { rejectValue: string }>(
	"stars/fetchStars",
	async ([owner, repo], thunkAPI) => {
		try {
			const response = await axios.get<Istars>(`${DOMAIN}/repos/${owner}/${repo}`);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	},
);
export const starsSlice = createSlice({
	name: "stars",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStars.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchStars.fulfilled, (state, action) => {
				state.loading = false;
				state.stars = action.payload;
			})
			.addCase(fetchStars.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default starsSlice.reducer;
