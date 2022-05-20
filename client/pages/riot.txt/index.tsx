import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Riot = () => {
  const router = useRouter();

  useEffect(() => {
    (() => {
      router.push("http://localhost:3000/assets/riot.txt");
    })();
  }, []);

  return <></>;
};

export default Riot;
