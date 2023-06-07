import { Card } from "react-bootstrap";
import styled from "styled-components";

const CardWrapp = styled(Card)`
	border-radius: 10px;
	box-shadow: 5px 5px 5px 2px grey;
	margin: 0 10px 8px 10px;
	cursor: grab;
	background: ${(props) => (props.isDragging ? "#49bcf8" : "#eaf4fc")};
`;

export { CardWrapp };
