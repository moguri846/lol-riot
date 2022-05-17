import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loadSummonerInfo } from "../../API/riot";
import Spectator from "../../components/Organisms/Spectator/Spectator";
import SummonerGameAnalysis from "../../components/Organisms/SummonerGameAnalysis/SummonerGameAnalysis";
import SummonerInfo from "../../components/Organisms/SummonerInfo/SummonerInfo";
import SummonerMatchList from "../../components/Organisms/SummonerMatchList/SummonerMatchList";
import Seo from "../../components/Seo/Seo";
import useSnackBar from "../../hooks/useSnackBar";
import { loadingAction, selectLoading } from "../../toolkit/loading/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { selectGameInfo } from "../../toolkit/riot/gameInfoSlice/gameInfoSlice";
import { gameInfoAction } from "../../toolkit/riot/gameInfoSlice/func/gameInfoSlice.func";
import { spectatorInfo } from "../../toolkit/riot/spectatorSlice/func/spectatorSlice.func";
import { selectSpectator } from "../../toolkit/riot/spectatorSlice/spectatorSlice";
import { summonerInfoAction } from "../../toolkit/riot/summonerInfoSlice/func/summonerSlice.func";
import { selectSummonerInfo } from "../../toolkit/riot/summonerInfoSlice/summonerInfoSlice";
import GameInfo from "../../components/Organisms/GameInfo/GameInfo";
import { match } from "assert";

interface IProps {
  summonerName: string;
}

const Name = ({ summonerName }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const summonerInfo = useAppSelector(selectSummonerInfo);
  const spectator = useAppSelector(selectSpectator);
  const gameInfo = useAppSelector(selectGameInfo);

  useEffect(() => {
    (async () => {
      dispatch(loadingAction({ summonerInfo: true }));

      const {
        payload: { puuid },
      } = await dispatch(summonerInfoAction(summonerName));

      dispatch(loadingAction({ summonerInfo: false }));

      dispatch(loadingAction({ gameInfo: true }));

      await dispatch(gameInfoAction(puuid));

      dispatch(loadingAction({ gameInfo: false }));
    })();
  }, [summonerName]);

  const { snackbar } = useSnackBar();

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = async () => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
    }

    try {
      dispatch(loadingAction({ spectator: true }));

      await dispatch(spectatorInfo(summonerInfo.id));

      dispatch(loadingAction({ spectator: false }));
    } catch (err: any) {
      dispatch(loadingAction({ spectator: false }));

      snackbar(err, "error");
    }
  };

  return (
    <>
      <Seo title={summonerName} />
      <SummonerInfo
        loading={loading.summonerInfo}
        summoner={summonerInfo}
        spectatorToggle={spectatorToggle}
        onSpectatorToggle={handleSpectatorToggle}
        searchSummoner
      />
      {spectatorToggle ? (
        <Spectator loading={loading.spectator} spectator={spectator} summonerName={summonerName} />
      ) : (
        <GameInfo loading={loading.gameInfo} gameInfo={gameInfo} />
      )}
    </>
  );
};

export default Name;

export const getServerSideProps = async ({ query }) => {
  const { name } = query;

  return {
    props: {
      summonerName: name,
    },
  };
};
