import { Router, Request, Response } from "express";
import { AxiosResponse } from "axios";
import { getSummonerInfo, getMatchIds, getMatchInfo } from "../API/riot";
import { Match, Summoner } from "./interface/riot.interface";
const router = Router();

router.post("/searchSummoner", async (req: Request, res: Response) => {
  try {
    let matchArr: any[] = [];
    let myIndex = 0;

    // 유저 검색
    const summoner: AxiosResponse<Summoner> = await getSummonerInfo(req.body.d);

    // 유저 puuid 사용해서 matchId list
    const matchIds: AxiosResponse<string[]> = await getMatchIds(summoner.data.puuid);

    // matchId로 match 데이터 받아온 후 matchArr에 push
    await Promise.all(
      matchIds.data.map(async (matchId: string) => {
        const match: AxiosResponse<Match> = await getMatchInfo(matchId);

        // 내 index 확인
        for (let i = 0; i < match.data.info.participants.length; i++) {
          if (req.body.d.toLowerCase() === match.data.info.participants[i].summonerName.toLowerCase()) {
            myIndex = i;
            break;
          }
        }

        matchArr.push({ ...match.data, myIndex });
      })
    );

    // gameCreation기준 내림차순 정렬
    matchArr.sort((a, b) => b.info.gameCreation - a.info.gameCreation);

    res.json({ success: true, summoner: matchArr });
  } catch (err: any) {
    const status = err?.response?.status;
    res.status(status ? status : 500).json({ success: false });
  }
});

export default router;
