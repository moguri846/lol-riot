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
import { ISummoner } from "../../toolkit/riot/gameInfoSlice/interface/summoner.interface";

interface IProps {
  summoner: ISummoner;
}

const Name = ({ summoner }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);
  const { jandi, lineWinOrLose, matchArr } = useAppSelector(selectGameInfo);

  useEffect(() => {
    (async () => {
      dispatch(loadingAction({ gameInfo: true }));

      await dispatch(gameInfoAction(summoner.puuid));

      dispatch(loadingAction({ gameInfo: false }));
    })();
  }, []);

  const { snackbar } = useSnackBar();

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = async () => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
    }

    try {
      dispatch(loadingAction({ spectator: true }));

      await dispatch(spectatorInfo(summoner.id));

      dispatch(loadingAction({ spectator: false }));
    } catch (err: any) {
      dispatch(loadingAction({ spectator: false }));

      snackbar(err, "error");
    }
  };

  return (
    <>
      <Seo title={summoner.name} />
      <SummonerInfo
        summoner={summoner}
        spectatorToggle={spectatorToggle}
        onSpectatorToggle={handleSpectatorToggle}
        searchSummoner
      />
      {spectatorToggle ? (
        // <Spectator
        // loading={loading.spectator}
        // spectator={spectator}
        // summonerName={summoner.name}
        // fail={fail.spectator.status ? fail.spectator : null}
        // />
        <div>Spectator</div>
      ) : (
        <>
          {/* <SummonerGameAnalysis
            loading={loading.gameInfo}
            jandi={gameInfo.jandi}
            lineWinOrLose={gameInfo.lineWinOrLose}
          /> */}
          <SummonerMatchList loading={loading.gameInfo} matchSummary={matchArr} />
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
