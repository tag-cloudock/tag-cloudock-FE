/*
용도: 최신 post 전체 목록을 내보내는 컴포넌트
담당자: 김윤수
사용법: Home.jsx에서 컴포넌트로 불러와 사용
기타: .
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Wrapped = styled.div`
  padding: 18px;
  padding-left: 8%;
  padding-top: 15px;
  padding-bottom: 15px;
  font-weight: 700;
  font-size: 22px;
  color: #505050;
  @media screen and (max-width: 700px) {
    padding: 10px;
    padding-left: 18px;
    padding-top: 8px;
    font-size: 13px;
  }
`;

// 최신글 location
const Title = styled.span`
  padding-left: 15%;
  font-weight: 500;
  font-size: 18px;
  color: #505050;
  @media screen and (max-width: 700px) {
    padding-top: 3px;
    font-size: 13px;
  }
`;

// 최신 글 상위 3개에 뜨는 이모지
const ImageIcon = styled.img`
  width: 23px;
  vertical-align: middle;
  margin-left: 280px;
  margin-bottom: 5px;
  @media screen and (max-width: 700px) {
    margin-left: 150px;
    width: 15px;
    margin-bottom: 0px;
  }
`;

const PostList = () => {
  const navigate = useNavigate(); // 로그인 전 홈 진입 막기 위해
  const [posts, setPosts] = useState([]); // 최신 글 사용 위해
  const [cookies] = useCookies(); // 쿠키 사용하기 위해

  useEffect(() => {
    // 최신 글 업로드
    const fetchPosts = async () => {
      try {
        const response1 = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/post/all",
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setPosts(response1.data);
      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };

    // 로그인 여부 체크
    const fetchChatRooms = async () => {
      try {
        if (!cookies.token) {
          navigate("/signin");
          return;
        }

        const response2 = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/chat/user",
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
      } catch (error) {
        console.error("쿠키 오류 발생:", error);
      }
    };

    fetchPosts();
    fetchChatRooms();
  }, [cookies.token, navigate]); // 두 요청에 필요한 의존성을 배열로 전달

  return (
    <div>
      {/* 처음 6개의 포스트만 렌더링 */}
      {posts.slice(0, 6).map((post, index) => (
        <div key={post.postId}>
          <Link to={"/"}>
            <Wrapped>
              {post.location}
              <Title> {post.title}</Title>
              {index < 3 && <ImageIcon src="image/thunder.svg" alt="" />}
            </Wrapped>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;

// <div>
//   {/* post 데이터 렌더링 */}
//   {posts.map((post, index) => (
//     <div key={post.postId}>
//       <Wrapped>
//         {post.location}
//         <Title> {post.title}</Title>
//       </Wrapped>

//       {/* 처음 3개의 포스트에만 img 추가 */}
//       {index < 3 && (
//         <ImageIcon src="image/thunder.svg" alt="Your Image Alt Text" />
//       )}
//     </div>
//   ))}
// </div>;
