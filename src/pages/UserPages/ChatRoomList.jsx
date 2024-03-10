import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import Header from "../../components/layout/Header";
import MenuBar from "../../components/layout/MenuBar";

const ChatBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const ChatRoom = styled.li`
  background: #ffffff;
  padding: 18px 20px;
  height : 50px;
  line-height: 23px;
  border-bottom: 1px solid #eeeeee;
  list-style: none;
  display: flex;
  justify-content: space-between;
  & > * {
    opacity: ${({ isDone }) => (isDone ? "30%" : '100%')};
  }
`;

const UserImg = styled.a`
  display: block;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  & img{
    border-radius: 100px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border: 1px solid #dddddd;
  }
`;

const ChatRoomContent = styled.div`
  flex: 1;
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  overflow: hidden;
  & span{
    overflow: hidden;
    text-overflow: ellipsis; 
  }
  
`;

const PostImg = styled.div`
  /* background: #ffffff; */
  height: 50px;
  width: 50px;
  margin-left: 10px;
  border-radius: 10px;
  & img{
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border: 1px solid #dddddd;
  }
`;

const NickName = styled.span`
  font-weight: 700;
  color: #000000;
`;

const LastMessageTime = styled.span`
  color: #aaaaaa;
  font-size: 13px;
  margin-left: 10px;
`;

const LastMessage = styled.span`
  display: block;
  color : #000000;
`;

const NoChatBox = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top:40%;
  display: block;
  max-width: 700px;
  color : #eeeeee;
  & a{
    color : #cacaca;
  }
`;

const NoChatText = styled.div`
  font-size: 50px;
  font-weight: 800;
`;

const MoveToPost = styled.div`
  display: inline-block;
  margin-top: 15px;
  font-size: 17px;
  line-height: 20px;
  font-weight: 400;
  border-bottom: 1px solid #cacaca;
  &:hover{
    color : #79BDFF;
    border-bottom: 1px solid #79BDFF;
  }
`;

// 학생회 캠퍼스 선택 박스 Parent
const CampusMoveBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

// 학생회 캠퍼스 선택 박스 Child
const CampusBox = styled.button`
  border: none;
  background: none;
`;


// 학생회 선택 Text
const CampusText = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 400;
  margin-top: 20px;
  font-family: 'Noto Sans KR'; 
  border-bottom: 1.5px solid #eeeeee;
  font-size: 17px;
  color: #c3cbd5;
  padding-bottom:5px;
  ${({ isOn }) => (isOn ? "color: #6093FF; border-bottom: 1.5px solid #6093FF;" : null)};
  &:hover {
    color: #6093FF;
    border-bottom: 1.5px solid #6093FF;
  }
`;


const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = useState([[], []]);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const [chatRoomType, setChatRoomType] = useState(cookies.roomType ? cookies.roomType : 0);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/signin");
      return;
    }
    const fetchChatRooms = async () => {
      try {
        if (!cookies.token) {
          navigate("/signin");
          return;
        }

        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/chat/user", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        setChatRoomList(response.data.data);
        console.log(response.data);
        if (response.data.code != 200) {
          navigate("/signin");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchChatRooms();
  }, [cookies.token, navigate]);

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
  return (
    <ChatBox>
      <Header headerType={"noChatIcon"} headerText={"채팅"}></Header>

      <CampusMoveBox>
        {/* 글캠 링크 추가 */}

        <CampusBox onClick={() => {
          setChatRoomType(0);
          setCookies("roomType", 0, {
            path: "/",
            expires: moment().add(1, "hours").toDate(),
          });
        }}>
          <CampusText isOn={chatRoomType == 0}>
            빌리고 있어요
          </CampusText>
        </CampusBox>
        {/* 메캠 링크 추가 */}
        <CampusBox onClick={() => {
          setChatRoomType(1);
          setCookies("roomType", 1, {
            path: "/",
            expires: moment().add(1, "hours").toDate(),
          });
        }}>
          <CampusText isOn={chatRoomType == 1}>
            빌려주고 있어요
          </CampusText>
        </CampusBox>
      </CampusMoveBox>

      {chatRoomList[chatRoomType].length == 0 ?
        <NoChatBox>
          <NoChatText>썰렁</NoChatText>
          <Link to={"/"}><MoveToPost>빌려줄수있는 물건 보러 가기!</MoveToPost></Link>
        </NoChatBox>
        :
        <ul>
          {chatRoomList[chatRoomType].map((chatRoom) => (
            <Link key={chatRoom.id} to={"/chat/" + (chatRoom.userType === "BORROWER" ? 'b' : 'l') + "/" + chatRoom.roomId + "/" + (chatRoom.userType === "BORROWER" ? chatRoom.lenderId : chatRoom.borrowerId) + "/" + chatRoom.postId} >
              <ChatRoom key={chatRoom.id} isDone={chatRoom.done}>
                <Link to={"/user/" + (chatRoom.userType === "BORROWER" ? chatRoom.lenderId : chatRoom.borrowerId)}><UserImg><img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + (chatRoom.userType === "BORROWER" ? chatRoom.lenderImgPath : chatRoom.borrowerImgPath)}></img></UserImg></Link>
                <ChatRoomContent>
                  <NickName>{chatRoom.userType === "BORROWER" ? chatRoom.lenderNickname : chatRoom.borrowerNickname}</NickName>
                  <LastMessageTime>{chatRoom.lastMessage !== "no message" ? getTimeDiff(chatRoom.lastMessageTime):""}</LastMessageTime><br></br>
                  <LastMessage>{chatRoom.lastMessage !== "no message" ? chatRoom.lastMessage : "채팅이 시작되었습니다!"}</LastMessage>
                </ChatRoomContent>
                <Link to={"/posts/" + chatRoom.postId}><PostImg><img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + chatRoom.postImgPath}></img></PostImg></Link>
              </ChatRoom>
            </Link>
          ))}
        </ul>
      }
    </ChatBox>
  );
};

export default ChatRoomList;