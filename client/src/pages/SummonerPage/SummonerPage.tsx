import React from "react";
import useSearch from "../../customHook/useSearch";
import { Input } from "../../elememts";
import { useSelector } from "react-redux";
import BarGraph from "../../components/BarGraph/BarGraph";
import CalendarGraph from "../../components/CalendarGraph/CalendarGraph";
import { RootReducer } from "../../reducers";
import LineGraph from "../../components/LineGraph/LineGraph";
import "moment/locale/ko";
import {
  SummonerContainer,
  ProfileImgContainer,
  SummonerInfo,
  SummonerRank,
  GraphContainer,
  CalendarGraphContainer,
  BarGraphContainer,
  LineGraphContainer,
  MatchList,
  MatchItem,
  Items,
  Item,
  MatchItemContainer,
  MatchInfo,
  MatchStatusContainer,
  Player,
  Kda,
  PlayerStatus,
  ChampionStatus,
} from "./style";
import moment from "moment";

const SummonerPage = () => {
  const summoner = useSelector((state: RootReducer) => state);

  const [summonerName, onChange, onEnter, onClick, onMatchDetail] = useSearch(summoner);

  const getProfileImg = (profileIconId: number) => {
    return (
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/${profileIconId}.png`}
        alt={`${profileIconId}`}
      />
    );
  };

  const getChampionImg = (championName: string) => {
    return (
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${championName}.png`}
        alt={`${championName}`}
      />
    );
  };

  const getItemImg = (itemId: number) => {
    return <img src={`http://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${itemId}.png`} alt={`${itemId}`} />;
  };

  const spellImg = (spellName: string) => {
    return (
      <img
        key={spellName}
        src={`http://ddragon.leagueoflegends.com/cdn/12.3.1/img/spell/${spellName}.png`}
        alt={`${spellName}`}
      />
    );
  };

  const printMatchList = () => {
    return summoner.matchSummary.map((match, idx) => (
      <MatchItemContainer key={match.gameId} className={match.win ? "win" : "lose"}>
        <details>
          <summary onClick={() => onMatchDetail(match)}>
            <MatchItem>
              <MatchInfo>
                <span>{match.gameMode}</span>
                <span>{match.win ? "승리" : "패배"}</span>
                <span>{moment(summoner.matchSummary[0].gameCreation).startOf("hour").fromNow()}</span>
              </MatchInfo>
              <MatchStatusContainer>
                <Player className="player">
                  <Items className="items">
                    {match.player.items.map((item) => (
                      <Item>{getItemImg(item)}</Item>
                    ))}
                  </Items>
                  <Kda>
                    <span className="kda">
                      {match.player.kills} / {match.player.deaths} / {match.player.assists}
                    </span>
                  </Kda>
                  <PlayerStatus>
                    <span className="level">레벨 {match.player.champLevel}</span>
                    <span className="cs">CS {match.player.cs}</span>
                  </PlayerStatus>
                  <ChampionStatus>
                    <div className="spell-img-container">{match.player.spells.map((spell) => spellImg(spell))}</div>
                    <div className="champion-img-container">{getChampionImg(match.player.championName)}</div>
                  </ChampionStatus>
                </Player>
                <Player className="enemy">
                  <ChampionStatus>
                    <div className="champion-img-container">{getChampionImg(match.enemy.championName)}</div>
                    <div className="spell-img-container">{match.enemy.spells.map((spell) => spellImg(spell))}</div>
                  </ChampionStatus>
                  <Kda>
                    <span className="kda">
                      {match.enemy.kills} / {match.enemy.deaths} / {match.enemy.assists}
                    </span>
                  </Kda>
                  <PlayerStatus>
                    <span className="level">레벨 {match.enemy.champLevel}</span>
                    <span className="cs">CS {match.enemy.cs}</span>
                  </PlayerStatus>
                  <Items className="items">
                    {match.enemy.items.map((item) => (
                      <Item>{getItemImg(item)}</Item>
                    ))}
                  </Items>
                </Player>
              </MatchStatusContainer>
            </MatchItem>
          </summary>
          <LineGraphContainer style={{ width: "100%", height: "100%" }}>
            <LineGraph timeline={summoner.matchSummary[idx].detail?.timeLine} type="xp" />
          </LineGraphContainer>
        </details>
      </MatchItemContainer>
    ));
  };

  return (
    <>
      {summoner.summoner.id !== "" ? (
        <>
          <div>
            <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
            <button onClick={onClick}>검색</button>
          </div>
          <SummonerContainer>
            <ProfileImgContainer>{getProfileImg(summoner.summoner.profileIconId)}</ProfileImgContainer>
            <SummonerInfo>
              <span>{summoner.summoner.name}</span>
              <span>레벨 {summoner.summoner.summonerLevel}</span>
            </SummonerInfo>
            <SummonerRank></SummonerRank>
          </SummonerContainer>
          <GraphContainer>
            <CalendarGraphContainer>
              <CalendarGraph jandi={summoner.jandi} />
            </CalendarGraphContainer>
            <BarGraphContainer>
              <BarGraph lineWinOrLose={summoner.lineWinOrLose} />
            </BarGraphContainer>
          </GraphContainer>
          <MatchList>{printMatchList()}</MatchList>
        </>
      ) : (
        <div>
          <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
          <button onClick={onClick}>검색</button>
        </div>
      )}
    </>
  );
};

export default SummonerPage;
