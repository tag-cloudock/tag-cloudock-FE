
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  z-index: 2;
  background: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  height: 70px;
  box-shadow: rgba(113, 113, 113, 0.2) 0px 10px 10px -10px;
  @media screen and (min-width: 1001px) {
    margin: 0px auto;
    max-width: 1001px;
  }
`;

const EmptyBox = styled.div`
  height: 70px;
`;

const HeaderText = styled.span`
  display: inline-block;
  padding-left: 20px;
  padding-top: 30px;
  /* height: 70px; */
  /* line-height: 70px; */
  color: #707070;
  font-weight: 700;
  font-size: 20px;
`;

const HeaderOtherUser = styled.span`
  display: inline-block;
  text-align: center;
  /* float: right; */
  width: 80%;
  height: 50px;
  /* line-height: 50px; */
  color: #9d9d9d;
  font-weight: 700;
  font-size: 20px;
  margin-top: 30px;
`;

const HeaderBackBtn = styled.button`
  width: 10%;
  /* padding-left: 20px; */
  height: 70px;
  line-height: 70px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
  background: none;
  border: none;
  float: left;
  & img{
    margin-top: 20px;
    /* height: 50px; */
  }
`;

const ChatBtn = styled.div`
  position: relative;
  float: right;
  margin-top: 27px;
  margin-right: 20px;
  background: none;
  border: none;
  & a{
    display: inline-block;
  }
`;

const NewMsgCircle= styled.div`
  position: absolute;
  top: -2px;
  left: 23px;
  float: right;
  width: 8px;
  height: 8px;
  background: #8CB3FF;
  border-radius: 15px;

`;

const Header = ({headerType, headerText, otherUserNickname}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // 이전 페이지로 이동
    };
    switch (headerType) {
      case "normal":
        return (
          <div>
            <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <NewMsgCircle></NewMsgCircle>
                <img src="image/chat_icon.png" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
          
        );
      case "detail":
        return (
          <div>
            <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <NewMsgCircle></NewMsgCircle>
                <img src="image/chat_icon.png" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
          
        );
      case "drafting":
        return (
          <div>
            <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
          
        );
      case "chat":
        return (
          <div>
            <HeaderBox>
              <HeaderText>{headerText}</HeaderText>
            </HeaderBox>
            <EmptyBox></EmptyBox>
          </div>

        );
      case "inChat":
        return (
          <div>
            <HeaderBox>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/go_back.png" alt="" /></HeaderBackBtn>
            <HeaderOtherUser>{otherUserNickname}</HeaderOtherUser>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          
          </div>
          
        );
      default:
        return (
          <div>
            <HeaderBox></HeaderBox>
            <EmptyBox></EmptyBox>
          </div>

        );
    }
    
  };

export default Header;