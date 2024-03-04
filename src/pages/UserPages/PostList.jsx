import Header from "../../components/layout/Header";
import styled from "styled-components";
import MenuBar from "../../components/layout/MenuBar";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
//전체 배경
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

//박스 양옆 여백
const PostBox = styled.div`
`;

//list 박스
const BoardBox = styled.div`
  background: #fff;
  padding: 5px 0px;
  & a:last-child div {
    border-bottom: none;
  }
`;

const Item = styled.div`
border-bottom: 1px solid #eaeaea;

padding: 20px;
& > * {
    opacity: ${({ isDone }) => (isDone ? "30%" : '100%')};
  }
`;

//list 박스 사이 구분선
const Listbox = styled.div`
  
`;

//게시물 이미지
const MainImage = styled.div`
  margin-right: 15px;
  width: 75px;
  height: 75px;
  float: left;
  /* border-radius: 10px; */

  /* overflow: hidden; */
  /* background: #dfdfdf; */
  & img{
    border: 1px solid #eeeeee;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    /* max-height: 400px; */
    object-fit: cover;
    object-position: center;
  }
`;

//게시물 제목
const NoticeTitle = styled.div`
color: #1F1F1F;
width: 70%;
font-size: 15px;
font-weight: 500;
white-space: nowrap; 
overflow: hidden; 
text-overflow: ellipsis; 
`;

//게시물 상세설명(건물 위치등)
const PostDetail = styled.div`
color: #606060;
font-size: 12px;
font-weight: 400;
margin-top: 5px;
`;

//게시물 가격
const PostPrice = styled.div`
color: #000;

font-size: 14px;
font-weight: 500;
margin-top: 20px;
`;

//게시물 옆에 채팅? 댓글 아이콘
const ImageIcon = styled.img`
  width: 17px;
  height: 17px;
  float: right;
  vertical-align: middle;
  margin-left: auto;
`;

const NoPostBox = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top:40%;
  display: block;
  max-width: 700px;
  color : #cacaca;
  font-size: 20px;
  font-weight: 700;
`;

const NoPostText = styled.div`
  font-size: 50px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const DoneTag = styled.div`
  float: left;
  font-size: 13px;
  padding: 3px 5px;
  color: #ffffff;
  background-color: #2edb5c;
  /* border: 1px solid #3cf858; */
  border-radius:15px;
  margin-right: 3px;
  margin-top: -1px;

`;

const PostList = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [locationName, setLocationName] = useState("");
  useEffect(() => {
    // 최신 글 업로드
    const fetchPosts = async () => {
      try {
        const locationValue = new URLSearchParams(location.search).get('location');
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/post/all/"+locationValue
        );
        setPosts(response.data);
        setLocationName(locationValue);
        console.log(response);

      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <Container>
      <Header headerText={locationName.slice(2)}>         
      </Header>
      <PostBox>
        <BoardBox>
          
          { posts.length != 0 ?posts.map((post, index) => (
            <Link to={"/posts/"+post.postId} key={index}>
              <Item isDone={post.close}>
                <MainImage><img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + post.postImgPath}></img></MainImage>
              <Listbox > 
                <NoticeTitle>{post.title}</NoticeTitle>
                <PostDetail>{post.location.slice(2)+" "+post.locationDetail}</PostDetail>
                <PostPrice>{post.rentalFee}원
                <ImageIcon src={"/image/chatt.svg"} alt="" />
                </PostPrice>
              </Listbox>
              </Item>
              
            </Link>
          ))
        :
        <NoPostBox>
          <NoPostText>썰렁~</NoPostText>
          {locationName.slice(2)} 사람들은 빌릴게 없나봐요ㅜㅜ
        </NoPostBox>}
        </BoardBox>
      </PostBox>
      <MenuBar></MenuBar>
    </Container>
  );
};

export default PostList;
