import { Card } from "react-bootstrap";
import styled from "styled-components";

interface bgColorChangeProps {
  isDragging: boolean;
  isDraggable: boolean;
  isBacklog: boolean;
}


const CardWrapp = styled(Card)`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props: bgColorChangeProps) => bgcolorChange(props)};
  cursor: grab;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

function bgcolorChange(props: bgColorChangeProps): string {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

export {CardWrapp}