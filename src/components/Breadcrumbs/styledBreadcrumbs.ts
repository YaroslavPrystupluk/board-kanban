import styled from "styled-components";
import { Breadcrumb } from "react-bootstrap";

const StyledBreadcrumb = styled(Breadcrumb)`
	a {
		text-decoration: none;
		font-size: 20px;
	}

	.breadcrumb-item::before {
		content: none;
		font-size: 20px;
	}

	.breadcrumb-item:first-child::before {
		content: none;
	}
`;
const Separator = styled.span`
	font-size: 20px;
	padding: 0 10px;
`;

export { StyledBreadcrumb, Separator };
