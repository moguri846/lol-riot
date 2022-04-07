import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../_reducers/rootReducer";
import Template from "../../components/Templates/MainTemplate/MainTemplate";
import { FULFILLED, LOADING } from "../../_actions/loading/constant/loading.constant";
import { removeFailAction } from "../../_actions/common/failActions";
import useSnackBar from "../../hooks/useSnackBar";
import { ILoadingStatusParameter, LoadingStatusType } from "../../_actions/loading/interface/loading.interface";
import { loadingAction } from "../../_actions/loading/loadingActions";
import { spectatorInfo } from "../../_actions/riot/riotActions";
import SummonerInfo from "../../components/Organisms/SummonerInfo/SummonerInfo";
import Spectator from "../../components/Organisms/Spectator/Spectator";
import SummonerGameAnalysis from "../../components/Organisms/SummonerGameAnalysis/SummonerGameAnalysis";
import SummonerMatchList from "../../components/Organisms/SummonerMatchList/SummonerMatchList";
import "react-loading-skeleton/dist/skeleton.css";

const SummonerPage = () => {
  const { summoner, jandi, lineWinOrLose, spectator, matchSummary, fail } = useSelector(
    (state: RootReducerType) => state.riot
  );

  const loading = useSelector((state: RootReducerType) => state.loading);

  const dispatch = useDispatch();

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

  const Content = (
    <>
      <SummonerInfo
        loading={loading.summoner}
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

  return (
    <>
      <Template Content={Content} />
    </>
  );
};

export default SummonerPage;
