
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  z-index: 1;
  background: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  @media screen and (min-width: 1001px) {
    margin: 0px auto;
    max-width: 1001px;
  }
`;

const EmptyBox = styled.div`
  height: 50px;
`;

const HeaderText = styled.span`
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
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
  line-height: 50px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
`;

const HeaderBackBtn = styled.button`
  width: 10%;
  /* padding-left: 20px; */
  height: 50px;
  line-height: 50px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
  background: none;
  border: none;
`;

const ChatBtn = styled.button`
  position: relative;
  float: right;
  margin-top: 3px;
  margin-right: 20px;
  height: 50px;
  background: none;
  border: none;
`;

const NewMsgCircle= styled.div`
  position: absolute;
  left: 15px;
  float: right;
  width: 15px;
  height: 15px;
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
            <HeaderBackBtn onClick={handleGoBack}>{headerText}</HeaderBackBtn>
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