import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import { Iissues } from "../../model/Iissues";

interface issuesState {
  issues: Iissues[];
  loading: boolean;
  error: string | null;
}
type Owner = string
type Repo = string

const initialState: issuesState = {
  issues: [],
  loading: false,
  error: null,
};

const token = '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'

const headers = {
  Authorization: `Bearer ${token}`
};


// https://github.com/facebook/react

export const fetchIssues = createAsyncThunk<
  Iissues[], 
   [Owner, Repo],
  { rejectValue: string }
>("issues/fetchIssues", async ([owner, repo], thunkAPI) => {
  try {
    const response = await axios.get<Iissues[]>(`${DOMAIN}/repos/${owner}/${repo}/issues`, {headers});
	
	return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const searchIssuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
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
        state.error = action.payload;
      });
  },
});

export default searchIssuesSlice.reducer;
