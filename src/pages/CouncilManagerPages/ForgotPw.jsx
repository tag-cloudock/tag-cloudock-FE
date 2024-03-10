import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";

// 로그인 form 박스
const LoginBox = styled.div`
  margin: 20px auto;
  padding: 70px 0px;
  width: 90%;
  background : none;
  border-radius: 20px;
`;

// 타이틀
const Title = styled.div`

  text-align: center;
  height: 45px;
  line-height: 45px;
  margin-bottom: 100px;
  font-size: 63px;
  font-weight: 850;
  & a{
    font-family: "Poppins";
    color : #38d9a9;
  }
`;

// 서브 타이틀
const SubTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color : #adb5c2;
`;


// 비밀번호 잊어버림 문구
const ForgotPassword = styled.span`
  display: block;
  text-align: center;
  color : #848484a9;
  font-weight: 600;
`;

// 입력 박스
const InputBox = styled.input`
  display: block;
  margin: 10px auto;
  height: 40px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  color:#333333;
  font-size: 18px; 
  outline: none;
  padding: 0px 3%;
  width: 60%;
  &::placeholder {
      color: #aaaaaa; 
      font-size: 18px;
  }
  &:focus {
    border-color: #38d9a9;
  }
`;

// 제출 버튼
const SubmitBtn = styled.button`
  display: block;
  margin: 30px auto;
  height: 40px;
  background: #efefef;
  border: none;
  border-radius: 10px;
  background: #38d9a9;
  font-weight: bold;
  color:#ffffff;
  font-size: 18px; 
  outline: none;
  width: 66%;
  &::placeholder {
      color: #aaaaaa; 
      font-size: 18px;
  }
`;

// 비밀번호 잊어버림 문구
const GoBack = styled.span`
  margin-top: 30px;
  display: block;
  text-align: center;
  color : #38d9a9;
`;

const AlertBox = styled.div`
  width: 100%;
  /* height: 100px; */
  background: #f4f4f49a;
  border-radius: 20px;
  padding: 50px 0px;
  line-height: 30px;
`;



const ForgotPw = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies, setCookie] = useCookies(); // 쿠키 생성을 위해

  useEffect(() => {
    if (!cookies.token) {
      navigate("/signin");
      return;
    }
    if (cookies.roles != "MANAGER") {
      navigate("/");
      return;
    }
  });

  return (
    <div>
      <LoginBox>
        {/* 타이틀 */}
        <Title>
          <SubTitle>
            학생회 로그인
          </SubTitle>
          <Link to={"/"}>Baram</Link>
        </Title>

        <AlertBox>
          <ForgotPassword>아이디/비밀번호 잊었나요?</ForgotPassword>
          <ForgotPassword>오픈 카카오톡으로 문의 하세요!</ForgotPassword>
        </AlertBox>

        <Link to={"/council/signin"}>
          <GoBack>돌아가기</GoBack></Link>
      </LoginBox>
    </div>
  );
};

export default ForgotPw;