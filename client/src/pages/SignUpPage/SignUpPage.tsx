import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpAction } from "../../_actions/user/authActions";
import Button from "../../components/Atoms/Button/Button";
import Input from "../../components/Atoms/Input/Input";
import useSnackBar from "../../hooks/useSnackBar";
import * as S from "./style";

const SignUpPage = () => {
  const { snackbar } = useSnackBar();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSignUp = async () => {
    if (!inputs.email || !inputs.password || !inputs.username) {
      return;
    }

    try {
      const appendValues = { email: inputs.email, password: inputs.password, username: inputs.username };

      await dispatch(signUpAction(appendValues));

      navigate("/signIn");
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.id;

    setInputs({
      ...inputs,
      [target]: e.currentTarget.value,
    });
  };

  return (
    <S.SignUpContainer>
      <h1>signUp</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <Input onChange={handleChangeInput} id="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <Input onChange={handleChangeInput} id="password" type="password" />
      </div>
      <div>
        <label htmlFor="username">닉네임</label>
        <Input onChange={handleChangeInput} id="username" type="text" />
      </div>
      <Button onClick={handleSignUp}>회원가입</Button>
    </S.SignUpContainer>
  );
};

export default SignUpPage;
