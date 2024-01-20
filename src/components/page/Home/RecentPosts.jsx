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
  font-weight: 500;
  font-size: 17px;
  color: #000000;
  border-radius: 10px;
  
  line-height: 25px;
  height: 25px;
  font-family: 'Noto Sans KR', sans-serif;
  &:hover {
    /* background: #f7f7f7; */
  }
  padding: 10px 10px;
  font-size: 15px;

`;
const Item = styled.div`
`;
// 최신글 location
const Title = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  padding-left: 15px;
  font-weight: 400;
  font-size: 17px;
  display: inline-block;
  color: #000000;
  @media screen and (max-width: 700px) {
    font-size: 15px;
  }
`;

// 최신 글 상위 3개에 뜨는 이모지
const ImageIcon = styled.img`
  width: 18px;
  float: right;
  vertical-align: middle;
  @media screen and (max-width: 700px) {
    width: 15px;
  }
`;

const RecentPosts = () => {
  const navigate = useNavigate(); // 로그인 전 홈 진입 막기 위해
  const [posts, setPosts] = useState([]); // 최신 글 사용 위해
  const [cookies] = useCookies(); // 쿠키 사용하기 위해

  useEffect(() => {
    // 최신 글 업로드
    const fetchPosts = async () => {
      try {
        const response1 = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/post/news"
        );
        console.log(response1.data);
        setPosts(response1.data);
      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchPosts();
  }, [cookies.token, navigate]); // 두 요청에 필요한 의존성을 배열로 전달

  return (
    <div>
      {/* post 데이터 렌더링 */}
      {posts.map((post, index) => (
        <Item key={post.postId}>
          <Link to={"/"}>
            <Wrapped>
              {post.location}
              <Title> {post.title}</Title>
            </Wrapped>
          </Link>
        </Item>
      ))}
    </div>
  );
};

export default RecentPosts;
