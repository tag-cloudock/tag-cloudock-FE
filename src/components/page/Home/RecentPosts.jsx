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
  &:hover span{
    text-decoration: underline;
  }
  padding: 7px 10px;
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

const CreatedTime = styled.div`
  color: #555555;
`;


const NewSign = styled.span`
  background: #ffb700;
  display: inline-block;
  line-height: 17px;
  padding: 0px 4px;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  margin-right: 5px;
`;

const RecentPosts = (prop) => {
  const navigate = useNavigate(); 
  const [posts, setPosts] = useState([]); 
  const [cookies] = useCookies(); 

  const getTimeDiff = (createdAt) => {
    const createDate = new Date(createdAt);
    const now = new Date();

    const diffInMilliseconds = now - createDate;
    console.log(createDate);

    if (diffInMilliseconds < 60 * 60 * 1000) {
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      return `${diffInMinutes}분 전`;
    } else if (diffInMilliseconds < 24 * 60 * 60 * 1000) {
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      return `${diffInDays}일 전`;
    }
  };

  const isNewPost = (createdAt) => {
    const createDate = new Date(createdAt);
    const now = new Date();

    const diffInMilliseconds = now - createDate;

    if (diffInMilliseconds < 60 * 60 * 1000) {
      return true;
    } 
    return false;
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response1 = await axios.get(
          process.env.REACT_APP_BACK_URL + "/post/news?campus=" + (prop.campus == 0 ? "global" : "medical")
        )
        setPosts(response1.data.data);
      } catch (error) {
        console.log("오류 발생: ", error);
      }
    };
    fetchPosts();
  }, [cookies.token, navigate, prop.campus]); 

  return (
    <div>
      {posts.slice(0,6).map((post, index) => (
        <Item key={post.postId}>
          <Link to={"/posts/" + post.postId}>
            <Wrapped isDone={post.close}>
              <div>{post.location.slice(2)}</div>
              <Title>{post.title}</Title>
             
              <CreatedTime>{isNewPost(post.createdAt) ?  <NewSign>N</NewSign> : null}{getTimeDiff(post.createdAt)} </CreatedTime>
            </Wrapped>
          </Link>
        </Item>
      ))}
    </div>
  );
};

export default RecentPosts;
