import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Footer from "../../components/layout/Footer";

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
font-family: "Poppins";
  text-align: center;
  height: 45px;
  line-height: 45px;
  margin-bottom: 150px;
  font-size: 63px;
  font-weight: 850;
  & a{
    font-family: "Poppins";
    color : #6093FF;
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
  margin-top: -15px;
  display: block;
  text-align: center;
  color : #6093FF;
`;

// 입력 박스
const InputBox = styled.input`
  display: block;
  margin: 10px auto;
  height: 40px;
  background: #ffffff;
  /* border: 1px solid #dddddd; */
  border: none;
  background: #f6f6f6;
  border-radius: 10px;
  color:#333333;
  font-size: 17px; 
  outline: none;
  padding: 0px 3%;
  width: 60%;
  &::placeholder {
      color: #aaaaaa; 
      font-size: 17px;
  }
  &:focus {
    border-color: #6093FF;
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
  background: #6093FF;
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

const CouncilSignIn = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [, setCookie] = useCookies(); // 쿠키 생성을 위해

  // 입력 박스 포커스
  const useridRef = useRef();
  const passwordRef = useRef();

  // 입력 박스 텍스트 상태
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 로직 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    // 입력을 아에 안했는지 확인
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

    try {
      // 로그인 api 요청
      const loginResponse = await axios.post( process.env.REACT_APP_BACK_URL + "/login",
        {
          userid,
          password
        }
      );

      // 성공시
      if (loginResponse.data.code === 200) {
        // 2시간 후 만료되는 쿠키 생성
        const expires = moment().add(2, "hours").toDate();
        setCookie("token", loginResponse.data.data.token, {
          path: "/",
          expires: expires,
        });
        setCookie("userId", loginResponse.data.data.userId, {
          path: "/",
          expires: expires,
        });
        setCookie("nickname", loginResponse.data.data.nickname, {
          path: "/",
          expires: expires,
        });
        setCookie("roles", loginResponse.data.data.roles, {
          path: "/",
          expires: expires,
        });
        setCookie("certification", loginResponse.data.data.certification, {
          path: "/",
          expires: expires,
        });
        setCookie("id", loginResponse.data.data.id, {
          path: "/",
          expires: expires,
        });
        navigate("/council/manage");
      } else if (loginResponse.data.code === 404) { 
        window.alert("아이디를 다시 확인해주세요.");
      } else if (loginResponse.data.code === 401) { 
        window.alert("비밀번호가 올바르지 않습니다.");
      }

    } catch (error) {
    
      console.error("오류 발생:", error);
    }
  };

  // 엔터 누르면 제출 하도록 하는 함수
  const activeEnter = (event) => {
    if (event.code === 'Enter') {
      handleLogin(event);
    }
  };

  return (
    <div>
      <LoginBox>
        {/* 타이틀 */}
        <Title>
          <SubTitle>
            학생회 전용
          </SubTitle>
          <Link to={"/"}>Baram</Link>
        </Title>

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

        {/* 제출 버튼 */}
        <SubmitBtn onClick={handleLogin}>로그인</SubmitBtn>
        <Link to={"/council/forgot"}>
          <ForgotPassword>아이디/비밀번호를 잊었나요?</ForgotPassword>
        </Link>
      </LoginBox>
    </div>
  );
};

export default CouncilSignIn;