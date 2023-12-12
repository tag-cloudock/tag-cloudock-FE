import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import Header from "../layout/Header";

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
`;
const Message = styled.li`
  word-break: break-all;
  margin: 10px;
  /* float: right; */
  display:inline-block ;
  vertical-align: left;
  text-align: left;
  max-width: 200px;
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

const SendBtn = styled.button`
   margin: 10px 10px 0px 0px;
   height: 40px;
   background: none;
   border: none;
   width: 15%;
   border-radius: 13px;
   border: 1px solid #cccccc;
   color:#4784ffe9;
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
  const inputMessageRef = useRef();
  const messagesEndRef = useRef(null);
  const [messageList, setMessageList] = useState([]);
  const [cookies] = useCookies(["token","userId"]);
  const { metype,id, other } = useParams();
  const navigate = useNavigate();
  const ws = useRef(null);
  const [inputMessage, setInputMessage] = useState("");

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

      const newMessage = {
        chatId: new Date(),
        sentAt:  new Date(),
        message: receivedMessage.message,
        userType: receivedMessage.userType,
      };
    
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

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [messageList]);
  
  useEffect(() => {
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

    fetchMessages();
  }, []); 

  const activeEnter = (event) => {
    if (event.code == 'Enter') {
      sendMessage();
    }
  };
  return (
      <div>
        <Header headerType={"inChat"} headerText={"<"} otherUserNickname={other}></Header>

        <MessagesBox>
          {messageList.map((message) => (
            <MessageBlock isMe={(message.userType === "BORROWER" && metype === "b")||(message.userType === "LENDER" && metype === "l")}>
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
            <SendBtn onClick={sendMessage}>
                SEND
                {/* <img src="/image/send.png" alt="" />     */}
            </SendBtn>
        </MessageInputBox>
      </div>
  );
};

export default InChat;