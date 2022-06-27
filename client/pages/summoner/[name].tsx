import { useRouter } from "next/router";
import { useState } from "react";
import Spectator from "../../components/Organisms/Spectator/Spectator";
import SummonerInfo from "../../components/Organisms/SummonerInfo/SummonerInfo";
import Seo from "../../components/Seo/Seo";
import GameInfo from "../../components/Organisms/GameInfo/GameInfo";
import WithAuth from "../../hoc";

interface IProps {
  summonerName: string;
}

const Summoner = ({ summonerName }: IProps) => {
  const [id, setId] = useState("");
  const router = useRouter();

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = async (id: string) => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
    }

    setId(id);
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
      />
      <>{spectatorToggle ? <Spectator id={id} summonerName={summonerName} /> : <GameInfo />}</>
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
