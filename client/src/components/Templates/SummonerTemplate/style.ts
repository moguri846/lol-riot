import styled from "styled-components";

const SummonerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const ProfileImgContainer = styled.div`
  & > img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  & > .level {
    text-align: center;

    & > span > span {
      font-weight: bold;
    }
  }
`;

const SummonerInfo = styled.div`
  & > .info {
    text-align: center;
  }

  & > .info > .name {
    font-weight: bold;
    font-size: 20px;
  }

  & > .info > .win-lose {
    display: flex;
    justify-content: space-evenly;
    font-size: 16px;
  }
`;

const SummonerRank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .tier-rank > .rank {
    font-weight: bold;
  }
`;

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

const Spectator = styled.div`
  width: 100%;
  height: 190px;
`;

const SpectatorPlayerList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const SpectatorPlayer = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px;

  & > .name {
    font-weight: bold;
  }
  & > .name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &.red {
    flex-direction: row-reverse;

    & > div {
      flex-direction: row-reverse;
    }
  }
`;

const ChampionStatus = styled.div`
  & {
    display: flex;
    align-items: center;

    & > .spells > li {
      width: 12px;
      height: 12px;
      padding: 1px;

      display: flex;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  & > .champion-img {
    width: 26px;
    height: 26px;

    & > img {
      width: 100%;
      height: 100%;
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

const MatchList = styled.ul`
  width: 100%;
`;

export {
  SummonerContainer,
  ProfileImgContainer,
  SummonerInfo,
  SummonerRank,
  Spectator,
  SpectatorPlayerList,
  SpectatorPlayer,
  ChampionStatus,
  GraphContainer,
  CalendarGraphContainer,
  BarGraphContainer,
  MatchList,
};
