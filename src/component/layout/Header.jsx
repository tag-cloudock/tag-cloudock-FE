import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  height: 50px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`;

const HeaderText = styled.span`
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
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

const Header = ({headerType, headerText}) => {
    switch (headerType) {
      case "normal":
        return (
          <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <NewMsgCircle></NewMsgCircle>
                <img src="image/chat_icon.png" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
        );
      case "detail":
        return (
          <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <NewMsgCircle></NewMsgCircle>
                <img src="image/chat_icon.png" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
        );
      case "drafting":
        return (
          <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
          </HeaderBox>
        );
      case "chat":
        return (
          <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
          </HeaderBox>
        );
      default:
        return (
          <HeaderBox>
          </HeaderBox>
        );
    }
    
  };

export default Header;