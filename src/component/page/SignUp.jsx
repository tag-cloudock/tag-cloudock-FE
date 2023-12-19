/*
용도: 회원가입 페이지
담당자: 양태석
사용법: App.js에서 라우팅
기타: 
*/
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Footer from "../layout/Footer";

// 회원가입 form 박스
const SignUpBox = styled.div`
    margin: 100px auto;
    padding: 70px 0px;
    width: 90%;
    background : #ffffff;
    border-radius: 20px;
    text-align: center;
`;

// 타이틀
const Title = styled.div`
    text-align: center;
    height: 45px;
    line-height: 45px;
    margin-bottom: 100px;
    font-size: 50px;
    font-weight: 850;
    color : #559BFF;
`;

// 서브 타이틀
const SubTitle = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color : #adb5c2;
`;

// 아이디 패스워드 조건 사항
const Requirements = styled.span`
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    color : #989fac;
`;

// 로그인 하러가기
const GoToSignIn = styled.span`
    margin-top: 10px;
    display: block;
    text-align: center;
    color : #aaaaaa;
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
      border-color: #559BFF;
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
    background: #559BFF;
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

const SignUp = () => {
  const navigate = useNavigate(); // 페이지 이동

  // 입력박스 자동 포커스를 위해
  const nicknameRef = useRef();
  const useridRef = useRef();
  const passwordRef = useRef();

  // 각 입력 박스 상태
  const [nickname, setNickname] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 이메일 추가 for 비밀번호 찾기
    const useridRegex = /^[a-z0-9]{5,15}$/;
    // const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@!?]{5,15}$/;

    // 입력을 아에 안했는지 검사
    if (nickname.length < 1) {
      window.alert("별명을 입력해주세요.");
      nicknameRef.current.focus();
      setNickname('');
      return;
    }
    if (userid.length < 1) {
      window.alert("아이디를 입력해주세요.");
      useridRef.current.focus();
      setUserid('');
      return;
    }
    if (password.length < 1) {
      window.alert("패스워드를 입력해주세요.");
      passwordRef.current.focus();
      setPassword('');
      return;
    }
    // 최대 글자를 넘었는지 검사
    if (nickname.length > 5) {
      window.alert("별명을 5글자 이내로 입력해주세요.");
      nicknameRef.current.focus();
      setNickname('');
      return;
    }
    if (userid.length > 15) {
      window.alert("아이디를 15글자 이내로 입력해주세요.");
      useridRef.current.focus();
      setUserid('');
      return;
    }
    if (password.length > 15) {
      window.alert("패스워드를 15글자 이내로 입력해주세요.");
      passwordRef.current.focus();
      setPassword('');
      return;
    }
    // 유효성 검사
    if (!useridRegex.test(userid)) {
      window.alert("올바른 아이디 형식이 아닙니다.");
      useridRef.current.focus();
      setUserid('');
      return;
    }
    if (!passwordRegex.test(password)) {
      window.alert("올바른 비밀번호 형식이 아닙니다.");
      passwordRef.current.focus();
      setPassword('');
      return;
    }

    try {
      // 회원가입 api 요청
      const signUpResponse = await axios.post("http://127.0.0.1:8080/register",
        {
          userid,
          nickname,
          password
        }
      );
      // 성공시
      if (signUpResponse.status === 200) {
        window.alert("회원가입 성공!");
        navigate("/signin");
      }
    } catch (error) {
      // 중복된 아이디라면
      if (error.response && error.response.status === 409) {
        window.alert("중복된 아이디 입니다.");
      } else {
        console.error("오류 발생:", error);
      }
    }
  };
  // 엔터 누르면 제출하도록
  const activeEnter = (event) => {
    if (event.code === 'Enter') {
      handleSignUp(event);
    }
  };
  return (
    <div>
      <SignUpBox>
        <Title>
          <SubTitle>
            당장 필요할때 바로 빌리자
          </SubTitle>
          대학빌림
        </Title>

        {/* 별명 */}
        <InputBox
          type="text"
          ref={nicknameRef}
          name="nickname"
          value={nickname}
          placeholder="별명"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }} />

        {/* 이메일(제작중) */}
        {/* <InputBox
          type="email"
          // ref={nicknameRef}
          name="email"
          // value={nickname}
          placeholder="이메일"
          // onChange={(e) => {
          //   setNickname(e.target.value);
          // }}
          onKeyDown={(e) => {activeEnter(e)}}/> */}

        {/* 아이디 */}
        <InputBox
          type="text"
          ref={useridRef}
          name="id"
          value={userid}
          placeholder="아이디"
          onChange={(e) => {
            setUserid(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }}
        />
        <Requirements>영문 소문자, 숫자 조합 5~15자리</Requirements>

        {/* 비밀번호 */}
        <InputBox
          type="password"
          ref={passwordRef}
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }} />
        <Requirements>대소문자, 숫자, @!? 조합 5~15자리</Requirements>

        {/* 제출 버튼 */}
        <SubmitBtn onClick={handleSignUp}>회원가입</SubmitBtn>
        <Link to={"/signin"}>
          <GoToSignIn>로그인 하러가기</GoToSignIn>
        </Link>

      </SignUpBox>
      <Footer></Footer>
    </div>
  );
};

export default SignUp;