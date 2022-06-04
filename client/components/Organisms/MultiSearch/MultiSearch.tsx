import React from "react";
import moment from "moment";
import SummonerInfo from "../SummonerInfo/SummonerInfo";
import { MultiSearchType } from "../../../toolkit/riot/multiSearchSlice/interface/multiSearchSlice.interface";
import * as S from "./style";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import { getDataDragonImg } from "../../common/func/common.func";
import Image from "next/image";
import MultiSearchSkeleton from "./MultiSearchSkeleton";

interface IProps {
  loading: boolean;
  multiSearch: MultiSearchType;
}

const MultiSearch = ({ loading, multiSearch }: IProps) => {
  return (
    <>
      {loading ? (
        <>
          <MultiSearchSkeleton />
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
                      <Image width={30} height={30} src={`/assets/image/line/${mostLine}.png`} alt={mostLine} />
                    </div>
                    <S.MatchSummaryList>
                      {matchArr.map((match) => (
                        <S.MatchSummaryItem className={`${match.win ? "win" : "lose"}`} key={match.gameCreation}>
                          <div className="champion">
                            {getDataDragonImg({ width: 30, height: 30, key: "champion", value: match.championName })}
                          </div>
                          <div className="line">
                            <Image
                              width={30}
                              height={30}
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
