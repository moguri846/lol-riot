import React from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import SummonerInfo from "../SummonerInfo/SummonerInfo";
import { getDataDragonImg } from "../../../pages/common/commonFunc";
import { IMultiSearch } from "../../../_actions/riot/interface/multiSearch.interface";

import * as S from "./style";

interface IProps {
  loading: boolean;
  multiSearch: IMultiSearch[];
}

const MultiSearch = ({ loading, multiSearch }: IProps) => {
  return (
    <>
      {loading ? (
        <>
          <Skeleton width="1080px" height="394px" />
        </>
      ) : (
        <S.SummonerList>
          {multiSearch.map(({ summonerInfo, matchArr }) => (
            <S.SummonerItem key={summonerInfo.puuid}>
              <SummonerInfo loading={loading} summoner={summonerInfo} />
              <S.MatchSummaryList>
                {matchArr.map((match) => (
                  <S.MatchSummaryItem className={`${match.win ? "win" : "lose"}`} key={match.gameCreation}>
                    <div className="champion">{getDataDragonImg("champion", match.championName)}</div>
                    <div className="kda">
                      <span className="kills">{match.kills}</span> / <span className="deaths">{match.deaths}</span> /
                      <span className="assists"> {match.assists}</span>
                    </div>
                    <div className="time-stamp">{moment(match.gameCreation).startOf("minute").fromNow()}</div>
                  </S.MatchSummaryItem>
                ))}
              </S.MatchSummaryList>
            </S.SummonerItem>
          ))}
        </S.SummonerList>
      )}
    </>
  );
};

export default MultiSearch;
