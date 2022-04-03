import styled from "styled-components";

const SummonerList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SummonerItem = styled.li`
  width: 300px;
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px;

  & > div:nth-of-type(1) {
    min-height: 233px;
  }

  & > .game-info {
    width: 100%;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > .most-line > img {
      width: 30px;
    }
  }
`;

const MatchSummaryList = styled.ul`
  width: 100%;
`;

const MatchSummaryItem = styled.li`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px;

  & > .champion {
    width: 30px;
    height: 30px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }

  & > .line {
    width: 30px;
    height: 30px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }

  &.win > .kda {
    background-color: #9ad0f5;
  }

  &.lose > .kda {
    background-color: #ef9a9a;
  }

  & > .kda {
    width: 90px;
    text-align: center;
    padding: 5px 10px;
    border-radius: 5px;
  }

  & > .time-stamp {
    width: 70px;
    text-align: end;
  }
`;
export { SummonerList, SummonerItem, MatchSummaryList, MatchSummaryItem };
