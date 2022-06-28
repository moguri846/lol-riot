import React from "react";
import Skeleton from "react-loading-skeleton";
import * as S from "./style";

interface IProps {}

const SummonerInfoSkeleton = ({}: IProps) => {
  return (
    <S.SummonerContainer>
      <S.ProfileImgContainer>
        <Skeleton width="120px" height="120px" circle />
        <div className="level">
          <span>
            <Skeleton width="120px" height="21px" />
          </span>
        </div>
      </S.ProfileImgContainer>
      <S.SummonerInfo>
        <div className="info">
          <Skeleton width="154px" height="27px" />
        </div>
        <S.SummonerRank>
          <div className="queue-type">
            <Skeleton width="154px" height="21px" />
          </div>
          <div className="tier-rank">
            <div className="tier">
              <Skeleton width="100px" height="114px" />
            </div>
            <div className="rank">
              <Skeleton width="20px" height="21px" />
            </div>
          </div>
        </S.SummonerRank>
        <div className="league-points">
          <Skeleton width="125px" height="21px" />
        </div>
        <div className="win-rate">
          <Skeleton width="60px" height="18px" />
        </div>
        <Skeleton width="125px" height="35px" />
      </S.SummonerInfo>
    </S.SummonerContainer>
  );
};

export default SummonerInfoSkeleton;
