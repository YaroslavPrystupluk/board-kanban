import { configureStore } from "@reduxjs/toolkit";
import searchIssuesReducer from "./slice/getIssuesSlice";
import starsReducers from "./slice/getStarsSlice";

const store = configureStore({
	reducer: {
		issues: searchIssuesReducer,
		stars: starsReducers,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
