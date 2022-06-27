import React from "react";
import moment from "moment";
import { IMultiSearch } from "../../../toolkit/riot/multiSearchSlice/interface/multiSearchSlice.interface";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import { getDataDragonImg } from "../../common/func/common.func";
import Image from "next/image";
import MultiSearchSkeleton from "./MultiSearchSkeleton";
import useGetData from "../../../hooks/useGetData";
import { loadMultiSearch } from "../../../API/riot";
import MultiSearchSummonerInfo from "../MultiSearchSummonerInfo/MultiSearchSummonerInfo";
import * as S from "./style";

interface IProps {
  summonerNames: string[];
}

const MultiSearch = ({ summonerNames }: IProps) => {
  const {
    loading,
    data: { data: multiSearch },
    error,
  } = useGetData<IMultiSearch[]>({
    loadingType: "multiSearch",
    cb: () => loadMultiSearch(summonerNames),
    deps: "",
  });

  return (
    <>
      {loading ? (
        <MultiSearchSkeleton />
      ) : (
        <>
          {error.isError ? (
            <ErrorForm message={error.message} {...error} message404="유저 정보를 불러오지 못했습니다." />
          ) : (
            <>
              {multiSearch.map(({ summonerInfo, mostLine, matchArr }) => (
                <React.Fragment key={summonerInfo.puuid}>
                  <S.SummonerItem>
                    <MultiSearchSummonerInfo summoner={summonerInfo} />
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
                </React.Fragment>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MultiSearch;
