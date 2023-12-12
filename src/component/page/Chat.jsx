import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";

const ChatRoom = styled.li`
  padding: 18px 20px;
  height : 50px;
  line-height: 23px;
  border-bottom: 1px solid #eeeeee;
  list-style: none;
`;
const NickName = styled.span`
  font-weight: 800;
  color: #555555;
`;
const LastMessageTime = styled.span`
  color: #aaaaaa;
  font-size: 13px;
`;
const LastMessage = styled.span`
  /* font-weight: 800; */
  color : #000000;
`;

const Chat = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
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
        console.error("오류 발생:", error);
      }
    };

    fetchChatRooms();
  }, []); 

  return (
      <div>
        <Header headerType={"chat"} headerText={"채팅"}></Header>
        <ul>
          {chatRoomList.map((chatRoom) => (
            <Link to={"/chat/"+(chatRoom.userType == "BORROWER" ? 'b' : 'l')+"/"+chatRoom.roomId+"/"+(chatRoom.userType == "BORROWER" ? chatRoom.lenderNickname : chatRoom.borrowerNickname)}>
              <ChatRoom key={chatRoom.id}>
                <NickName>{chatRoom.userType == "BORROWER" ? chatRoom.lenderNickname : chatRoom.borrowerNickname}</NickName>
                <LastMessageTime>{chatRoom.lastMessage != "no message" ? " "+chatRoom.lastMessageTime[3]+"시 "+chatRoom.lastMessageTime[4]+"분" : ""}</LastMessageTime><br></br>
                <LastMessage>{chatRoom.lastMessage != "no message" ? chatRoom.lastMessage : "채팅이 시작되었습니다!"}</LastMessage>
              </ChatRoom>
            </Link>
          ))}
        </ul>
        <MenuBar></MenuBar>
      </div>
  );
};

export default Chat;