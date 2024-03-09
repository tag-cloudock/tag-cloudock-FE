import Header from "../../components/layout/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  padding: 20px;
`;

//list 박스
const BoardBox = styled.div`
  background: #fff;
  & a:last-child div {
    border-bottom: none;
  }
`;

//게시물 제목
const Title = styled.div`
color: #000000;
font-size: 20px;
font-weight: 700;
overflow: hidden; 
  text-overflow: ellipsis; 
`;

const PostInfo = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;
//게시물 작성자
const User = styled.div`
/* margin: 15px 0px 0px; */
color: rgb(103, 103, 103);
font-size: 15px;
& span{
  display: inline-block;
  margin-top: 3px;
}

`;

//게시물 작성자이미지
const UserImage = styled.div`
  margin-right: 5px;
  width: 25px;
  height: 25px;
  float: left;

  & img{
    border-radius: 100px;
    border: 1px solid #eeeeee;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

//게시물 날짜
const PostDate = styled.div`
  /* margin: -15px 0px 0px; */
  color: #828282;
  /* text-align: right; */
  font-size: 15px;
  font-weight: 400;
`;

//게시물 내용디테일
const Detail = styled.div`
width: 100%;
color: #000000;
font-size: 17px;
line-height: 27px;
font-weight: 400;
margin: 30px 0px 20px 0px;
white-space: pre-wrap;
/* word-wrap: break-word; */
& span{
  width: 100px;
}
`;

//게시물 이미지
const Image = styled.div`
  margin: 10px 0px 30px 0px;
  width: 100%;
  & img{
    border: 1px solid #eeeeee;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

//위치 가격 보증품 
const ListName = styled.div`
display: inline-block;
  color: #6093FF;
  font-size: 17px;
  background: #f0f5ff;
  padding: 5px 7px;
  border-radius: 7px;
  /* font-weight: 700; */
  /* float: left; */
  margin-right: 10px;
`;
//위치 가격 보증품 디테일
const ListNameDetail = styled.div`
  display: inline-block;
  color: #000000;
  font-size: 17px;
  font-weight: 400;
  /* margin: 0px 0px 5px 0px; */
`;

//빌린날 BOX
const BOX = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
  margin-top: 20px;
`;

const DateInfoBox = styled.div`
    
`;
//필요한날 타이틀
const DateTitle = styled.div`
  color: #676767;
  font-size: 17px;
  /* font-weight: 700; */
  text-align: center;
  margin-bottom: 5px;
`;
//필요한날짜
const DateText = styled.div`
  color: #676767;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

//날짜 몇일? 
const RangeDate = styled.div`
color: #676767;
font-size: 15px;
font-weight: 500;
margin-top: 11px;
`;

//대화하기
const ChatBox = styled.button`
width: 100%;
border: none;
margin: 30px 0px;
  /* margin: 20px 0px 100px 0px; */
  padding: 10px;
  border-radius: 8px;

  background:${({ isDone }) => (isDone ? '#d4e2ff' : '#6093FF')};
  color: var(--White, #FFF);
text-align: center;
font-size: 20px;
font-weight: 600;

`;

const InfoBox = styled.div`
  width: 100%;
  margin: 15px 0px;
`;

const ModalContainer = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000077;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 250px;
  max-width: 400px;
  border-radius: 30px;
  background: #ffffff;
  position: relative;
`;

const ModalBtnBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 15px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBtn = styled.button`
  border: none;
  width: 40%;
  background: ${({ isLeft }) => (isLeft ? '#f5f5f5' : '#6093FF')};
  padding: 15px 20px;
  text-align: center;
  border-radius: 15px;

  font-size: 15px;
  color:${({ isLeft }) => (isLeft ? '#aaaaaa' : '#FFFFFF')};
`;


const ModalText = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  line-height: 30px;
  & span{
    display: block;
    margin-top: 20px;
    font-size: 17px;
    color: #6093FF;
    font-weight: 400;
  }
`;


const Nickname = styled.div`
  display: inline-block;
  background: #e4f2ff;
  padding: 3px 10px;
  border-radius: 15px;
`;

const Done = styled.div`
  display: inline-block;
  background: #ffdede;
  padding: 0px 10px;
  border-radius: 15px;
`;

const PostDetail = () => {
  const navigate = useNavigate(); // 로그인 전 홈 진입 막기 위해
  const [post, setPost] = useState({ title: "", createdAt: [], needAt: [], returnAt: [], userImgPath: "default.png", postImgPath: "default.png", location: "" }); // 최신 글 사용 위해
  const [cookies] = useCookies(); // 쿠키 사용하기 위해
  const [difference, setDifference] = useState();
  const [isModalUp, setIsModalUp] = useState(false);
  const [isDoneModalUp, setIsDoneModalUp] = useState(false);
  const { id } = useParams();

  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
  }

  useEffect(() => {
    // 최신 글 업로드
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/post/" + id
        );
        console.log(response.data);
        setPost(response.data);
        const needAt = response.data.needAt[0] + "-" + response.data.needAt[1] + "-" + response.data.needAt[2];
        const returnAt = response.data.returnAt[0] + "-" + response.data.returnAt[1] + "-" + response.data.returnAt[2];
        console.log(needAt);
        setDifference(getDateDiff(needAt, returnAt));

      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchPosts();
  }, [cookies.token, navigate]);

  const handleGoTalk = async (e) => {
    e.preventDefault();

    const borrowerId = post.userId;
    const renderId = cookies.id;
    const postId = post.postId;

    try {
      const makeChatRoom = async () => {
        try {
          const response = await axios.post("http://" + process.env.REACT_APP_BACK_URL + "/chat",
            {
              borrowerId,
              renderId,
              postId
            },
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            });
          console.log(response.data);
          if (response.status === 200) {
            navigate("/chat/l/" + response.data.roomId + "/" + response.data.borrowerId + "/" + postId);
          }

        } catch (error) {
          console.log("채팅방 만들기 오류 발생: ", error);
        }
      };
      makeChatRoom();
    } catch (error) {
    }
  };

  const handleDonePost = async (e) => {
    e.preventDefault();
    try {
      const donePost = async () => {
        try {
          const response = await axios.put("http://" + process.env.REACT_APP_BACK_URL + "/post/done/"+post.postId,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            });
          console.log(response.data);
          setIsDoneModalUp(false);
          navigate("/");

        } catch (error) {
          console.log("오류 발생: ", error);
        }
      };
      donePost();
    } catch (error) {
    }
  };
  return (
    <Container>
      <Header headerType={"admin"}></Header>
      <PostBox>
        <BoardBox>
          <Title>{post.title}</Title>
          <PostInfo>
            <Link to={"/user/" + post.postId}>
              <User>
                <UserImage>
                  <img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + post.userImgPath}>
                  </img>
                </UserImage>
                <span>{post.nickname}</span>
              </User>
            </Link>
            <PostDate>{post.createdAt[0] + "." + post.createdAt[1] + "." + post.createdAt[2]}</PostDate>
          </PostInfo>
          <Detail>
            {post.content}
          </Detail>
          {
            post.postImgPath != "default.png" ? <Image><img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + post.postImgPath}></img></Image> : null
          }

          <InfoBox>
            <ListName>위치</ListName>
            <ListNameDetail>{post.location.slice(2) + " " + post.locationDetail}</ListNameDetail>
          </InfoBox>
          <InfoBox>
            <ListName>대여금</ListName>
            <ListNameDetail>{post.rentalFee}원</ListNameDetail>
          </InfoBox>
          <InfoBox>
            <ListName>보증품</ListName>
            <ListNameDetail>{post.security}</ListNameDetail>
          </InfoBox>
          <BOX>
            <DateInfoBox>
              <DateTitle>필요한 날</DateTitle>
              <DateText>{post.needAt[0] + "." + post.needAt[1] + "." + post.needAt[2]}</DateText>
            </DateInfoBox>
            <RangeDate>{difference}일</RangeDate>
            <DateInfoBox>
              <DateTitle>반납하는 날</DateTitle>
              <DateText>{post.returnAt[0] + "." + post.returnAt[1] + "." + post.returnAt[2]}</DateText>
            </DateInfoBox>
          </BOX>
          <ChatBox onClick={() => {
            if (post.userId == cookies.id ){
              setIsDoneModalUp(true);
            }else{
              setIsModalUp(true);
            }
          }} isDone={post.isClose} disabled={post.isClose}>{post.isClose ? "완료된 요청입니다" : post.userId == cookies.id ? "종료하기" : "대화하기"}</ChatBox>
        </BoardBox>
      </PostBox>

      {isDoneModalUp ?
        <ModalContainer>
          <ModalBox>
            <ModalText>
              요청을 <Done>종료</Done>하면<br></br>더 이상 대여가 불가능합니다.<br></br>
              <span>계속 하시겠습니까?</span>
            </ModalText>
            <ModalBtnBox>
              <ModalBtn onClick={() => {
                setIsDoneModalUp(false);
              }} isLeft={true}>
                아니요
              </ModalBtn>
              <ModalBtn onClick={handleDonePost}>
                종료하기
              </ModalBtn>
            </ModalBtnBox>
          </ModalBox>
        </ModalContainer>
        : null}

      {isModalUp ?
        <ModalContainer>
          <ModalBox>
            <ModalText>
              <Nickname>{post.nickname}</Nickname> 님은<br></br> 학생증 인증이 {post.certification ? "완료된" : "안된 "}학우에요!<br></br>
              <span>대화를 시작 할까요?</span>
            </ModalText>
            <ModalBtnBox>
              <ModalBtn onClick={() => {
                setIsModalUp(false);
              }} isLeft={true}>
                아니요
              </ModalBtn>
              <ModalBtn onClick={handleGoTalk}>
                시작하기
              </ModalBtn>
            </ModalBtnBox>
          </ModalBox>
        </ModalContainer>
        : null}
    </Container>

  );

};

export default PostDetail;