import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import Header from "../layout/Header";
import Loading from "../layout/Loading";

const DurationText = styled.span`
  color:#aaaaaa;
`;

const DurationDate = styled.span`
  color:#457be8;
`;

const PostImg = styled.div`
  margin: 10px 10px;
  width:40px;
  height: 40px;
  border-radius: 10px;
  background: #dddddd;
  float:left;
  /* font-size: 20px;
  color:#222222;
  margin-top: 5px;
  line-height: 30px; */
`;
const PostTitle = styled.div`
  font-size: 20px;
  color:#222222;
  margin-top: 8px;
  /* line-height: 30px; */
`;
const PostDuration = styled.div`
  /* line-height: 30px; */
  color:#555555;
`;
const PostInfo = styled.div`
  padding: 5px;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #eeeeee;
`;
const MessagesBox = styled.ul`
  /* height: 1000px; */
  /* margin: 100px 0px; */
  @media screen and (min-width: 1001px) {
    margin: 0px auto;
    max-width: 1001px;
  }
  width: 100%;
`;
const MessageBlock= styled.div`
  text-align:  ${({ isMe }) => (isMe ? 'right' : 'left')};
  width: 100%;
  display: flex;
  justify-content: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
`;

const MessageTime= styled.span`
  font-size: 12px;
  color: #aaaaaa;
  order:  ${({ isMe }) => (isMe ? 1 : 2)};
  position: relative;
  /* display: inline-block; */
  top: 12px;
  right: -5px;
`;
const Message = styled.li`
  order:  ${({ isMe }) => (isMe ? 2 : 1)};
  word-break: break-all;
  margin: 10px;
  display:inline-block ;
  vertical-align: left;
  text-align: left;
  max-width: 250px;
  background: ${({ isMe }) => (isMe ? '#4784ffe9' : 'none')};
  color: ${({ isMe }) => (isMe ? '#ffffff' : '000000')};
  /* background: #eeeeee; */
  padding: 12px;
  line-height: 20px;
  list-style: none;
  border:${({ isMe }) => (isMe ? 'none' : '1px solid #dddddd')};
  border-radius: 20px;
  font-weight: 500;
`;
const MessageInputBox = styled.div`
  display: flex;

    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0; 
    right: 0;
    height: 75px;
    background: #ffffff;
    /* box-shadow: rgba(149, 157, 165, 0.3) 0px 0px 24px; */
    @media screen and (min-width: 1001px) {
      margin: 0px auto;
      max-width: 1001px;
    }
`;

const InputBox = styled.input`
    margin: 10px;
    width: 85%;
    height: 40px;
    background: #eeeeee;
    border: none;
    border-radius: 20px;
    color:#333333;
    padding: 0px 20px;
    font-size: 18px;
    outline: none;
    &::placeholder {
        color: #aaaaaa; 
    /* font-style: italic;  */
        font-size: 18px;
    }
`;
const EmptyBox = styled.div`
  height: 70px;
`;

const SendBtn = styled.button`
   margin: 10px 10px 0px 0px;
   height: 40px;
   background: none;
   border: none;
   width: 15%;
   border-radius: 13px;
   border: ${({ isNoText }) => (isNoText ? '1px solid #cccccc' : 'none')};
   background: ${({ isNoText }) => (isNoText ? 'none' : '#76a4ffe9')};
   color: ${({ isNoText }) => (isNoText ? '#8CB3FF' : '#ffffff')};

   font-weight: 500;
   /* & img{
     width: 20px;
   } */
`;

const BottomPoint = styled.div`
   /* height: 100px; */
   margin-bottom: 80px;
`;
const InChat = () => {
  const location = useLocation();
  console.log(location)
  const postId = location.state.postId;
  const inputMessageRef = useRef();
  const messagesEndRef = useRef(null);
  const [messageList, setMessageList] = useState([]);
  const [cookies] = useCookies(["token","userId"]);
  const { metype,id, other } = useParams();
  const navigate = useNavigate();
  const ws = useRef(null);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);


  const [postInfo, setPostInfo] = useState({needAt: [], returnAt:[]});

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);
  
  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      try {
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        const response = await axios.get("http://127.0.0.1:8080/chat/message/"+id, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        console.log(response.data);

        setMessageList(response.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    const fetchPostInfo = async () => {
      try {
        if (!cookies.token) {
          navigate("/signin");
          return;
        }

        // API 요청 시 Authorization 헤더에 토큰을 추가
        const response = await axios.get("http://127.0.0.1:8080/post/"+postId, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        setPostInfo(response.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchMessages();
    fetchPostInfo();
    // setLoading(false); 
  }, []); 


  useEffect(() => {
    
    // 컴포넌트가 마운트되면 웹 소켓 연결
    ws.current = new WebSocket('ws://localhost:8080/ws/chat');
    
    ws.current.onopen = () => {
      const message = {
        type: 'ENTER',
        userType: metype === "b" ? "LENDER" : "BORROWER",
        roomId: id,
        sender: cookies.userId,
        message: "",
      };
      // JSON 형식으로 문자열 변환 후 웹 소켓으로 전송
      ws.current.send(JSON.stringify(message));
    };
    ws.current.onmessage = (event) => {
      // 메시지를 받으면 실행될 코드
      const receivedMessage = JSON.parse(event.data);
      console.log(receivedMessage);
      const currentDate = new Date();
      const newMessage = {
        chatId: new Date(),
        sentAt:  [
          currentDate.getFullYear(),
          currentDate.getMonth() + 1, 
          currentDate.getDate(),
          currentDate.getHours(),
          currentDate.getMinutes(),
          currentDate.getSeconds(),
          currentDate.getMilliseconds()
        ],
        message: receivedMessage.message,
        userType: receivedMessage.userType,
      };
      console.log(newMessage);
    
      // const newMessageList = [...messageList, message];
      setMessageList(prevMessageList => [...prevMessageList, newMessage]);
    };
    // 컴포넌트가 언마운트될 때 웹 소켓 연결 해제
    return () => {
      ws.current.close();
    };
  }, []);


  const sendMessage = () => {
    if (inputMessage < 1) {
      inputMessageRef.current.focus();
      return;
    }
    const message = {
      type: 'TALK',
      userType: metype === "b" ? "BORROWER" : "LENDER",
      roomId: id,
      sender: cookies.userId,
      message: inputMessage,
    };
    ws.current.send(JSON.stringify(message));
    setInputMessage('');
    inputMessageRef.current.focus();
  };

  const activeEnter = (event) => {
    if (event.code === 'Enter') {
      sendMessage();
    }
  };
  return (
      <div>
        <Header headerType={"inChat"} headerText={"<"} otherUserNickname={other}></Header>
        <Link to={'/post/'+postInfo.postId}>
          <PostInfo>
              <PostImg></PostImg>
              <PostTitle>{postInfo.title}</PostTitle>
              <PostDuration>  <DurationDate>{postInfo.needAt[1]}/{postInfo.needAt[2]}</DurationDate> <DurationText>부터</DurationText> <DurationDate>{postInfo.returnAt[1]}/{postInfo.returnAt[2]}</DurationDate> <DurationText>까지 대여희망</DurationText></PostDuration>
          </PostInfo>
        </Link>
        <EmptyBox></EmptyBox>
        <MessagesBox>
          {messageList.map((message) => (
            <MessageBlock isMe={(message.userType === "BORROWER" && metype === "b")||(message.userType === "LENDER" && metype === "l")}>
            <MessageTime isMe={(message.userType === "BORROWER" && metype === "b")||(message.userType === "LENDER" && metype === "l")}>{message.sentAt[3]}:{message.sentAt[4]}</MessageTime>
            <Message key={message.chatId} isMe={(message.userType === "BORROWER" && metype === "b")||(message.userType === "LENDER" && metype === "l")}>
                {message.message}
            </Message>
            </MessageBlock>
          ))}
          <BottomPoint ref={messagesEndRef}></BottomPoint>
        </MessagesBox>
        
        <MessageInputBox>
            <InputBox placeholder="메세지 보내기" 
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
          }}
          onKeyDown={(e) => {activeEnter(e)}}
          ref={inputMessageRef}
          ></InputBox>
          {loading ? <Loading /> : null}
            <SendBtn onClick={sendMessage} isNoText={inputMessage < 1}>
                SEND
                {/* <img src="/image/send.png" alt="" />     */}
            </SendBtn>
        </MessageInputBox>
      </div>
  );
};

export default InChat;