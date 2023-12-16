
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  z-index: 2;
  background: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  border-bottom: 1px solid #eeeeee;
  @media screen and (min-width: 701px) {
    margin: 0px auto;
    max-width: 701px;
  }
`;

const EmptyBox = styled.div`
  height: 50px;
`;

const HeaderText = styled.span`
  display: inline-block;
  padding-left: 20px;
  padding-top: 20px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
`;

const HeaderOtherUser = styled.span`
  display: inline-block;
  text-align: center;
  width: 80%;
  height: 50px;
  color: #757575;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
`;

const HeaderBackBtn = styled.button`
  width: 10%;
  height: 70px;
  line-height: 70px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
  background: none;
  border: none;
  float: left;
  & img{
    margin-top: 12px;
  }
`;

const ChatBtn = styled.div`
  position: relative;
  float: right;
  margin-top: 20px;
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
                {/* <NewMsgCircle></NewMsgCircle> */}
                <img src="image/chat.svg" alt="" />
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
                {/* <NewMsgCircle></NewMsgCircle> */}
                <img src="image/chat.svg" alt="" />
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
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/back.svg" alt="" /></HeaderBackBtn>
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