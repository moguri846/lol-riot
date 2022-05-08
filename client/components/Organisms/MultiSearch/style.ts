import styled from "styled-components";

const SummonerList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SummonerItem = styled.li`
  width: 220px;
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;

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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;

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
    width: 75px;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    font-size: 13px;
  }

  & > .time-stamp {
    width: 60px;
    text-align: end;
    font-size: 13px;
  }
`;
export { SummonerList, SummonerItem, MatchSummaryList, MatchSummaryItem };
