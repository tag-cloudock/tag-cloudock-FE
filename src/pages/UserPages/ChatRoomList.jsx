import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
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
  color: #dedede;

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

const NoChatBox = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top:40%;
  display: block;
  max-width: 700px;
  color : #cacaca;
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

const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [cookies] = useCookies(); 
  const navigate = useNavigate();

  useEffect(() => {
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
        console.log(response.data);

        setChatRoomList(response.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchChatRooms();
  }, [cookies.token, navigate]);

  return (
    <ChatBox>
      <Header headerType={"noChatIcon"} headerText={"채팅"}></Header>

      {chatRoomList.length == 0 ?
        <NoChatBox>
          <NoChatText>썰렁~</NoChatText>
          <Link to={"/"}><MoveToPost>빌려줄수있는 물건 보러 가기!</MoveToPost></Link>
        </NoChatBox>
        :
        <ul>
          {chatRoomList.map((chatRoom) => (
            <Link key={chatRoom.id} to={"/chat/" + (chatRoom.userType === "BORROWER" ? 'b' : 'l') + "/" + chatRoom.roomId + "/" + (chatRoom.userType === "BORROWER" ? chatRoom.lenderNickname : chatRoom.borrowerNickname)} state={{ postId: chatRoom.postId }}>
              <ChatRoom key={chatRoom.id}>
                <Link to={"/"}><UserImg></UserImg></Link>
                <ChatRoomContent>
                  <NickName>{chatRoom.userType === "BORROWER" ? chatRoom.lenderNickname : chatRoom.borrowerNickname}</NickName>
                  <LastMessageTime>{chatRoom.lastMessage !== "no message" ? " " + chatRoom.lastMessageTime[3] + "시 " + chatRoom.lastMessageTime[4] + "분" : ""}</LastMessageTime><br></br>
                  <LastMessage>{chatRoom.lastMessage !== "no message" ? chatRoom.lastMessage : "채팅이 시작되었습니다!"}</LastMessage>
                </ChatRoomContent>
                <Link to={"/"}><PostImg></PostImg></Link>
              </ChatRoom>
            </Link>
          ))}
        </ul>
      }
      <MenuBar></MenuBar>
    </ChatBox>
  );
};

export default ChatRoomList;



