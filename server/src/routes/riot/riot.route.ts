import { Router } from "express";
const router = Router();
import controller from "../../controllers/riot/riot.controller";

/**
 * @swagger
 * /api/riot/summonerInfo:
 *   get:
 *     tags:
 *       - Summoner
 *     summary: 유저 정보 가져옴
 *     description: 유저 정보 가져옴
 *     parameters:
 *       - in: query
 *         name: summonerName
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 유저 정보 가져오기 성공
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               properties:
 *                 accountId:
 *                   type: string
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 profileIconId:
 *                   type: integer
 *                 puuid:
 *                   type: string
 *                 summonerLevel:
 *                   type: integer
 *                 queueType:
 *                   type: string
 *                 tier:
 *                   type: string
 *                 rank:
 *                   type: string
 *                 leaguePoints:
 *                   type: integer
 *                 wins:
 *                   type: integer
 *                 losses:
 *                   type: integer
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
router.get("/summonerInfo", controller.summonerInfo);

/**
 * @swagger
 * /api/riot/multiSearch:
 *   get:
 *     tags:
 *       - Summoner
 *     summary: 유저 정보 가져옴
 *     description: 유저 정보 가져옴
 *     parameters:
 *       - in: query
 *         name: summonerNames
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 유저 정보 가져오기 성공
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   summonerInfo:
 *                     type: object
 *                     properties:
 *                       accountId:
 *                         type: string
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       profileIconId:
 *                         type: integer
 *                       puuid:
 *                         type: string
 *                       summonerLevel:
 *                         type: integer
 *                       queueType:
 *                         type: string
 *                       tier:
 *                         type: string
 *                       rank:
 *                         type: string
 *                       leaguePoints:
 *                         type: integer
 *                       wins:
 *                         type: integer
 *                       losses:
 *                         type: integer
 *                   lineWinOrLose:
 *                     type: object
 *                     properties:
 *                       TOP:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       JUNGLE:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       MIDDLE:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       BOTTOM:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       UTILITY:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                   matchArr:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         gameCreation:
 *                           type: integer
 *                         win:
 *                           type: boolean
 *                         championName:
 *                           type: string
 *                         kills:
 *                           type: integer
 *                         deaths:
 *                           type: integer
 *                         assists:
 *                           type: integer
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
router.get("/multiSearch", controller.multiSearch);

/**
 * @swagger
 * /api/riot/summonerMatchList:
 *   get:
 *     tags:
 *       - Summoner
 *     summary: 유저 게임 정보 가져옴
 *     description: 유저 게임 정보 가져옴
 *     parameters:
 *       - in: query
 *         name: summonerName
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 유저 게임 정보 가져오기 성공
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               properties:
 *                 jandi:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       win:
 *                         type: integer
 *                       lose:
 *                         type: integer
 *                       count:
 *                         type: integer
 *                 lineWinOrLose:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       TOP:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       JUNGLE:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       MIDDLE:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       BOTTOM:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                       UTILITY:
 *                         type: object
 *                         properties:
 *                           win:
 *                             type: integer
 *                           lose:
 *                             type: integer
 *                 matchArr:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       gameCreation:
 *                         type: integer
 *                       gameId:
 *                         type: integer
 *                       gameEndTimestamp:
 *                         type: integer
 *                       gameDuration:
 *                         type: integer
 *                       gameMode:
 *                         type: string
 *                       player:
 *                         type: object
 *                         properties:
 *                           summonerName:
 *                             type: string
 *                           championName:
 *                             type: string
 *                           champLevel:
 *                             type: integer
 *                           kills:
 *                             type: integer
 *                           deaths:
 *                             type: integer
 *                           assists:
 *                             type: integer
 *                           cs:
 *                             type: integer
 *                           items:
 *                             type: array
 *                             items:
 *                               type: integer
 *                           spells:
 *                             type: array
 *                             items:
 *                               type: string
 *                           wardsKilled:
 *                             type: integer
 *                           wardsPlaced:
 *                             type: integer
 *                           detectorWardsPlaced:
 *                             type: integer
 *                       enemy:
 *                         type: object
 *                         properties:
 *                           championName:
 *                             type: string
 *                           kills:
 *                             type: integer
 *                           wardsKilled:
 *                             type: integer
 *                           wardsPlaced:
 *                              type: integer
 *                           detectorWardsPlaced:
 *                              type: integer
 *                       players:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             summonerName:
 *                               type: string
 *                             championName:
 *                               type: string
 *                       win:
 *                         type: integer
 *                       myIndex:
 *                         type: integer
 *                       enemyIndex:
 *                         type: integer
 *                       detail:
 *                         type: object
 *                         nullable: true
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
router.get("/summonerMatchList", controller.summonerMatchList);

router.get("/spectatorInfo", controller.spectatorInfo);

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
 *             data:
 *               type: object
 *               properties:
 *                 gameId:
 *                   type: integer
 *                 player:
 *                   type: object
 *                   properties:
 *                     totalCs:
 *                       type: integer
 *                     totalDamageDoneToChampions:
 *                       type: integer
 *                     totalDamageTaken:
 *                       type: integer
 *                     totalGold:
 *                       type: integer
 *                 enemy:
 *                   type: object
 *                   properties:
 *                     totalCs:
 *                       type: integer
 *                     totalDamageDoneToChampions:
 *                       type: integer
 *                     totalDamageTaken:
 *                       type: integer
 *                     totalGold:
 *                       type: integer
 *                 timeLine:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       player:
 *                         type: object
 *                         properties:
 *                           totalGold:
 *                             type: integer
 *                           totalCs:
 *                             type: integer
 *                           xp:
 *                             type: integer
 *                       enemy:
 *                         type: object
 *                         properties:
 *                           totalGold:
 *                             type: integer
 *                           totalCs:
 *                             type: integer
 *                           xp:
 *                             type: integer
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
router.get("/matchInfo", controller.matchInfo);

export default router;
