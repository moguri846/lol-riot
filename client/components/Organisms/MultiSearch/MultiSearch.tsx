import React from "react";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import SummonerInfo from "../SummonerInfo/SummonerInfo";
import { MultiSearchType } from "../../../toolkit/riot/multiSearchSlice/interface/multiSearchSlice.interface";
import * as S from "./style";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import { getDataDragonImg } from "../../common/func/common.func";

interface IProps {
  loading: boolean;
  multiSearch: MultiSearchType;
}

const MultiSearch = ({ loading, multiSearch }: IProps) => {
  return (
    <>
      {loading ? (
        <>
          <Skeleton width="1200px" height="480px" />
        </>
      ) : (
        <>
          {multiSearch.success === false ? (
            <ErrorForm message={multiSearch.data} {...multiSearch} />
          ) : (
            <S.SummonerList>
              {multiSearch.data.map(({ summonerInfo, mostLine, matchArr }) => (
                <S.SummonerItem key={summonerInfo.puuid}>
                  <SummonerInfo loading={loading} summoner={summonerInfo} multiSearch />
                  <div className="game-info">
                    <div className="most-line">
                      <img src={`/assets/image/line/${mostLine}.png`} alt={mostLine} />
                    </div>
                    <S.MatchSummaryList>
                      {matchArr.map((match) => (
                        <S.MatchSummaryItem className={`${match.win ? "win" : "lose"}`} key={match.gameCreation}>
                          <div className="champion">{getDataDragonImg("champion", match.championName)}</div>
                          <div className="line">
                            <img
                              src={`/assets/image/line/${match.individualPosition}.png`}
                              alt={match.individualPosition}
                            />
                          </div>
                          <div className="kda">
                            <span className="kills">{match.kills}</span> /{" "}
                            <span className="deaths">{match.deaths}</span> /
                            <span className="assists"> {match.assists}</span>
                          </div>
                          <div className="time-stamp">{moment(match.gameCreation).startOf("minute").fromNow()}</div>
                        </S.MatchSummaryItem>
                      ))}
                    </S.MatchSummaryList>
                  </div>
                </S.SummonerItem>
              ))}
            </S.SummonerList>
          )}
        </>
      )}
    </>
  );
};

export default MultiSearch;
