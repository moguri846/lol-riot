import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../../redux/reducers/rootReducer";
import { logoutOAuth } from "../../../redux/actions/user/authActions";
import SearchSummonerInputForm from "../../Molecules/SearchSummonerInputForm/SearchSummonerInputForm";
import Button from "../../Atoms/Button/Button";
import useSearch from "../../../hooks/useSearch";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import * as S from "./style";
import "@egjs/react-flicking/dist/flicking.css";
import Link from "next/link";

// TODO: DB로 옮기기
import famousSayingJson from "../../../json/famousSaying.json";

const Header = () => {
  const dispatch = useDispatch();

  const events = useSearch();

  const isLogin = useSelector((state: RootReducerType) => state.user.token.isLogin);

  // const selecetHandler = (e: React.MouseEvent<HTMLLIElement>) => {
  //   const lis = document.querySelectorAll("ul li");
  //   lis.forEach((li) => li.classList.remove("selected"));

  //   e.currentTarget.classList.add("selected");
  // };

  const logout = () => {
    dispatch(logoutOAuth());
    // dispatch(logoutOAuth());
  };

  return (
    <S.Header>
      <S.HeadeTop>
        <S.Title>
          <Link href="/">Search My Name</Link>
        </S.Title>
        <SearchSummonerInputForm {...events} />
        <S.LoginButtonContainer>
          {isLogin ? (
            <Button label="로그아웃" />
          ) : (
            <Link href="/signIn">
              <button>로그인</button>
              {/* FIXME: ref 참조 에러 발생 */}
              {/* <Button label="로그인" /> */}
            </Link>
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
