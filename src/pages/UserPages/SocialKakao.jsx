import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    padding: 20px;
`;

const Text = styled.div`
    /* margin: 20px auto 0 20px; */
    font-size: 25px;
    line-height: 38px;
    font-weight: 600;
    padding: 70px 0px;

    /* text-align: center; */
`;

const Nickname = styled.input`
    border: none;
    height: 35px;
    background: none;
    /* padding: 10px 0px; */
    /* border-radius: 20px; */
    /* text-align: center; */
    outline: none;
    font-size: 22px;
      font-weight: 500;
      color:#000000;
    &::placeholder {
      font-size: 22px;
      font-weight: 500;
      color:#d1d1d1;
    }
`;
const NicknameCnt = styled.span`
    /* z-index: 10px; */
    /* margin-top: -30px; */
      font-size: 22px;
      font-weight: 500;
      color:#bcbcbc;
      float: right;
`;
const InputBox = styled.div`
height: 40px;
        margin-top: 100px;
    width: 100%;
    border-bottom: 3px solid #6093FF;
`;

const SummitBtn = styled.button`
    position: fixed;
    display: block;
    bottom: 30px;
    height: 40px;
    border: none;
    width: calc(100% - 40px); /* 100%에서 좌우 여백만큼 뺀 값 */
    left: 50%;
    transform: translateX(-50%); /* 가운데 정렬을 위해 추가 */
    max-width: 701px;
    padding-left: 20px; /* 좌측 여백 */
    padding-right: 20px; /* 우측 여백 */
    border-radius: 10px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    background: ${({ isOk }) => (isOk ? '#6093FF' : '#afd9ff')};
`;



const NicknameSetBox = styled.div`
  position: relative;
`;

const CheckBox = styled.button`
  /* position: relative; */
  display: inline-block;
  width: 19px;
  height: 19px;
  border-radius: 1000px;
  border: 3px solid #f1f1f1;
  background: ${({ isChecked }) => (isChecked ? '#6093FF' : '#f1f1f1')};
    
  /* border: none; */
  margin-right: 7px;
`;

const Agree = styled.div`
  background: #ffffff;
  font-size: 15px;
  /* line-height: px; */
  /* margin: 10px 0px; */
  width: 100%;
  padding-top: 20px;
  padding-bottom: 80px;
  position: fixed;
  bottom: 0px;
  & span{
    color: #6093FF;
  }
`;


const Title = styled.div`
  font-weight: bold;
  font-size: 13px;
  margin: 10px 0px;
    
`;

const AgreeTitle = styled.div`
 position: fixed;
 top: 0;
  font-size: 20px;
    font-weight: bold;
    text-align: left;
    padding-top: 30px;
    padding-bottom: 10px;
    width: 100%;
    background: #ffffff;
`;

const Doc = styled.div`
  margin: 50px 0px 100px 0px;
  resize: none;
  width: 100%;
  /* height: 500px; */
  font-size: 12px;
  /* height: 500px; */
  overflow: scroll;

  /* position: fixed;
  bottom: 125px; */
  /* border: 1px solid #d7d7d7; */
`;

const AgreeContainer = styled.div`
    display: flex;
    flex-direction: column;

`;



const SocialKakao = () => {
  const navigate = useNavigate(); // 로그인 전 홈 진입 막기 위해
  const [cookies, setCookie] = useCookies(); // 쿠키 사용하기 위해
  const [newUser, setNewUser] = useState(false); // 유저 정보 상태
  const [agree, setAgree] = useState(false);
  const [isCheckAgree, setIsCheckAgree] = useState(false);
  const [nickname, setNickname] = useState("");
  const [cnt, setCnt] = useState(0);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoSignIn = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACK_URL + "/oauth/kakao/" + code
        );
        if (response.data.code == 200) {
          const expires = moment().add(48, "hours").toDate();
          setCookie("token", response.data.data.accessToken, {
            path: "/",
            expires: expires,
          });
          setCookie("userId", response.data.data.userId, {
            path: "/",
            expires: expires,
          });
          navigate("/");
        }
        if (response.data.code == 404) {
          handleSignUp();
        }

      } catch (error) {
        console.log("오류 발생: ", error);
      }
    };
    kakaoSignIn();
  }, []);

  const handleSignUp = async (e) => {
    // e.preventDefault();

    try {

      const response = await axios.post(process.env.REACT_APP_BACK_URL + "/oauth/kakao",
        {
          code
        }
      );
      if (response.status === 200) {
        const expires = moment().add(48, "hours").toDate();
        setCookie("token", response.data.data.accessToken, {
          path: "/",
          expires: expires,
        });
        setCookie("userId", response.data.data.userId, {
          path: "/",
          expires: expires,
        });
        navigate("/");
      }
    } catch (error) {
    }
  };

  return (
    <Container>
    </Container>
  );
};

export default SocialKakao;