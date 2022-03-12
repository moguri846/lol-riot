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

  @media screen and (max-width: 460px) {
    height: 100%;
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

const MatchList = styled.ul`
  width: 100%;
`;

export {
  SummonerContainer,
  ProfileImgContainer,
  SummonerInfo,
  SummonerRank,
  GraphContainer,
  CalendarGraphContainer,
  BarGraphContainer,
  MatchList,
};
