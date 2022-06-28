import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spectator from "../../components/Organisms/Spectator/Spectator";
import SummonerInfo from "../../components/Organisms/SummonerInfo/SummonerInfo";
import Seo from "../../components/Seo/Seo";
import GameInfo from "../../components/Organisms/GameInfo/GameInfo";
import WithAuth from "../../hoc";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loadingAction, selectLoading } from "../../toolkit/loading/loadingSlice";
import { gameInfoAction } from "../../toolkit/riot/gameInfoSlice/func/gameInfoSlice.func";
import { summonerInfoAction } from "../../toolkit/riot/summonerInfoSlice/func/summonerSlice.func";
import { ISummoner } from "../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";

interface IProps {
  summonerName: string;
}

const Summoner = ({ summonerName }: IProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      dispatch(loadingAction({ summonerInfo: true, gameInfo: true }));

      const {
        payload: { puuid },
      } = (await dispatch(summonerInfoAction(summonerName))) as { payload: ISummoner };

      dispatch(loadingAction({ summonerInfo: false }));

      if (puuid) {
        await dispatch(gameInfoAction(puuid));
      }
      dispatch(loadingAction({ gameInfo: false }));
    })();
  }, [summonerName]);

  const router = useRouter();

  const { summonerInfo, gameInfo } = useAppSelector(selectLoading);

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = () => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
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
        loading={summonerInfo}
        spectatorToggle={spectatorToggle}
        onSpectatorToggle={handleSpectatorToggle}
      />
      <>{spectatorToggle ? <Spectator summonerName={summonerName} /> : <GameInfo loading={gameInfo} />}</>
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
