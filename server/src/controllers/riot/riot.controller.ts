import { Request, Response } from "express";
import { AxiosResponse } from "axios";
import moment from "moment";
import {
  getSummonerInfo,
  getSummonerDetailInfo,
  loadSpectatorInfo,
  getMatchIds,
  getMatchInfo,
  getMatchTimeLine,
} from "../../API/riot";
import { changeChampionIdToName, changeQueueIdToName, changeSpellIdToName } from "./function/riot.func";
import { Summoner, SummonerDetailInfo } from "./interface/summonerInfo.interface";
import { ISpectator } from "./interface/spectatorInfo.interface";
import { Jandi, Match } from "./interface/summonerGameInfointerface";
import { MatchTimeLine } from "./interface/matchInfo.interface";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";

export default {
  async summonerInfo(req: Request, res: Response) {
    try {
      const summonerName = req.query.summonerName as string;

      // 유저 검색
      const { data: summoner }: AxiosResponse<Summoner> = await getSummonerInfo(summonerName);

      // 유저 디테일 정보
      const { data: summonerDetailInfo }: AxiosResponse<SummonerDetailInfo[] | []> = await getSummonerDetailInfo(
        summoner.id
      );

      const rankedSolo: SummonerDetailInfo = summonerDetailInfo.filter(
        (summonerDetail) => summonerDetail.queueType === "RANKED_SOLO_5x5"
      )[0];

      const rankedSoloInfo = {
        queueType: rankedSolo ? rankedSolo.queueType : "",
        tier: rankedSolo ? rankedSolo.tier : "",
        rank: rankedSolo ? rankedSolo.rank : "",
        wins: rankedSolo ? rankedSolo.wins : "",
        losses: rankedSolo ? rankedSolo.losses : "",
        leaguePoints: rankedSolo ? rankedSolo.leaguePoints : "",
      };

      const responseObj = {
        ...summoner,
        ...rankedSoloInfo,
      };

      return resFunc({ res, data: responseObj });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
  async multiSearch(req: Request, res: Response) {
    const summonerNames = req.query.summonerNames as string;

    const summonerArr: string[] = summonerNames.split(",");

    const userInfo: any[] = [];

    try {
      await Promise.all(
        summonerArr.map(async (summonerNames) => {
          let matchArr: any[] = [];
          let lineWinOrLose: any = {
            TOP: {
              win: 0,
              lose: 0,
              total: 0,
            },
            JUNGLE: {
              win: 0,
              lose: 0,
              total: 0,
            },
            MIDDLE: {
              win: 0,
              lose: 0,
              total: 0,
            },
            BOTTOM: {
              win: 0,
              lose: 0,
              total: 0,
            },
            UTILITY: {
              win: 0,
              lose: 0,
              total: 0,
            },
          };

          // 유저 검색
          const { data: summoner }: AxiosResponse<Summoner> = await getSummonerInfo(summonerNames);

          // if(summoner)

          // 유저 디테일 정보
          const { data: summonerDetailInfo }: AxiosResponse<SummonerDetailInfo[] | []> = await getSummonerDetailInfo(
            summoner.id
          );

          const rankedSolo: SummonerDetailInfo = summonerDetailInfo.filter(
            (summonerDetail) => summonerDetail.queueType === "RANKED_SOLO_5x5"
          )[0];

          const rankedSoloInfo = {
            queueType: rankedSolo ? rankedSolo.queueType : "",
            tier: rankedSolo ? rankedSolo.tier : "",
            rank: rankedSolo ? rankedSolo.rank : "",
            wins: rankedSolo ? rankedSolo.wins : "",
            losses: rankedSolo ? rankedSolo.losses : "",
            leaguePoints: rankedSolo ? rankedSolo.leaguePoints : "",
          };

          const summonerInfo = {
            ...summoner,
            ...rankedSoloInfo,
          };

          // 유저 puuid 사용해서 matchId list
          const matchIds: AxiosResponse<string[]> = await getMatchIds(summoner.puuid);

          // matchId로 match 데이터 받아온 후 matchArr에 push
          await Promise.all(
            matchIds.data.map(async (matchId: string) => {
              let myIndex: number = 0;
              const match: AxiosResponse<Match> = await getMatchInfo(matchId);

              if (match.data.info.gameMode === "CLASSIC") {
                // 내 index 찾기
                for (let i = 0; i < match.data.info.participants.length; i++) {
                  if (summoner.puuid === match.data.info.participants[i].puuid) {
                    myIndex = i;
                    break;
                  }
                }

                // 라인별 승패
                if (match.data.info.participants[myIndex].individualPosition !== "Invalid") {
                  if (match.data.info.participants[myIndex].win) {
                    lineWinOrLose[match.data.info.participants[myIndex].individualPosition].win++;
                  } else {
                    lineWinOrLose[match.data.info.participants[myIndex].individualPosition].lose++;
                  }
                  lineWinOrLose[match.data.info.participants[myIndex].individualPosition].total++;
                }

                const appendValues = {
                  gameCreation: match.data.info.gameCreation,
                  gameEndTimestamp: match.data.info.gameEndTimestamp,
                  individualPosition: match.data.info.participants[myIndex].individualPosition,
                  championName: match.data.info.participants[myIndex].championName,
                  kills: match.data.info.participants[myIndex].kills,
                  deaths: match.data.info.participants[myIndex].deaths,
                  assists: match.data.info.participants[myIndex].assists,
                  win: match.data.info.participants[myIndex].win,
                };

                matchArr.push({ ...appendValues });
              }
            })
          );
          // gameCreation기준 내림차순 정렬
          matchArr.sort((a, b) => b.gameCreation - a.gameCreation);

          const [[mostLine]] = Object.entries(lineWinOrLose).sort((a, b) => {
            const [ALine, AWinLose]: any = Object.entries(a);
            const [BLine, BWinLose]: any = Object.entries(b);

            return BWinLose[1].total - AWinLose[1].total;
          });

          userInfo.push({ summonerInfo, mostLine, matchArr });
        })
      );

      return resFunc({ res, data: userInfo });
    } catch (err) {
      return resFunc({ res, err });
    }
  },
  async summonerMatchList(req: Request, res: Response) {
    try {
      const puuid = req.query.puuid as string;
      let matchArr: any[] = [];
      let jandi: Jandi[] = [];
      let lineWinOrLose: any = {
        TOP: {
          win: 0,
          lose: 0,
        },
        JUNGLE: {
          win: 0,
          lose: 0,
        },
        MIDDLE: {
          win: 0,
          lose: 0,
        },
        BOTTOM: {
          win: 0,
          lose: 0,
        },
        UTILITY: {
          win: 0,
          lose: 0,
        },
      };

      // 유저 puuid 사용해서 matchId list
      const matchIds: AxiosResponse<string[]> = await getMatchIds(puuid);

      for (let i = 19; i >= 0; i--) {
        const date = moment().subtract(i, "days").format("YYYY-MM-DD");
        jandi.push({ date, win: 0, lose: 0, count: 0 });
      }

      // matchId로 match 데이터 받아온 후 matchArr에 push
      await Promise.all(
        matchIds.data.map(async (matchId: string) => {
          const players: any[] = [];
          let enemyIndex: number = 0;
          let myIndex: number = 0;
          const match: AxiosResponse<Match> = await getMatchInfo(matchId);

          if (match.data.info.gameMode === "CLASSIC") {
            // 내 index 찾기
            for (let i = 0; i < match.data.info.participants.length; i++) {
              if (puuid === match.data.info.participants[i].puuid) {
                myIndex = i;
                break;
              }
            }

            // 상대 index 찾기
            for (let i = 0; i < match.data.info.participants.length; i++) {
              if (
                match.data.info.participants[myIndex].individualPosition ===
                match.data.info.participants[i].individualPosition
              ) {
                if (myIndex === i) {
                  continue;
                }
                enemyIndex = i;
                break;
              }
            }

            // 일별 승패
            if (
              moment(match.data.info.gameCreation).format("YYYY-MM-DD") >=
              moment().subtract(19, "days").format("YYYY-MM-DD")
            ) {
              jandi.filter((date) => {
                if (date.date === moment(match.data.info.gameCreation).format("YYYY-MM-DD")) {
                  return {
                    ...date,
                    win: match.data.info.participants[myIndex].win && date.win++,
                    lose: match.data.info.participants[myIndex].win === false && date.lose++,
                    count: date.count++,
                  };
                }
              });
            }

            // 라인별 승패
            if (match.data.info.participants[myIndex].individualPosition !== "Invalid") {
              if (match.data.info.participants[myIndex].win) {
                lineWinOrLose[match.data.info.participants[myIndex].individualPosition].win++;
              } else {
                lineWinOrLose[match.data.info.participants[myIndex].individualPosition].lose++;
              }
            }

            const player = {
              summonerName: match.data.info.participants[myIndex].summonerName,
              championName: match.data.info.participants[myIndex].championName,
              champLevel: match.data.info.participants[myIndex].champLevel,
              kills: match.data.info.participants[myIndex].kills,
              deaths: match.data.info.participants[myIndex].deaths,
              assists: match.data.info.participants[myIndex].assists,
              cs:
                match.data.info.participants[myIndex].totalMinionsKilled +
                match.data.info.participants[myIndex].neutralMinionsKilled,
              items: [
                match.data.info.participants[myIndex].item0,
                match.data.info.participants[myIndex].item1,
                match.data.info.participants[myIndex].item2,
                match.data.info.participants[myIndex].item6,
                match.data.info.participants[myIndex].item3,
                match.data.info.participants[myIndex].item4,
                match.data.info.participants[myIndex].item5,
              ],
              spells: [
                changeSpellIdToName(match.data.info.participants[myIndex].summoner1Id),
                changeSpellIdToName(match.data.info.participants[myIndex].summoner2Id),
              ],
              wardsKilled: match.data.info.participants[myIndex].wardsKilled,
              wardsPlaced: match.data.info.participants[myIndex].wardsPlaced,
              detectorWardsPlaced: match.data.info.participants[myIndex].detectorWardsPlaced,
            };

            const enemy = {
              championName: match.data.info.participants[enemyIndex].championName,
              kills: match.data.info.participants[enemyIndex].kills,
              wardsKilled: match.data.info.participants[enemyIndex].wardsKilled,
              wardsPlaced: match.data.info.participants[enemyIndex].wardsPlaced,
              detectorWardsPlaced: match.data.info.participants[enemyIndex].detectorWardsPlaced,
            };

            for (let i = 0; i < match.data.info.participants.length; i++) {
              players.push({
                summonerName: match.data.info.participants[i].summonerName,
                championName: match.data.info.participants[i].championName,
              });
            }

            const appendValues = {
              gameCreation: match.data.info.gameCreation,
              gameId: match.data.info.gameId,
              gameEndTimestamp: match.data.info.gameEndTimestamp ? match.data.info.gameEndTimestamp : null,
              gameDuration: match.data.info.gameDuration,
              gameMode: changeQueueIdToName(match.data.info.queueId),
              player,
              enemy,
              players,
              win: match.data.info.participants[myIndex].win,
              myIndex,
              enemyIndex,
              detail: null,
            };

            matchArr.push({ ...appendValues });
          }
        })
      );
      // gameCreation기준 내림차순 정렬
      matchArr.sort((a, b) => b.gameCreation - a.gameCreation);

      const responseObj = {
        matchArr,
        jandi,
        lineWinOrLose,
      };

      return resFunc({ res, data: responseObj });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
  async spectatorInfo(req: Request, res: Response) {
    try {
      const encryptedSummonerId = req.query.encryptedSummonerId as string;

      const players: any[] = [];
      const bannedChampions: any[] = [];

      const { data: spectator }: AxiosResponse<ISpectator> = await loadSpectatorInfo(encryptedSummonerId);

      for (let i = 0; i < spectator.participants.length; i++) {
        const appendValues = {
          ...spectator.participants[i],
          championName: changeChampionIdToName(spectator.participants[i].championId),
          spells: [
            changeSpellIdToName(spectator.participants[i].spell1Id),
            changeSpellIdToName(spectator.participants[i].spell2Id),
          ],
          idx: i,
        };
        console.log(appendValues.summonerName);

        players.push(appendValues);
      }

      for (let i = 0; i < spectator.bannedChampions.length; i++) {
        const appendValues = {
          ...spectator.bannedChampions[i],
          championName: changeChampionIdToName(spectator.bannedChampions[i].championId),
        };
        bannedChampions.push(appendValues);
      }

      const responseObj = {
        gmaeId: spectator.gameId,
        gameMode: spectator.gameMode,
        gameStartTime: spectator.gameStartTime,
        players,
        bannedChampions,
      };

      return resFunc({ res, data: responseObj });
    } catch (err) {
      return resFunc({ res, err });
    }
  },
  async matchInfo(req: Request, res: Response) {
    try {
      const gameId = parseInt(req.query.gameId as string);
      const playerIndex = parseInt(req.query.player as string) + 1;
      const enemyIndex = parseInt(req.query.enemy as string) + 1;
      const timeLineArr = [];

      const { data }: AxiosResponse<MatchTimeLine> = await getMatchTimeLine(`KR_${gameId}`);

      for (let i = 0; i < data.info.frames.length; i++) {
        timeLineArr.push({
          player: {
            ...data.info.frames[i].participantFrames[playerIndex],
            totalCs:
              data.info.frames[i].participantFrames[playerIndex].jungleMinionsKilled +
              data.info.frames[i].participantFrames[playerIndex].minionsKilled,
          },
          enemy: {
            ...data.info.frames[i].participantFrames[enemyIndex],
            totalCs:
              data.info.frames[i].participantFrames[enemyIndex].jungleMinionsKilled +
              data.info.frames[i].participantFrames[enemyIndex].minionsKilled,
          },
        });
      }

      const responseObj = {
        gameId: data.info.gameId,
        timeLine: timeLineArr,
        player: {
          totalCs: timeLineArr[timeLineArr.length - 1].player.totalCs,
          totalGold: data.info.frames[data.info.frames.length - 1].participantFrames[playerIndex].totalGold,
          totalDamageTaken:
            data.info.frames[data.info.frames.length - 1].participantFrames[playerIndex].damageStats.totalDamageTaken,
          totalDamageDoneToChampions:
            data.info.frames[data.info.frames.length - 1].participantFrames[playerIndex].damageStats
              .totalDamageDoneToChampions,
        },
        enemy: {
          totalCs: timeLineArr[timeLineArr.length - 1].enemy.totalCs,
          totalGold: data.info.frames[data.info.frames.length - 1].participantFrames[enemyIndex].totalGold,
          totalDamageTaken:
            data.info.frames[data.info.frames.length - 1].participantFrames[enemyIndex].damageStats.totalDamageTaken,
          totalDamageDoneToChampions:
            data.info.frames[data.info.frames.length - 1].participantFrames[enemyIndex].damageStats
              .totalDamageDoneToChampions,
        },
      };

      return resFunc({ res, data: responseObj });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
};
