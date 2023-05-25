import styled, { css } from "styled-components";

const ScrollStyles = css`
	::-webkit-scrollbar {
		display: none;
	}
`;

const Container = styled.div`
	background-color: #f4f5f7;
	border: 1px solid gray;
	border-radius: 2.5px;
	width: 300px;
	height: 475px;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	overflow-y: scroll;
	${ScrollStyles}
`;

const Title = styled.h3`
	position: sticky;
	top: 0;
	padding: 8px;
	background-color: #6cb8f7;
	text-align: center;
	z-index: 100;
`;
const IssuesList = styled.div`
	padding: 3px;
	transition: background-color 0.2s ease;
	background-color: #f4f5f7;
	flex-grow: 1;
`;
export { Container, Title, IssuesList };
