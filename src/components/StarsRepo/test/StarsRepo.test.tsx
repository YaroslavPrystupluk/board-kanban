import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import StarsRepo from "../StarsRepo";

describe("testing components 'StarsRepo'", () => {
	it("renders the correct number of stars", () => {
		const stars = {
			id: 1,
			stargazers_count: 500,
		};

		const { getByText } = render(<StarsRepo stars={stars} />);

		expect(getByText("500 stars")).toBeInTheDocument();
	});

	it("renders formatted number for stars greater than 1000", () => {
		const stars = {
			id: 1,
			stargazers_count: 2500,
		};

		const { getByText } = render(<StarsRepo stars={stars} />);

		expect(getByText("3 K stars")).toBeInTheDocument();
	});
});
