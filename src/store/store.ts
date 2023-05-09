import { configureStore } from "@reduxjs/toolkit";
import searchIssuesReducer from "./slice/getIssuesSlice";

const store = configureStore({
	reducer: {
issues: searchIssuesReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;