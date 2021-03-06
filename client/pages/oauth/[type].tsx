import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useSnackBar from "../../hooks/useSnackBar";
import { saveToken } from "../../toolkit/user/tokenSlice/func/tokenSlice.func";
import { signIn } from "../../API/auth";

const OAuthPage = ({ type, code }) => {
  const router = useRouter();

  const { snackbar } = useSnackBar();

  useEffect(() => {
    (async () => {
      const {
        data: { success, data },
      } = await signIn({ code });

      if (success) {
        saveToken(data.token);

        localStorage.setItem("AUTH_TYPE", data.type);

        router.push("/");
      } else {
        snackbar("로그인에 실패했습니다.", "error");
      }
    })();
  }, []);

  return <div>로그인 중...</div>;
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
