import React, { useState } from "react";
import { Jandi } from "../../../_actions/riot/interface/jandi.interface";
import { ILineWinLoseRate } from "../../../_actions/riot/interface/lineWinOrLose.interface";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import { SummonerType } from "../../../_actions/riot/interface/summoner.interface";
import {
  ILoading,
  ILoadingStatusParameter,
  LoadingStatusType,
} from "../../../_actions/loading/interface/loading.interface";
import "react-loading-skeleton/dist/skeleton.css";
import { ISpectator } from "../../../_actions/riot/interface/spectator.interface";
import { useDispatch } from "react-redux";
import { spectatorInfo } from "../../../_actions/riot/riotActions";
import { loadingAction } from "../../../_actions/loading/loadingActions";
import { FULFILLED, LOADING } from "../../../_actions/loading/constant/loading.constant";
import useSnackBar from "../../../hooks/useSnackBar";
import { IRiotFail } from "../../../_actions/riot/interface/fail.interface";
import SummonerInfo from "../../Organisms/SummonerInfo/SummonerInfo";
import Spectator from "../../Organisms/Spectator/Spectator";
import SummonerGameAnalysis from "../../Organisms/SummonerGameAnalysis/SummonerGameAnalysis";
import SummonerMatchList from "../../Organisms/SummonerMatchList/SummonerMatchList";

interface IProps {
  loading: ILoading;
  summoner: SummonerType;
  spectator: ISpectator;
  jandi: Jandi[];
  lineWinOrLose: ILineWinLoseRate[];
  matchSummary: ComparingWithEnemyType[];
  fail: IRiotFail;
}

function SummonerTemplate({ summoner, matchSummary, spectator, jandi, lineWinOrLose, loading, fail }: IProps) {
  const dispatch = useDispatch();

  const { snackbar } = useSnackBar();

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = async () => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
    }

    try {
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
          fail={fail.spectator}
        />
      ) : (
        <>
          <SummonerGameAnalysis loading={loading.gameInfo} jandi={jandi} lineWinOrLose={lineWinOrLose} />
          <SummonerMatchList loading={loading.gameInfo} matchSummary={matchSummary} />
        </>
      )}
    </>
  );
}

export default SummonerTemplate;
