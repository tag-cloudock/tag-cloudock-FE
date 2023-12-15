import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Footer from "../layout/Footer";

const LoginBox = styled.div`
    margin: 100px auto;
    padding: 70px 0px;
    @media screen and (max-width: 1000px) {
      width: 90%;
    }
    @media screen and (min-width: 1001px) {
      width: 50%;
    }
    background : #ffffff;
    border-radius: 20px;
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 15px 0px; */
`;

const Title = styled.div`
    text-align: center;
    height: 100px;
    line-height: 100px;
    margin-bottom: 30px;
    font-size: 50px;
    font-weight: 850;
    color : #559BFF;
`;

const ForgotPassword = styled.span`
    margin-top: -15px;
    display: block;
    text-align: center;
    color : #559BFF;
`;
const GoToSignUp = styled.span`
    margin-top: 10px;
    display: block;
    text-align: center;
    color : #aaaaaa;
`;

const InputBox = styled.input`
    display: block;
    margin: 10px auto;
    
    height: 40px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    color:#333333;
    /* padding: 0px 20px; */
    font-size: 18px; 
    outline: none;
    padding-left: 20px;
    width: 300px;
    &::placeholder {
        color: #aaaaaa; 
    /* font-style: italic;  */
        font-size: 18px;
    }
    &:focus {
      border-color: #559BFF; /* 원하는 색상으로 변경 */
    }
`;

const SubmitBtn = styled.button`
    display: block;
    margin: 30px auto;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #559BFF;
    font-weight: bold;
    color:#ffffff;
    font-size: 18px; 
    outline: none;
    width: 320px;
    &::placeholder {
        color: #aaaaaa; 
    /* font-style: italic;  */
        font-size: 18px;
    }
`;

const SignIn = () => {
  const navigate = useNavigate();

  const useridRef = useRef();
  const passwordRef = useRef();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userid.length < 1) {
      window.alert("ID를 입력해주세요.");
      useridRef.current.focus();
      return;
    }
    if (password.length < 1) {
      window.alert("패스워드를 입력해주세요.");
      passwordRef.current.focus();
      return;
    }

    const loginResponse = await axios.post("http://127.0.0.1:8080/login",
      { 
        userid, 
        password 
      }
    );

    if (loginResponse.status === 200) {
      const expires = moment().add(2, "hours").toDate();
      setCookie("token", loginResponse.data.token, {
        path: "/",
        expires: expires,
      });
      setCookie("userId", loginResponse.data.userId, {
        path: "/",
        expires: expires,
      });
      setCookie("nickname", loginResponse.data.nickname, {
        path: "/",
        expires: expires,
      });
      setCookie("roles", loginResponse.data.roles, {
        path: "/",
        expires: expires,
      });
      setCookie("certification", loginResponse.data.certification, {
        path: "/",
        expires: expires,
      });
      navigate("/");
    } else if (loginResponse.status === 404) {
      window.alert("ID를 다시 확인해주세요.");
      return;
    } else if (loginResponse.status === 401) {
      window.alert("비밀번호가 올바르지 않습니다.");
    }
  };
  const activeEnter = (event) => {
    if (event.code === 'Enter') {
      handleLogin(event);
    }
  };
  return (
      <div>

      
      <LoginBox>
        <Title>바로보로우</Title>
        <InputBox
          type="text"
          ref={useridRef}
          name="ID"
          placeholder="ID"
          onChange={(e) => {
            setUserid(e.target.value);
          }}
          onKeyDown={(e) => {activeEnter(e)}}
        />
        <InputBox
          type="password"
          ref={passwordRef}
          name="password"
          placeholder="PASSWORD"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {activeEnter(e)}}/>
          <SubmitBtn onClick={handleLogin}>LOGIN</SubmitBtn>
          
          <ForgotPassword>비밀 번호를 잊으셨나요?</ForgotPassword>
          <GoToSignUp>회원가입</GoToSignUp>
      </LoginBox>
      <Footer></Footer>
      </div>
  );
};

export default SignIn;