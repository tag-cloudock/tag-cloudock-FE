import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import Header from "../../components/layout/Header";
import Loading from "../../components/layout/Loading";


const ChatBox = styled.div`
  position: absolute;
  width: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const DateChange = styled.div`
  margin: 20px auto;
  width: 70%;
  height: 30px;
  border-radius: 20px;
  background: #eeeeee56;
  text-align: center;
  line-height: 30px;
  color:#aaaaaa;
`;

const PostImg = styled.div`
  margin: 10px 10px;
  width:40px;
  height: 40px;
  float:left;
  & img{
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border: 1px solid #eeeeee;
  }
`;

// 게시물 제목
const PostTitle = styled.div`
  font-size: 15px;
  line-height: 23px;
  color:#222222;
  margin-top: 8px;
  font-family: 'Noto Sans KR';

  /* width: 50px; */
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

// 게시물 정보 박스
const PostInfo = styled.div`
  z-index: 1;
  position: fixed;
  top: 49px;
  left: 0;
  right: 0;
  height: 60px;
  /* margin: 0px 10px; */
  background-color: #fafafa;
  /* box-shadow: 0px 2px 15px 0px rgba(157, 157, 157, 0.2); */
  @media screen and (min-width: 701px) {
    margin: 0 auto;
    width: 700px;
    border-radius: 13px;
  }
`;

// 게시물 기한
const PostDuration = styled.div`
`;

// 기한 글자
const DurationText = styled.span`
  color:#aaaaaa;
  font-size: 13px;
`;

// 기한 숫자
const DurationDate = styled.span`
  background: #f5f8ff;
  border-radius: 20px;
  border: 1px solid #6093FF;
  font-size: 11px;
  padding: 2px 10px;
  font-weight: 700;
  color:#6093FF;
`;

// 메세지들
const MessagesBox = styled.ul`
  background: #ffffff;
  width: 100%;
`;

const TestBox = styled.div`
`;

// 메세지 라인 박스
const MessageBlock = styled.div`
  text-align:  ${({ isMe }) => (isMe ? 'right' : 'left')};
  width: 100%;
  display: flex;
  justify-content: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
`;

// 메세지 전송 시각
const MessageTime = styled.span`
  font-size: 12px;
  color: #aaaaaa;
  order:  ${({ isMe }) => (isMe ? 1 : 2)};
  position: relative;
  top: 12px;
  right: ${({ isMe }) => (isMe ? '-5px' : '5px')};
`;

// 메세지
const Message = styled.li`
  font-family: 'Noto Sans KR';
  order:  ${({ isMe }) => (isMe ? 2 : 1)};
  word-break: break-all;
  margin: 7px 10px;
  display:inline-block ;
  vertical-align: left;
  text-align: left;
  max-width: 250px;
  background: ${({ isMe }) => (isMe ? '#6093FF' : 'none')};
  color: ${({ isMe }) => (isMe ? '#ffffff' : '000000')};
  padding: 12px;
  line-height: 20px;
  list-style: none;
  border:${({ isMe }) => (isMe ? 'none' : '1px solid #dddddd')};
  border-radius: 20px;
  font-weight: 400;
`;

// 메세지 입력 박스
const MessageInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0; 
  right: 0;
  height: 75px;
  background: #ffffff;
  @media screen and (min-width: 701px) {
    margin: 0px auto;
    max-width: 701px;
  }
`;

// 메세지 입력
const InputBox = styled.input`
  margin: 10px;
  width: 85%;
  height: 40px;
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  color:#333333;
  padding: 0px 20px;
  font-size: 18px;
  outline: none;
  &::placeholder {
      color: #aaaaaa; 
      font-size: 18px;
  }
`;

// 헤더에 안가려지게 하는 더미 박스
const EmptyBox = styled.div`
  height: 60px;
  margin-bottom:20px;
`;

// 전송 버튼
const SendBtn = styled.button`
  margin: 10px 10px 0px 0px;
  height: 40px;
  background: none;
  border: none;
  width: 15%;
  border-radius: 13px;
  color: ${({ isNoText }) => (isNoText ? '#aaaaaa' : '#ffffff')};
  font-weight: 600;
  & img{
    border-radius: 10px;
    opacity: ${({ isNoText }) => (isNoText ? '30%' : '100%')};
    background: ${({ isNoText }) => (isNoText ? 'none' : '#EEF6FF')};
    width: 35px;
  }
`;

// 최하단 메세지 앵커
const BottomPoint = styled.div`
  margin-bottom: 70px;
  background: #ffffff;
`;

// 까꿍 이스터에그 박스
const HiddenTextBox = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
`;

// 까꿍 이스터에그 텍스트
const HiddenText = styled.div`
  text-align: center;
  margin: 10px;
  font-size: 30px;
  font-weight: 800;
  color : #ccd3d8;
`;

const PostText = styled.div`
    margin-right: 20px;
`;
const DoneBtn = styled.button`
  position: fixed;
  right: 10px;
  top:10px;
  border: none;
  /* margin-top: 12px; */
  float: right;
  padding: 7px 10px;
  background: #e2ebff;
  color:#6093FF;
  font-weight: 600;
  border-radius: 7px;
  font-size: 13px;
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

const ModalBox2 = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 400px;
  max-width: 400px;
  border-radius: 30px;
  background: #ffffff;
  
  position: relative;
  text-align: center;

`;

const ModalBtnBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBtn = styled.button`
  border: none;
  width: 40%;
  background: ${({ isLeft }) => (isLeft ? '#f5f5f5' : '#6093FF')};
  padding: 15px;
  text-align: center;
  border-radius: 15px;

  font-size: 15px;
  color:${({ isLeft }) => (isLeft ? '#aaaaaa' : '#FFFFFF')};
`;


const ModalText = styled.div`
  margin-top: 60px;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  line-height: 30px;
  & span{
    display: block;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 400;
  }
`;

const ModalText2 = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  line-height: 30px;
  & span{
    display: block;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 400;
  }
`;



const Nickname = styled.div`
  display: inline-block;
  background: #e4f2ff;
  padding: 3px 10px;
  border-radius: 15px;
`;


const TextareaBox = styled.textarea`
    width: 70%;
    height: 50px;
    resize: none;

    margin: 10px auto;
    background: #f5f5f5;
    border:none;
    /* border: 1px solid #dddddd; */

    border-radius: 10px;
    color:#333333;
    font-size: 15px; 
    outline: none;
    padding: 20px;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 15px;
    }
`;

const Stars = styled.div`
margin: 20px 20px;
    display: flex;
    justify-content: space-evenly;
`;

const Star = styled.button`
    width: 60px;
    height: 60px;
    & img{
      width: 60px;
      height: 60px;
      opacity: ${({ isSeleted }) => (isSeleted ? null : '30%')};
    }
    border: none;
    background: none;
`;



const Chat = () => {
  const location = useLocation(); // 상태 전달 받기 위해
  const [cookies] = useCookies(); // 쿠키 사용을 위해
  const { metype, id, interlocutorId, post } = useParams(); // 주소의 파라미터 값 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [rateData, setRateData] = useState(-1);
  const [review, setReview] = useState("");

  const postId = post;
  // 오랜 시간이 지나고 채팅 안에서 채팅룸으로 나가면 오류나는 이슈 있음.

  const inputMessageRef = useRef(); // 입력 박스 포커스용
  const messagesEndRef = useRef(null); // 메세지 최하단 이동용
  const ws = useRef(null); // 웹소켓

  // 상태
  const [interlocutorInfo, setInterlocutorInfo] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState({ needAt: [], returnAt: [] });

  const [isDoneModalOn, setIsDoneModalOn] = useState(false);
  const [isReviewModalOn, setIsReviewModalOn] = useState(false);

  const [isBorrower, setIsBorrower] = useState(false);
  // 최하단 이동용
  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  },);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/signin");
      return;
    }
    // 로딩 시작
    setLoading(true);
    // 모든 메세지 가져오기
    const fetchUserInfo = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        // 메세지 가져오기 api요청
        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/account?id=" +interlocutorId , {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        console.log(response.data);
        // 메세지 상태 저장
        setInterlocutorInfo(response.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        // 메세지 가져오기 api요청
        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/chat/message/" + id, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        console.log(response.data);
        // 메세지 상태 저장
        setMessageList(response.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    // 게시물 정보 가져오기
    const fetchPostInfo = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }

        // 게시물 정보 가져오기 api 요청
        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/post/" + postId, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        setPostInfo(response.data);
        console.log(response.data);
      } catch (error) {
        // 없는 게시물 이라면
        if (error.response && error.response.status === 404) {
          console.error("존재하지 않는 게시물", error);
          navigate("/");
        } else {
          console.error("오류 발생:", error);
        }
      }
    };
    fetchMessages();
    fetchPostInfo();
    fetchUserInfo();

    // 0.3초 동안 로딩후 로딩 종료
    setTimeout(() => {
      setLoading(false);
    }, 300)

  }, [cookies.token, id, navigate]);


  useEffect(() => {
    // 컴포넌트가 마운트되면 웹 소켓 연결
    ws.current = new WebSocket('ws://' + process.env.REACT_APP_BACK_URL + '/ws/chat');

    // 세션 등록
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

    // 메시지를 받으면 실행될 코드
    ws.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log(receivedMessage);
      const currentDate = new Date();

      // 받은 메세지 메세지 리스트 상태에 넣기위해 딕셔너리화
      const newMessage = {
        chatId: new Date(),
        sentAt: [
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
      setMessageList(prevMessageList => [...prevMessageList, newMessage]);
    };
    // 컴포넌트가 언마운트될 때 웹 소켓 연결 해제
    return () => {
      ws.current.close();
    };
  }, [cookies.userId, id, metype]);

  // 메세지 보내기
  const sendMessage = () => {

    // 아무 입력도 안했다면
    if (inputMessage < 1) {
      inputMessageRef.current.focus();
      return;
    }
    // 메세지 형식으로 변환후 전송
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

  // 엔터 입력하면 전송하도록
  const activeEnter = (event) => {
    if (event.code === 'Enter') {
      sendMessage();
    }
  };

  const handleDone = async (e, isWrite) => {
    e.preventDefault();

    
    try {
      if (isWrite){
        if (rateData == -1) {
          window.alert(rateData);
          return;
        }
        if (review.length == 0) {
          window.alert("후기를 작성해주세요");
          return;
        }
        const postId = postInfo.postId; 

        const writerType = isBorrower ? "BORROWER" : "LENDER";
      const recipientId = interlocutorInfo.id;
      var rate = "";
      if  (rateData == 0){
        rate = "LOVE";
      }else if (rateData == 1){
        rate = "GOOD";
      }else if (rateData == 2){
        rate = "BAD";
      }
      const text = review;
      const response2 = await axios.post(
        "http://" + process.env.REACT_APP_BACK_URL + "/review",
                {
                    postId,
                    writerType,
                    recipientId,
                    rate,
                    text
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );

      console.log(response2.data);
      }
      if (isBorrower){
        const response = await axios.put(

          "http://" + process.env.REACT_APP_BACK_URL + "/post/done/" + postInfo.postId + "/" + interlocutorInfo.id + "/" + cookies.id, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
        console.log(response.data);
      }
      window.alert("감사합니다 :D");
      navigate("/");
    } catch (error) {
      console.error("오류 발생:", error);
    }
};
  return (
    <ChatBox>
      <Header headerType={"noChatIcon"} headerText={interlocutorInfo.nickname}></Header>

      {/* 게시물 정보 */}
      {loading ? null :

        <PostInfo>
          <Link to={'/posts/' + postInfo.postId}>
            <PostImg><img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + postInfo.postImgPath}></img></PostImg>
            <PostText>
                <PostTitle>{postInfo.title}</PostTitle>
                <PostDuration>
                  <DurationDate>{postInfo.needAt[1]}/{postInfo.needAt[2]}</DurationDate> <DurationText>부터</DurationText> <DurationDate>{postInfo.returnAt[1]}/{postInfo.returnAt[2]}</DurationDate> <DurationText>까지 대여희망</DurationText>
                </PostDuration>
            </PostText>
          </Link>
          {!postInfo.isClose && postInfo.userId == cookies.id ? <DoneBtn onClick={() => {
            setIsBorrower(true);
            setIsDoneModalOn(true);
          }}>
            대여 완료
          </DoneBtn> : null}
          { postInfo.isClose && !postInfo.lenderWriteReview  && postInfo.userId != cookies.id  ? <DoneBtn onClick={() => {
            setIsBorrower(false);
            setIsReviewModalOn(true);
          }}>
            후기 작성
          </DoneBtn> : null}
        </PostInfo>
      }
      <EmptyBox>
        {loading ? null :
          <HiddenTextBox>
            <HiddenText>까꿍</HiddenText>
          </HiddenTextBox>}
      </EmptyBox>

      {/* 메세지 */}
      {/* {loading ? <Loading /> : null} */}
      <MessagesBox>
        <TestBox></TestBox>
        {loading ? null : messageList.map((message, index) => {
          const isMe = (message.userType === "BORROWER" && metype === "b") ||
            (message.userType === "LENDER" && metype === "l");
          return (
            <div>
              {index !== 0 && messageList[index - 1].sentAt[2] !== message.sentAt[2] ? <DateChange>{message.sentAt[0]}년 {message.sentAt[1]}월 {message.sentAt[2]}일</DateChange> : null}
              <MessageBlock isMe={isMe}>
                <MessageTime isMe={isMe}>{message.sentAt[3]}:{message.sentAt[4]}</MessageTime>
                <Message key={message.chatId} isMe={isMe}>
                  {message.message}
                </Message>
              </MessageBlock>
            </div>
          );

        })}
        {/* 최하단 포인트 */}
        <BottomPoint ref={messagesEndRef}>
        </BottomPoint>
      </MessagesBox>

      {/* 메세지 입력 박스 */}
      <MessageInputBox>
        <InputBox placeholder={postInfo.isClose ? "완료된 요청입니다" : "메세지 보내기"}
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          onKeyPress={(e) => { activeEnter(e) }}
          disabled = {postInfo.isClose}
          ref={inputMessageRef}
        ></InputBox>
        <SendBtn onClick={sendMessage} isNoText={inputMessage < 1}>
          <img src="/image/paperplane.svg" alt="" />
        </SendBtn>
      </MessageInputBox>

      {isDoneModalOn ?
        <ModalContainer>
          <ModalBox>
            <ModalText>
              <Nickname>{postInfo.nickname}</Nickname> 님과 <br></br>대여를 완료하였나요?<br></br>
            </ModalText>
            <ModalBtnBox>
              <ModalBtn onClick={() => {
                setIsDoneModalOn(false);
              }} isLeft={true}>
                아니요
              </ModalBtn>
              <ModalBtn onClick={() => {
                setIsDoneModalOn(false);
                setIsReviewModalOn(true);
              }} isMine={""}>
                네
              </ModalBtn>
            </ModalBtnBox>
          </ModalBox>
        </ModalContainer>
        : null}

      {isReviewModalOn ?
        <ModalContainer>
          <ModalBox2>
            <ModalText2>
              <Nickname>{postInfo.nickname}</Nickname> 님과의 <br></br> 대여는 어땠나요?<br></br>
            </ModalText2>
            <Stars>

              <Star isSeleted={rateData == 0} onClick={() => {
                        setRateData(0);
                    }}>
              <img src={"/image/smilingface.svg"} alt="" />
              </Star>
              <Star isSeleted={rateData == 1} onClick={() => {
                        setRateData(1);
                    }}>
              <img src={"/image/face.svg"} alt="" />
              </Star>
              <Star isSeleted={rateData == 2} onClick={() => {
                        setRateData(2);
                    }}>
              <img src={"/image/upsetface.svg"} alt="" />
              </Star>
            </Stars>

            <TextareaBox
              type="text"
              // ref={passwordRef}
              name="content"
              placeholder="후기를 작성해주세요!"
            onChange={(e) => {
              setReview(e.target.value);
            }}
            />

            <ModalBtnBox>
              {isBorrower ?<ModalBtn onClick={(e) => handleDone(e, false)} isLeft={true}>
                안할래요
              </ModalBtn> :
              <ModalBtn onClick={() => {
                setIsReviewModalOn(false);
              }}  isLeft={true}>
               취소 하기
            </ModalBtn>
            }
              
              <ModalBtn onClick={(e) => handleDone(e, true)}  isMine={""}>
                보내기
              </ModalBtn>
            </ModalBtnBox>
          </ModalBox2>
        </ModalContainer>
        : null}
    </ChatBox>
  );
};

export default Chat;