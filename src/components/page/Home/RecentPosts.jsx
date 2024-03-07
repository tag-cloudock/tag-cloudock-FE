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
  &:hover span{
    text-decoration: underline;
  }
  padding: 10px 10px;
  font-size: 15px;

  @media screen and (max-width: 700px) {
    font-size: 13px;
  }
  & > * {
    opacity: ${({ isDone }) => (isDone ? "30%" : '100%')};
  }
  display: flex;
  justify-content: space-between;
`;
const Item = styled.div`
`;
// 최신글 location
const Title = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  padding-left: 15px;
  font-weight: 400;
  font-size: 15px;
  display: inline-block;
  color: #000000;
  @media screen and (max-width: 700px) {
    font-size: 13px;
  }
  white-space: nowrap; 
  overflow: hidden; 
  flex: 1;
  text-overflow: ellipsis; 
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

const CreatedTime = styled.div`
  color: #555555;
`;

const RecentPosts = ( prop ) => {
  const navigate = useNavigate(); // 로그인 전 홈 진입 막기 위해
  const [posts, setPosts] = useState([]); // 최신 글 사용 위해
  const [cookies] = useCookies(); // 쿠키 사용하기 위해

  const getTimeDiff = (createdAt) => {
    const createDate = new Date(createdAt[0], createdAt[1] - 1, createdAt[2], createdAt[3], createdAt[4], createdAt[5]);
    const now = new Date();
    
    const diffInMilliseconds = now - createDate;
    console.log(createDate);
  
    if (diffInMilliseconds < 60 * 60 * 1000) {
      // 1시간 미만이면 분 단위로 반환
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      return `${diffInMinutes}분 전`;
    } else if (diffInMilliseconds < 24 * 60 * 60 * 1000) {
      // 1일 미만이면 시간 단위로 반환
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      return `${diffInHours}시간 전`;
    } else {
      // 그 외에는 일 단위로 반환
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      return `${diffInDays}일 전`;
    }
  };
  useEffect(() => {
    // 최신 글 업로드
    const fetchPosts = async () => {
      try {
        const response1 = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/post/news?campus="+(prop.campus == 0 ? "global": "medical")
        );
        console.log(response1.data);
        setPosts(response1.data);
      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchPosts();
  }, [cookies.token, navigate, prop.campus]); // 두 요청에 필요한 의존성을 배열로 전달

  return (
    <div>
      {/* post 데이터 렌더링 */}
      {posts.map((post, index) => (
        <Item key={post.postId}>
          <Link to={"/posts/"+post.postId}>
            <Wrapped isDone={post.close}>
              <div>{post.location.slice(2)}</div>
              <Title> {post.title}</Title>
              <CreatedTime>{getTimeDiff(post.createdAt)}</CreatedTime>
            </Wrapped>

          </Link>
        </Item>
      ))}
    </div>
  );
};

export default RecentPosts;
