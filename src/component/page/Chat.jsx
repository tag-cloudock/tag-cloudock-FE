import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";

const ChatRoom = styled.li`
  background: #ffffff;
  padding: 18px 20px;
  height : 50px;
  line-height: 23px;
  border-bottom: 1px solid #eeeeee;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

const UserImg = styled.a`
  display: block;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: 1px solid #dddddd;
  margin-right: 10px;
  background: #ffffff;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 900;
  color: #dddddd;

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
  background: #ffffff;
  height: 50px;
  width: 50px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid #dddddd;
`;
const NickName = styled.span`
  font-weight: 800;
  color: #777777;
`;
const LastMessageTime = styled.span`
  color: #aaaaaa;
  font-size: 13px;
`;
const LastMessage = styled.span`
  display: block;
  color : #000000;
`;

const Chat = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        console.log(!cookies.token);
        if (!cookies.token) {
          navigate("/signin");
          return;
        }

        // API 요청 시 Authorization 헤더에 토큰을 추가
        const response = await axios.get("http://127.0.0.1:8080/chat/user", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        console.log(response.data);

        setChatRoomList(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/signin");
        } else {
          console.error("오류 발생:", error);
        }
      }
    };

    fetchChatRooms();
  }, []); 

  return (
      <div>
        <Header headerType={"chat"} headerText={"채팅"}></Header>
        <ul>
          {chatRoomList.map((chatRoom) => (
            <Link to={"/chat/"+(chatRoom.userType == "BORROWER" ? 'b' : 'l')+"/"+chatRoom.roomId+"/"+(chatRoom.userType == "BORROWER" ? chatRoom.lenderNickname : chatRoom.borrowerNickname)} state={{ postId:chatRoom.postId }}>
              <ChatRoom key={chatRoom.id}>
                <Link to={"/"}><UserImg>바로</UserImg></Link>
                <ChatRoomContent>
                <NickName>{chatRoom.userType == "BORROWER" ? chatRoom.lenderNickname : chatRoom.borrowerNickname}</NickName>
                <LastMessageTime>{chatRoom.lastMessage != "no message" ? " "+chatRoom.lastMessageTime[3]+"시 "+chatRoom.lastMessageTime[4]+"분" : ""}</LastMessageTime><br></br>
                <LastMessage>{chatRoom.lastMessage != "no message" ? chatRoom.lastMessage : "채팅이 시작되었습니다!"}</LastMessage>
                </ChatRoomContent>
                <Link to={"/"}><PostImg></PostImg></Link>
              </ChatRoom>
            </Link>
          ))}
        </ul>
        <MenuBar></MenuBar>
      </div>
  );
};

export default Chat;