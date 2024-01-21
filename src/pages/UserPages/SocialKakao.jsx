import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
    padding: 20px;
`;

const Text = styled.div`
    /* margin: 20px auto 0 20px; */
    font-size: 25px;
    line-height: 38px;
    font-weight: 500;
    padding: 70px 0px;
    font-family: 'Noto Sans KR'; 
    /* text-align: center; */
`;

const Nickname = styled.input`
    border: none;
    height: 35px;
    background: none;
    /* padding: 10px 0px; */
    /* border-radius: 20px; */
    font-family: 'Noto Sans KR'; 
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
    font-family: 'Noto Sans KR'; 
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
    border-bottom: 3px solid #379DFF;
`;

const SummitBtn = styled.button`
    font-family: 'Noto Sans KR'; 
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
    font-size: 18px;
    font-weight: 500;
    background: ${({ isOk }) => (isOk ? '#379DFF' : '#afd9ff')};
`;



const NicknameSetBox = styled.div`
  position: relative;
`;


const SocialKakao = () => {
  const navigate = useNavigate(); // 로그인 전 홈 진입 막기 위해
  const [cookies,setCookie] = useCookies(); // 쿠키 사용하기 위해
  const [newUser, setNewUser] = useState(false); // 유저 정보 상태
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState(""); // 유저 정보 상태
  const [cnt, setCnt] = useState(0);
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    const kakaoSignIn = async () => {
      try {
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/oauth/kakao/" + code
        );
        console.log(response.data.userId);
        if (response.status == 200) {
          const expires = moment().add(2, "hours").toDate();
          setCookie("token", response.data.token, {
            path: "/",
            expires: expires,
          });
          setCookie("userId", response.data.userId, {
            path: "/",
            expires: expires,
          });
          setCookie("nickname", response.data.nickname, {
            path: "/",
            expires: expires,
          });
          setCookie("roles", response.data.roles, {
            path: "/",
            expires: expires,
          });
          setCookie("certification", response.data.certification, {
            path: "/",
            expires: expires,
          });
          navigate("/");
        }
        if (response.status == 201) {
          setEmail(response.data.userId);
          setNewUser(true);
        }


      } catch (error) {
        console.log("오류 발생: ", error);
      }
    };
    kakaoSignIn();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post("http://" + process.env.REACT_APP_BACK_URL + "/oauth/kakao",
        {
          email,
          nickname
        }
      );
      console.log(response)
      if (response.status === 200) {
        const expires = moment().add(2, "hours").toDate();
        setCookie("token", response.data.token, {
          path: "/",
          expires: expires,
        });
        setCookie("userId", response.data.userId, {
          path: "/",
          expires: expires,
        });
        setCookie("nickname", response.data.nickname, {
          path: "/",
          expires: expires,
        });
        setCookie("roles", response.data.roles, {
          path: "/",
          expires: expires,
        });
        setCookie("certification", response.data.certification, {
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
      {newUser ?
        <NicknameSetBox>

          <Text>
            환영합니다!<br />
            닉네임을 설정해주세요!
          </Text>
          <InputBox>
            <Nickname
              type="text"
              // ref={passwordRef}
              name="title"
              placeholder="5글자 내로 입력해주세요"
              maxLength={5}
              onChange={(e) => {
                setCnt(e.target.value.length);
                setNickname(e.target.value);
              }}>

            </Nickname>
            <NicknameCnt>
              {cnt}/5
            </NicknameCnt>
          </InputBox>
          <SummitBtn isOk={cnt != 0} disabled={cnt == 0} onClick={handleSignUp} >가입완료</SummitBtn>
        </NicknameSetBox>

        :
        null}
    </Container>
  );
};

export default SocialKakao;