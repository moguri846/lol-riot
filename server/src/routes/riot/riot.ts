import { Router, Request, Response } from "express";
import { AxiosResponse } from "axios";
import moment from "moment";
import {
  getSummonerInfo,
  getMatchIds,
  getMatchInfo,
  getSummonerDetailInfo,
  getMatchTimeLine,
  loadSpectatorInfo,
} from "../../API/riot";
import { Match, Summoner, Jandi, SummonerDetailInfo, MatchTimeLine, ISpectator } from "./interface/riot.interface";
import { resFunc } from "../common/ResSuccessOrFalse.function";
import { MATCH_SUMMARY, COMPARING_WITH_ENEMY } from "./constant/riot.constant";
import { changeChampionIdToName, changeSpellIdToName } from "./function/riot.func";
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

    resFunc({ res, data: responseObj });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

router.get("/summonerMatchList", async (req: Request, res: Response) => {
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
          gameMode: match.data.info.gameMode,
          player,
          enemy,
          players,
          win: match.data.info.participants[myIndex].win,
          myIndex,
          enemyIndex,
          detail: null,
        };

        matchArr.push({ ...appendValues });
      })
    );
    // gameCreation기준 내림차순 정렬
    matchArr.sort((a, b) => b.gameCreation - a.gameCreation);

    const responseObj = {
      matchArr,
      jandi,
      lineWinOrLose,
    };

    resFunc({ res, data: responseObj });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

router.get("/spectatorInfo", async (req: Request, res: Response) => {
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
      t: spectator.participants,
      bannedChampions,
    };

    resFunc({ res, data: responseObj });
  } catch (err) {
    resFunc({ res, err });
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

    resFunc({ res, data: responseObj });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

export default router;
