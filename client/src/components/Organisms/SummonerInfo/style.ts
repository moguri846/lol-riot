import styled from "styled-components";

const SummonerContainer = styled.div`
  width: 100%;
  height: 268px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

export { SummonerContainer, ProfileImgContainer, SummonerInfo, SummonerRank };
