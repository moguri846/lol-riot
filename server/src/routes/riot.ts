import { Router, Request, Response } from "express";
import { AxiosResponse } from "axios";
import { getSummonerInfo, getMatchIds, getMatchInfo } from "../API/riot";
import { Match, Summoner } from "./interface/riot.interface";
const router = Router();

/**
 * @swagger
 * /api/riot/searchSummoner:
 *   post:
 *     tags:
 *       - Summoner
 *     summary: 유저 게임 리스트 가져옴
 *     description: 유저 게임 리스트 가져옴
 *     parameters:
 *       - in: formData
 *         name: summonerName
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: success
 *       '500':
 *         description: fail
 */
router.post("/searchSummoner", async (req: Request, res: Response) => {
  try {
    let matchArr: any[] = [];
    let myIndex = 0;

    // 유저 검색
    const summoner: AxiosResponse<Summoner> = await getSummonerInfo(req.body.summonerName);

    // 유저 puuid 사용해서 matchId list
    const matchIds: AxiosResponse<string[]> = await getMatchIds(summoner.data.puuid);

    // matchId로 match 데이터 받아온 후 matchArr에 push
    await Promise.all(
      matchIds.data.map(async (matchId: string) => {
        let redTeamPlayers: any[] = [];
        let blueTeamPlayers: any[] = [];
        const match: AxiosResponse<Match> = await getMatchInfo(matchId);

        // 내 index 확인
        for (let i = 0; i < match.data.info.participants.length; i++) {
          if (req.body.summonerName.toLowerCase() === match.data.info.participants[i].summonerName.toLowerCase()) {
            myIndex = i;
            break;
          }
        }

        // 팀 나누기
        for (let i = 0; i < match.data.info.participants.length; i++) {
          let appendValues: any = {
            championName: match.data.info.participants[i].championName,
            summonerName: match.data.info.participants[i].summonerName,
            puuid: match.data.info.participants[i].puuid,
          };

          if (i < 5) {
            blueTeamPlayers.push(appendValues);
          } else {
            redTeamPlayers.push(appendValues);
          }
        }

        const appendValues = {
          gameCreation: match.data.info.gameCreation,
          gameEndTimestamp: match.data.info.gameEndTimestamp ? match.data.info.gameEndTimestamp : null,
          gameStartTimestamp: match.data.info.gameStartTimestamp,
          gameId: match.data.info.gameId,
          gameMode: match.data.info.gameMode,
          player: {
            summonerName: match.data.info.participants[myIndex].summonerName,
            championName: match.data.info.participants[myIndex].championName,
            kills: match.data.info.participants[myIndex].kills,
            deaths: match.data.info.participants[myIndex].deaths,
            assists: match.data.info.participants[myIndex].assists,
            champLevel: match.data.info.participants[myIndex].champLevel,
            cs:
              match.data.info.participants[myIndex].totalMinionsKilled +
              match.data.info.participants[myIndex].neutralMinionsKilled,
            items: [
              match.data.info.participants[myIndex].item0,
              match.data.info.participants[myIndex].item1,
              match.data.info.participants[myIndex].item2,
              match.data.info.participants[myIndex].item3,
              match.data.info.participants[myIndex].item6,
              match.data.info.participants[myIndex].item4,
              match.data.info.participants[myIndex].item5,
            ],
            win: match.data.info.participants[myIndex].win,
          },
          redTeamPlayers,
          blueTeamPlayers,
        };

        matchArr.push({ ...appendValues });
      })
    );

    // gameCreation기준 내림차순 정렬
    matchArr.sort((a, b) => b.gameCreation - a.gameCreation);

    res.json({ success: true, summoner: matchArr });
  } catch (err: any) {
    const status = err?.response?.status;

    res.status(status ? status : 500).json({ success: false });
  }
});

export default router;
