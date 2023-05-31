interface IUser {
	type: string;
}

export interface Iissues {
	id: number;
	number: number;
	title: string;
	updated_at: string;
	user: IUser;
	comments: string;
	state?: string;
}

export interface Istars {
	id: number;
	stargazers_count: number;
}
