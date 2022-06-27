import React from "react";

import InputForm from "../../Molecules/InputForm/InputForm";
import Button from "../../Atoms/Button/Button";
import useSearch from "../../../hooks/useSearch";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import * as S from "./style";
import "@egjs/react-flicking/dist/flicking.css";
import Link from "next/link";

// TODO: DB로 옮기기
import famousSayingJson from "../../../json/famousSaying.json";
import { selectToken, tokenStatusUpdate } from "../../../toolkit/user/tokenSlice/tokenSlice";
import { logout } from "../../../API/auth";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import useSnackBar from "../../../hooks/useSnackBar";
import { AUTH_TYPE, NON_EXISTENT_TOKEN } from "../../../toolkit/user/tokenSlice/constant/tokenSlice.constant";
import { AuthTypes } from "../../../API/interface/auth.interface";

const Header = () => {
  const dispatch = useAppDispatch();

  const { snackbar } = useSnackBar();

  const events = useSearch();

  const isLogin = useAppSelector(selectToken).isLogin;

  const handleLogout = async () => {
    try {
      const authType = localStorage.getItem(AUTH_TYPE) as AuthTypes;

      await logout(authType);

      dispatch(tokenStatusUpdate({ type: NON_EXISTENT_TOKEN, isLogin: false, message: "유효하지 않은 토큰" }));

      localStorage.clear();
    } catch (err) {
      snackbar(err.message, "error");
    }
  };

  return (
    <S.Header>
      <S.HeadeTop>
        <S.Title>
          <Link href="/">Search My Name</Link>
        </S.Title>
        <InputForm {...events} placeholder="소환사 이름" buttonValue="검색" />
        <S.LoginButtonContainer>
          {isLogin ? (
            <Button onClick={handleLogout}>로그아웃</Button>
          ) : (
            <Button>
              <Link href="/signIn">로그인</Link>
            </Button>
          )}
        </S.LoginButtonContainer>
      </S.HeadeTop>
      <S.HeaderBottom>
        {/* <nav>
          <S.Ul>
            <S.Li onClick={selecetHandler}>랭킹</S.Li>
            <S.Li onClick={selecetHandler}>커뮤니티</S.Li>
          </S.Ul>
        </nav> */}
        <span style={{ cursor: "pointer" }}>
          <Link href="/post/create">글 쓰기</Link>
        </span>
        <div className="famous-saying">
          <Flicking circular horizontal={false} plugins={[new AutoPlay({ duration: 3000 })]}>
            {famousSayingJson.map((item) => (
              <div key={item.name}>
                {item.say} - {item.name}
              </div>
            ))}
          </Flicking>
        </div>
      </S.HeaderBottom>
    </S.Header>
  );
};

export default Header;
