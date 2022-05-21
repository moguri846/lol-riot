import axios from "axios";
import React, { useEffect } from "react";
import fileDownload from "js-file-download";

const Riot = () => {
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:5000/api/riot/riot.txt");

      fileDownload(res.data, "riot.txt");
    })();
  }, []);

  return <></>;
};

export default Riot;
