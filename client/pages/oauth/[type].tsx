import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSnackBar from "../../hooks/useSnackBar";
import { saveToken } from "../../toolkit/user/tokenSlice/func/tokenSlice.func";

const OAuthPage = ({ type, code }) => {
  const router = useRouter();

  const { snackbar } = useSnackBar();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await axios.post(`http://localhost:5000/api/auth/${type}/signIn`, { code });

        saveToken(data);

        localStorage.setItem("AUTH_TYPE", type);

        router.push("/");
      } catch (err) {
        snackbar(err.message, "error");
      }
    })();
  }, []);

  return <div>OAuthPage</div>;
};

export default OAuthPage;

export const getServerSideProps = ({ query }) => {
  const { code, type } = query;

  return {
    props: {
      type,
      code,
    },
  };
};
