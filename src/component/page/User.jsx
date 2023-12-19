/*
용도: 유저 페이지
담당자: 양태석
사용법: App.js에서 라우팅됨.
기타: 주소의 파라미터로 유저 페이지 구분
*/
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";

// 로그아웃 버튼
const Logout = styled.button`
   display: block;
   margin: 0 auto;
   border: none;
   border-radius: 10px;
   background: none;
   color:#C3C9D2;
   font-size: 20px;
   line-height: 30px;
   font-weight: 700;
   width: 80%;
   height: 30px;
`;

const User = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies, ,removeCookie] = useCookies();// 쿠키 가져오기, 쿠기 삭제를 위한 함수
  const [userInfo, setUserInfo] = useState({}); // 유저 정보 상태
  const { userid } = useParams(); // 파라미터 값 가져오기

  useEffect(() => {
    // 유저 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        // 회원 조회 api 요청
        const response = await axios.get("http://127.0.0.1:8080/account?id=" + userid, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        console.log(response.data);
        // 유저 상태 등록
        setUserInfo(response.data);
      } catch (error) {
        // 없는 유저라면 쿠키 지우고 로그인 페이지로 이동
        if (error.response && error.response.status === 404) {
          removeCookies();
          navigate("/signin");
        } else {
          console.error("오류 발생:", error);
        }
      }
    };
    fetchUserInfo();
  }, [cookies.token, navigate, userid]);

  // 쿠키 지우기
  const removeCookies = async (e) => {
    removeCookie('token', { path: '/' });
    removeCookie('certification', { path: '/' });
    removeCookie('roles', { path: '/' });
    removeCookie('nickname', { path: '/' });
    removeCookie('userId', { path: '/' });
    navigate("/");
  };

  return (
    <div>
      <Header headerType={"user"}></Header>
      {/* 임시 표시용 */}
      {userInfo.nickname}
      <Logout onClick={removeCookies}>로그아웃</Logout>
      <MenuBar></MenuBar>
    </div>
  );
};

export default User;