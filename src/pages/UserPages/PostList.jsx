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
  & div a:last-child div {
    border-bottom: none;
  }
`;

const Item = styled.div`
border-bottom: 1px solid #eeeeee;

display: flex;
/* justify-content: space-evenly; */
padding: 20px;
& > * {
    opacity: ${({ isDone }) => (isDone ? "30%" : '100%')};
  }
`;

//list 박스 사이 구분선
const Listbox = styled.div`
  position: relative;
  /* width: 100%; */
  flex-grow: 1; 
`;

//게시물 이미지
const MainImage = styled.div`
  margin-right: 15px;
  width: 75px;
  height: 75px;
  /* float: left; */
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
display: inline-block;
color: #606060;
font-size: 12px;
font-weight: 400;
margin-top: 5px;
`;
const CreatedAt = styled.div`
display: inline-block;
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
/* margin-top: 20px; */
position: absolute;
bottom: 0;
`;

//게시물 옆에 채팅? 댓글 아이콘
const ImageIcon = styled.img`
  width: 17px;
  height: 17px;
  vertical-align: middle;
  margin-left: auto;
`;

const ChatRoomCount = styled.span`
  margin-left: 5px;
  width: 17px;
  height: 17px;
  font-size: 15px;
  color: #9a9a9a;
  line-height: 17px;
  /* float: right; */
  
`;

const ChatRoomCntBox = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const NoPostBox = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top:40%;
  display: block;
  max-width: 700px;
  color : #e6e6e6;
  font-size: 20px;
  /* font-weight: 700; */
`;

const NoPostText = styled.div`
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const PageMove = styled.div`
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #6093FF;
  & a{
    color: #6093FF;
  }

`;


const MoveBtn = styled.span`
  ${({ isLimited}) => (isLimited ? "color: #b1b1b1;" : null)};

`;

const PostList = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [campusName, setCampusName] = useState("");
  const [type, setType] = useState();
  const locationValue = new URLSearchParams(location.search).get('location');
  const campusValue = new URLSearchParams(location.search).get('campus');
  const pageValue = parseInt(new URLSearchParams(location.search).get('page'));
  useEffect(() => {
    // 최신 글 업로드
    const fetchPosts = async () => {
      try {
        var response;
        if (locationValue != null) {
          setType("LOCATION");
          setLocationName(locationValue);
          response = await axios.get(
          process.env.REACT_APP_BACK_URL + "/post/all/location/" + locationValue + "/" + pageValue
          );
        } else {
          setType("CAMPUS");
          setCampusName(campusValue);
          response = await axios.get(
            process.env.REACT_APP_BACK_URL + "/post/all/campus/" + campusValue + "/" + pageValue
          );
        }

        setPosts(response.data.data.posts);
        setIsLast(response.data.data.last);

      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchPosts();
  }, [pageValue, locationValue, campusValue]);
  const getTimeDiff = (createdAt) => {
    const createDate = new Date(createdAt);
    const now = new Date();

    const diffInMilliseconds = now - createDate;

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
  return (
    <Container>
      <Header headerText={type == "LOCATION" ? locationName.slice(2) : (campusName == "global" ? "글로벌" : "메디컬") + " 최근 글"}>
      </Header>
      <PostBox>
        <BoardBox>

          {posts.length != 0 ? 
          <div>
            {posts.map((post, index) => (
            <Link to={"/posts/" + post.postId} key={index}>
              <Item isDone={post.close}>
                <MainImage><img src={process.env.REACT_APP_BACK_URL + "/image/" + post.postImgPath}></img></MainImage>
                <Listbox >
                  <NoticeTitle>{post.title}</NoticeTitle>
                  <div>
                  <PostDetail>{post.location.slice(2) + " " + post.locationDetail}</PostDetail>·
                  <CreatedAt>{getTimeDiff(post.createdAt)}</CreatedAt>
                  </div>

                  {/* <PostDetail>{post.location.slice(2) + " " + post.locationDetail}</PostDetail> */}
                  <PostPrice>{post.rentalFee}원</PostPrice>
                  <ChatRoomCntBox>
                  <ImageIcon src={"/image/chatt.svg"} alt="" />
                  <ChatRoomCount>{post.chatCount}</ChatRoomCount>
                  </ChatRoomCntBox>
                </Listbox>
              </Item>
            </Link>
          ))}
          <PageMove><Link to={"/posts?campus=global&page="+(pageValue-1 < 0 ? 0 : pageValue-1)}><MoveBtn isLimited={pageValue == 0}>이전</MoveBtn></Link> | <Link to={"/posts?campus=global&page="+(isLast ? pageValue : pageValue + 1)}><MoveBtn isLimited={isLast}>다음</MoveBtn></Link></PageMove>
          </div>
      
            :
            <NoPostBox>
              <NoPostText>썰렁</NoPostText>
              {type == "LOCATION" ? locationName.slice(2) : (campusName == "global" ? "글로벌" : "메디컬")} 사람들은 빌릴게 없어요
            </NoPostBox>
            }
        </BoardBox>
      </PostBox>
      <MenuBar></MenuBar>
    </Container>
  );
};

export default PostList;
