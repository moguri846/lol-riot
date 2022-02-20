import { Router, Request, Response } from "express";
import { AxiosResponse } from "axios";
import moment from "moment";
import { getSummonerInfo, getMatchIds, getMatchInfo, getSummonerDetailInfo, getMatchTimeLine } from "../API/riot";
import { Match, Summoner, Jandi, SummonerDetailInfo, MatchTimeLine } from "./interface/riot.interface";
import { resFunc } from "../common/ResSuccessOrFalse.function";
import { MATCH_SUMMARY, COMPARING_WITH_ENEMY } from "./constant/riot.constant";
import { changeSpellIdToName } from "./func/riot.func";
const router = Router();

/**
 * @swagger
 * /api/riot/searchSummoner:
 *   get:
 *     tags:
 *       - Summoner
 *     summary: 유저 게임 리스트 가져옴
 *     description: 유저 게임 리스트 가져옴
 *     parameters:
 *       - in: query
 *         name: summonerName
 *         required: true
 *         type: string
 *       - in: query
 *         name: type
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 유저 게임 리스트 가져오기 성공
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             match:
 *               // FIXME: array가 안됨
 *               type: object
 *       '403':
 *         description: api key 만료
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             err:
 *               type: object
 *       '500':
 *         description: 유저 게임 리스트 가져오기 실패
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             err:
 *               type: object
 */
router.get("/summonerInfo", async (req: Request, res: Response) => {
  try {
    const summonerName = req.query.summonerName as string;

    // 유저 검색
    const summoner: AxiosResponse<Summoner> = await getSummonerInfo(summonerName);

    // 유저 디테일 정보
    const summonerDetailInfo: AxiosResponse<SummonerDetailInfo[] | []> = await getSummonerDetailInfo(summoner.data.id);

    const responseObj = {
      ...summoner.data,
      ...summonerDetailInfo.data.filter((summonerDetail) => summonerDetail.queueType === "RANKED_SOLO_5x5")[0],
    };

    resFunc({ res, status: 200, success: true, data: responseObj });
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?.data.status.message || err.message;
    console.log("err", err.response);

    resFunc({ res, status, success: false, errMessage: message || "서버 에러" });
  }
});

router.get("/summonerMatchList", async (req: Request, res: Response) => {
  try {
    const puuid = req.query.puuid as string;
    let matchArr: any[] = [];
    let jandi: Jandi[] = [];
    let line = {
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
        let myIndex: number = 0;
        const match: AxiosResponse<Match> = await getMatchInfo(matchId);

        // 내 index 찾기
        for (let i = 0; i < match.data.info.participants.length; i++) {
          if (puuid === match.data.info.participants[i].puuid) {
            myIndex = i;
            break;
          }
        }

        if (match.data.info.gameMode === "CLASSIC") {
          const initialValue = {
            summonerName: "",
            physicalDamageDealtToChampions: 0,
            totalDamageDealt: 0,
            goldEarned: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            championName: "",
            champLevel: 0,
            cs: 0,
            items: [0, 0, 0, 0, 0, 0],
            spells: ["", ""],
            index: 0,
          };

          let player = initialValue;
          let enemy = initialValue;
          if (
            moment(match.data.info.gameCreation).format("YYYY-MM-DD") >=
            moment().subtract(19, "days").format("YYYY-MM-DD")
          ) {
            jandi.filter((date) => {
              if (date.date === moment(match.data.info.gameCreation).format("YYYY-MM-DD")) {
                return {
                  ...date,
                  win: match.data.info.participants[myIndex].win ? date.win++ : date.win,
                  lose: match.data.info.participants[myIndex].win === false ? date.lose++ : date.lose,
                  count: date.count++,
                };
              }
            });
          }

          if (match.data.info.participants[myIndex].win) {
            line[match.data.info.participants[myIndex].individualPosition].win++;
          } else if (!match.data.info.participants[myIndex].win) {
            line[match.data.info.participants[myIndex].individualPosition].lose++;
          }
          for (let i = 0; i < match.data.info.participants.length; i++) {
            if (
              match.data.info.participants[myIndex].individualPosition ===
              match.data.info.participants[i].individualPosition
            ) {
              if (myIndex === i) {
                continue;
              }

              player = {
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
                physicalDamageDealtToChampions: match.data.info.participants[myIndex].physicalDamageDealtToChampions,
                totalDamageDealt: match.data.info.participants[myIndex].totalDamageDealt,
                goldEarned: match.data.info.participants[myIndex].goldEarned,
                index: myIndex,
              };

              enemy = {
                summonerName: match.data.info.participants[i].summonerName,
                championName: match.data.info.participants[i].championName,
                champLevel: match.data.info.participants[i].champLevel,
                kills: match.data.info.participants[i].kills,
                deaths: match.data.info.participants[i].deaths,
                assists: match.data.info.participants[i].assists,
                cs:
                  match.data.info.participants[i].totalMinionsKilled +
                  match.data.info.participants[i].neutralMinionsKilled,
                items: [
                  match.data.info.participants[i].item0,
                  match.data.info.participants[i].item1,
                  match.data.info.participants[i].item2,
                  match.data.info.participants[i].item6,
                  match.data.info.participants[i].item3,
                  match.data.info.participants[i].item4,
                  match.data.info.participants[i].item5,
                ],
                spells: [
                  changeSpellIdToName(match.data.info.participants[i].summoner1Id),
                  changeSpellIdToName(match.data.info.participants[i].summoner2Id),
                ],
                physicalDamageDealtToChampions: match.data.info.participants[i].physicalDamageDealtToChampions,
                totalDamageDealt: match.data.info.participants[i].totalDamageDealt,
                goldEarned: match.data.info.participants[i].goldEarned,
                index: i,
              };
              break;
            }
          }

          const appendValues = {
            gameCreation: match.data.info.gameCreation,
            gameId: match.data.info.gameId,
            gameEndTimestamp: match.data.info.gameEndTimestamp ? match.data.info.gameEndTimestamp : null,
            gameDuration: match.data.info.gameDuration,
            gameMode: match.data.info.gameMode,
            player,
            enemy,
            win: match.data.info.participants[myIndex].win,
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
      line,
    };

    resFunc({ res, status: 200, success: true, data: responseObj });
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?.data.status.message || err.message;

    resFunc({ res, status, success: false, errMessage: message || "서버 에러" });
  }
});

/**
 * @swagger
 * /api/riot/matchInfo:
 *   get:
 *     tags:
 *       - Summoner
 *     summary: 게임 정보 가져옴
 *     description: 게임 정보 가져옴
 *     parameters:
 *       - in: query
 *         name: gameId
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 게임 정보 가져오기 성공
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             match:
 *               // FIXME: array가 안됨
 *               type: object
 *       '403':
 *         description: api key 만료
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             err:
 *               type: object
 *       '500':
 *         description: 게임 정보 가져오기 실패
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             err:
 *               type: object
 */
router.get("/matchInfo", async (req: Request, res: Response) => {
  try {
    const gameId = parseInt(req.query.gameId as string);
    const playerIndex = parseInt(req.query.player as string) + 1;
    const enemyIndex = parseInt(req.query.enemy as string) + 1;
    const timeLineArr = [];

    const { data }: AxiosResponse<MatchTimeLine> = await getMatchTimeLine(`KR_${gameId}`);

    for (let i = 0; i < data.info.frames.length; i++) {
      timeLineArr.push({
        player: data.info.frames[i].participantFrames[playerIndex],
        enemy: data.info.frames[i].participantFrames[enemyIndex],
      });
    }

    const responseObj = {
      gameId: data.info.gameId,
      timeLine: timeLineArr,
    };

    resFunc({ res, status: 200, success: true, data: responseObj });
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?.data.status.message;

    resFunc({ res, status, success: false, errMessage: message || "서버 에러" });
  }
});

export default router;
