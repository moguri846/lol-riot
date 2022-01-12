import { Router, Request, Response, response } from "express";
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
              match.data.info.participants[myIndex].item6,
              match.data.info.participants[myIndex].item3,
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

/**
 * @swagger
 * /api/riot/matchInfo:
 *   post:
 *     tags:
 *       - Summoner
 *     summary: 게임 정보 가져옴
 *     description: 게임 정보 가져옴
 *     parameters:
 *       - in: formData
 *         name: matchId
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
router.post("/matchInfo", async (req: Request, res: Response) => {
  // TODO: 모든 코드 리팩토링
  try {
    let redTeamPlayers: any[] = []; // 5537285094
    let blueTeamPlayers: any[] = [];
    let redTeamStatus: any = {
      totalGold: 0,
      totalKills: 0,
    };
    let blueTeamStatus: any = {
      totalGold: 0,
      totalKills: 0,
    };
    const { data }: AxiosResponse<Match> = await getMatchInfo(`KR_${req.body.matchId}`);

    // 팀 나누기
    for (let i = 0; i < data.info.participants.length; i++) {
      let appendValues: any = {
        puuid: data.info.participants[i].puuid,
        summonerName: data.info.participants[i].summonerName,
        championName: data.info.participants[i].championName,
        kills: data.info.participants[i].kills,
        deaths: data.info.participants[i].deaths,
        assists: data.info.participants[i].assists,
        champLevel: data.info.participants[i].champLevel,
        cs: data.info.participants[i].totalMinionsKilled + data.info.participants[i].neutralMinionsKilled,
        items: [
          data.info.participants[i].item0,
          data.info.participants[i].item1,
          data.info.participants[i].item2,
          data.info.participants[i].item6,
          data.info.participants[i].item3,
          data.info.participants[i].item4,
          data.info.participants[i].item5,
        ],
        wardsPlaced: data.info.participants[i].wardsPlaced,
        wardsKilled: data.info.participants[i].wardsKilled,
        goldEarned: data.info.participants[i].goldEarned,
      };

      if (i < 5) {
        blueTeamPlayers.push(appendValues);
        blueTeamStatus["totalGold"] = blueTeamStatus.totalGold + appendValues.goldEarned;
        blueTeamStatus["totalKills"] = blueTeamStatus.totalKills + appendValues.kills;
      } else {
        redTeamPlayers.push(appendValues);
        redTeamStatus["totalGold"] = redTeamStatus.totalGold + appendValues.goldEarned;
        redTeamStatus["totalKills"] = redTeamStatus.totalKills + appendValues.kills;
      }
    }

    let responseObj = {
      redTeamPlayers,
      redTeamStatus: { ...redTeamStatus, ...data.info.teams[1] },
      blueTeamPlayers,
      blueTeamStatus: { ...blueTeamStatus, ...data.info.teams[0] },
    };

    res.json({ success: true, match: responseObj });
  } catch (err: any) {
    const status = err?.response?.status;

    res.status(status ? status : 500).json({ success: false });
  }
});

export default router;
