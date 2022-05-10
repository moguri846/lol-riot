import styled from "styled-components";

const OptionList = styled.ul`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const OptionItem = styled.li`
  margin: 10px;

  &.selected {
    border-bottom: 1px solid black;
  }
`;

const LineGraphContainer = styled.div`
  width: 100%;
  height: 100%;

  & > * {
    background-color: #ffffff;
    transition: 1s cubic-bezier(0, 1.65, 1, 1);
  }
`;

export { OptionList, OptionItem, LineGraphContainer };
