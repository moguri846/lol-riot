import { useRouter } from "next/router";
import { useState } from "react";
import Spectator from "../../components/Organisms/Spectator/Spectator";
import SummonerInfo from "../../components/Organisms/SummonerInfo/SummonerInfo";
import Seo from "../../components/Seo/Seo";
import useSnackBar from "../../hooks/useSnackBar";
import { loadingAction, selectLoading } from "../../toolkit/loading/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { selectGameInfo } from "../../toolkit/riot/gameInfoSlice/gameInfoSlice";
import { spectatorInfo } from "../../toolkit/riot/spectatorSlice/func/spectatorSlice.func";
import { selectSpectator } from "../../toolkit/riot/spectatorSlice/spectatorSlice";
import GameInfo from "../../components/Organisms/GameInfo/GameInfo";
import WithAuth from "../../hoc";

interface IProps {
  summonerName: string;
}

const Summoner = ({ summonerName }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { snackbar } = useSnackBar();

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = async (id: string) => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
    }

    try {
      dispatch(loadingAction({ spectator: true }));

      await dispatch(spectatorInfo(id));

      dispatch(loadingAction({ spectator: false }));
    } catch (err: any) {
      dispatch(loadingAction({ spectator: false }));

      snackbar(err, "error");
    }
  };

  return (
    <>
      <Seo
        title={summonerName}
        socialtitle={`${summonerName}님의 롤 전적`}
        socialDesc={`${summonerName}님의 롤 전적`}
        socialUrl={`${router.asPath}`}
      />
      <SummonerInfo
        summonerName={summonerName}
        spectatorToggle={spectatorToggle}
        onSpectatorToggle={handleSpectatorToggle}
        searchSummoner
      />
      <>
        {spectatorToggle ? (
          <Spectator loading={loading.spectator} spectator={spectator} summonerName={summonerName} />
        ) : (
          <GameInfo loading={loading.gameInfo} gameInfo={gameInfo} />
        )}
      </>
    </>
  );
};

export default WithAuth(Summoner, null);

export const getServerSideProps = async ({ query }) => {
  const { name } = query;

  return {
    props: {
      summonerName: name,
    },
  };
};
