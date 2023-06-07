import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../Breadcrumbs";

describe("testing components 'Breadcrumbs'", () => {
	const breadcrumbsProps = {
		owner: "testOwner",
		repo: "testRepo",
		repositoryUrl: "https://example.com",
	};

	it("renders owner and repo names", () => {
		render(<Breadcrumbs {...breadcrumbsProps} />);

		const ownerLink = screen.getByText("testOwner");
		const repoLink = screen.getByText("testRepo");

		expect(ownerLink).toBeInTheDocument();
		expect(repoLink).toBeInTheDocument();
	});

	it("renders separator when repositoryUrl is provided", () => {
		render(<Breadcrumbs {...breadcrumbsProps} />);

		const separator = screen.getByText(">");

		expect(separator).toBeInTheDocument();
	});
});
