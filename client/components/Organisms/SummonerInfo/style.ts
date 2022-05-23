import styled from "styled-components";

const SummonerContainer = styled.div`
  width: 100%;
  height: 268px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & > div {
    text-align: center;
  }
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

  & > .tier-rank {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & > .tier-rank > .tier > img {
    width: 100px;
  }

  & > .tier-rank > .rank {
    font-weight: bold;
  }
`;

const Graph = styled.div`
  width: 220px;
  display: flex;
  justify-content: space-between;

  & > .radio {
    width: 190px;
    display: flex;
    align-items: center;
    position: relative;
    background-color: #e84057;
    border-radius: 4px;
    color: #ffffff;

    & > .win {
      background-color: #5383e8;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding-left: 5px;
    }

    & > .lose {
      position: absolute;
      right: 5px;
    }
  }

  & > .win-rate.high {
    color: #5383e8;
  }

  & > .win-rate.low {
    color: #e84057;
  }
`;

export { SummonerContainer, ProfileImgContainer, SummonerInfo, SummonerRank, Graph };
