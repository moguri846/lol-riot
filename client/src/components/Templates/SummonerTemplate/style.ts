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
`;

const SummonerInfo = styled.div``;

const SummonerRank = styled.div`
  display: flex;
`;

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
};
