import styled from "styled-components";

const GraphContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;

  @media screen and (max-width: 480px) {
    height: 100%;
    margin: 10px 0px;
    flex-direction: column;

    & > div {
      width: 100%;
    }
  }
`;

const CalendarGraphContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BarGraphContainer = styled.div`
  width: 380px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    width: 100%;
  }
`;

export { GraphContainer, CalendarGraphContainer, BarGraphContainer };
