import React from "react";
import MultiSearch from "../../components/Organisms/MultiSearch/MultiSearch";
import WithAuth from "../../hoc";
import Seo from "../../components/Seo/Seo";
import { useRouter } from "next/router";

interface IProps {
  summonerNames: string[];
}

const MultiSearchPage = ({ summonerNames }: IProps) => {
  const router = useRouter();

  return (
    <>
      <Seo
        title="멀티서치"
        socialtitle="멀티서치"
        socialDesc={`${summonerNames} - 멀티서치`}
        socialUrl={`${router.asPath}`}
      />
      <MultiSearch summonerNames={summonerNames} />
    </>
  );
};

export default WithAuth(MultiSearchPage, null);

export const getServerSideProps = async ({ query }) => {
  const { names } = query;

  const summonerNames = names.includes(".")
    ? names
        .split(".")
        .map((s) => {
          const [name] = s.split("님");

          return name.trim();
        })
        .slice(0, -1)
    : names.split(",");

  return {
    props: {
      summonerNames,
    },
  };
};
