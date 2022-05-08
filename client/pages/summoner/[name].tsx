import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMatchInfo, loadSummonerInfo } from "../../API/riot";
import Spectator from "../../components/Organisms/Spectator/Spectator";
import SummonerGameAnalysis from "../../components/Organisms/SummonerGameAnalysis/SummonerGameAnalysis";
import SummonerInfo from "../../components/Organisms/SummonerInfo/SummonerInfo";
import SummonerMatchList from "../../components/Organisms/SummonerMatchList/SummonerMatchList";
import useSnackBar from "../../hooks/useSnackBar";
import { removeFailAction } from "../../redux/actions/common/failActions";
import { FULFILLED, LOADING } from "../../redux/actions/loading/constant/loading.constant";
import { ILoadingStatusParameter, LoadingStatusType } from "../../redux/actions/loading/interface/loading.interface";
import { loadingAction } from "../../redux/actions/loading/loadingActions";
import { matchInfo, spectatorInfo } from "../../redux/actions/riot/riotActions";
import { RootReducerType } from "../../redux/reducers/rootReducer";

const Name = ({ summoner }) => {
  const { jandi, lineWinOrLose, spectator, matchSummary, fail } = useSelector((state: RootReducerType) => state.riot);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(loadingAction(FULFILLED, { gameInfo: true }));
      await dispatch(matchInfo(summoner.puuid));
      dispatch(loadingAction(FULFILLED, { gameInfo: false }));
    })();
  }, []);

  const loading = useSelector((state: RootReducerType) => state.loading);

  const { snackbar } = useSnackBar();

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = async () => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
    }

    try {
      dispatch(removeFailAction());

      setSatusInfo(LOADING, { spectator: true });

      await getSpectatorInfo(summoner.id);

      setSatusInfo(FULFILLED, { spectator: false });
    } catch (err: any) {
      setSatusInfo(FULFILLED, { spectator: false });

      snackbar(err, "error");
    }
  };

  const setSatusInfo = (type: LoadingStatusType, status: ILoadingStatusParameter) => {
    dispatch(loadingAction(type, status));
  };

  const getSpectatorInfo = async (id: string) => {
    try {
      await dispatch(spectatorInfo(id));
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Head>
        <title>{summoner.name} | Search My Name</title>
      </Head>
      <SummonerInfo
        summoner={summoner}
        spectatorToggle={spectatorToggle}
        onSpectatorToggle={handleSpectatorToggle}
        searchSummoner
      />
      {spectatorToggle ? (
        <Spectator
          loading={loading.spectator}
          spectator={spectator}
          summonerName={summoner.name}
          fail={fail.spectator.status ? fail.spectator : null}
        />
      ) : (
        <>
          <SummonerGameAnalysis loading={loading.gameInfo} jandi={jandi} lineWinOrLose={lineWinOrLose} />
          <SummonerMatchList loading={loading.gameInfo} matchSummary={matchSummary} />
        </>
      )}
    </>
  );
};

export default Name;

export const getServerSideProps = async ({ query }) => {
  const { name } = query;

  try {
    var {
      data: { data: summoner },
    } = await loadSummonerInfo(name);
  } catch (err) {
    var errMessage = err.message;
    console.log("errMessage");
  }

  return {
    props: {
      summoner,
    },
  };
};
