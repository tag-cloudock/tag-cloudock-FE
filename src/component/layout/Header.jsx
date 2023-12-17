import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  z-index: 2;
  background: ${({ nobg }) => (nobg ? 'none' : '#ffffff')};
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  border-bottom: ${({ nobg }) => (nobg ? 'none' : '1px solid #eeeeee')};
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
  height: 50px;
  line-height: 50px;
  color: rgb(112, 112, 112);
  font-weight: 700;
  font-size: 20px;
`;

const HomeTitle = styled.div`
  width: 30%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
  font-size: 23px;
  color:#C3C9D2;
  float: left ; 
`;
const AnnoBox = styled.div`
  height: 50px;
  width: 70%;
  float: left;
`;
const AnnoBack = styled.div`
  height: 30px;
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  background:#dce0e7;
`;
const AnnoImg = styled.img`
  float: left;
  margin: 5px;
  height: 20px;
`;
const AnnoText = styled.span`
  display: inline-block;
  margin: 5px;
  height: 20px;
  color: #ffffff;
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
`;
const HeaderCenterText = styled.span`
  text-align: center;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #757575;
  font-weight: 700;
  font-size: 20px;
`;

const HeaderBackBtn = styled.button`
  z-index: 1;
  position: absolute;
  left: 0;
  height: 50px;
  line-height: 50px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
  background: none;
  border: none;
  float: left;
  & img{
    height: 40px;
    margin: 5px 5px;
  }
`;

const ChatBtn = styled.div`
  position: relative;
  float: right;
  margin-top: 12px;
  margin-right: 20px;
  background: none;
  border: none;
  & a{
    display: inline-block;
  }
  & img{
    width: 27px;
  }
`;

// const NewMsgCircle= styled.div`
//   position: absolute;
//   top: -2px;
//   left: 23px;
//   float: right;
//   width: 8px;
//   height: 8px;
//   background: #8CB3FF;
//   border-radius: 15px;

// `;

const Header = ({headerType, headerText, otherUserNickname}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // 이전 페이지로 이동
    };
    switch (headerType) {
      case "home":
        return (
          <div>
            <HeaderBox nobg={"true"}>
                <HomeTitle>바로바로</HomeTitle>
                <AnnoBox>
                  <AnnoBack>
                    <AnnoImg src={"/image/megaphone.svg"} alt="" />
                    <AnnoText>서버 점검 예정</AnnoText>
                  </AnnoBack>
                </AnnoBox>
            </HeaderBox>
            <EmptyBox></EmptyBox>
          </div>
          
        );
      case "user":
        return (
          <div>
            <HeaderBox nobg={"true"}>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                {/* <NewMsgCircle></NewMsgCircle> */}
                <img src="/image/chat.svg" alt="" />
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
                <img src="/image/chat.svg" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
          
        );
      case "write":
        return (
          <div>
            <HeaderBox>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/close.svg" alt="" /></HeaderBackBtn>
            <HeaderCenterText>{headerText}</HeaderCenterText>
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
            <HeaderCenterText>
              {otherUserNickname}
            </HeaderCenterText>
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