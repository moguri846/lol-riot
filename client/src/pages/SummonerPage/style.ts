import styled from "styled-components";

const SummonerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileImgContainer = styled.div`
  width: 100px;
`;

const SummonerInfo = styled.div``;

const SummonerRank = styled.div``;

const GraphContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  & > * {
    width: 100%;
    height: 100%;
  }
`;

const CalendarGraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BarGraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LineGraphContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MatchList = styled.ul`
  width: 100%;
`;

const MatchItemContainer = styled.li`
  margin-bottom: 10px;

  &.win {
    background-color: #85c1e9;
  }

  &.lose {
    background-color: #ec7063;
  }
`;

const MatchItem = styled.li`
  display: flex;
  & > div {
    display: flex;
  }
`;

const MatchInfo = styled.div`
  width: 65px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MatchStatusContainer = styled.div``;

const Player = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin: 0px 10px;
  }

  & > .status {
    display: flex;
    flex-direction: column;
  }

  & > .champion-status {
    display: flex;
  }
`;

const Items = styled.ul`
  width: 165px;
`;

const Item = styled.li`
  width: 35px;
  height: 35px;
  display: inline-block;
  padding: 3px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const Kda = styled.div`
  width: 65px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    width: 100%;
    text-align: center;
  }
`;

const PlayerStatus = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChampionStatus = styled.div`
  display: flex;

  & > .champion-img-container {
    display: flex;
    align-items: center;
    // margin-right: 5px;

    & > img {
      width: 50px;
      height: 50px;
      margin: 0px 5px;
      border-radius: 50%;
    }
  }

  & > .spell-img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > img {
      width: 35px;
      height: 35px;
      padding-bottom: 5px;
    }
  }
`;

export {
  SummonerContainer,
  ProfileImgContainer,
  SummonerInfo,
  SummonerRank,
  GraphContainer,
  CalendarGraphContainer,
  BarGraphContainer,
  LineGraphContainer,
  MatchList,
  MatchItemContainer,
  MatchItem,
  MatchInfo,
  MatchStatusContainer,
  Kda,
  PlayerStatus,
  ChampionStatus,
  Player,
  Items,
  Item,
};
