/*
용도: 헤더
담당자: 양태석
사용법: 헤더가 필요한 곳에서 사용
기타: headerType으로 여러 형태의 헤더 지원
*/
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// 헤더 박스
const HeaderBox = styled.div`
  z-index: 2;
  background: ${({ nobg }) => (nobg ? 'none' : '#ffffff')};
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  border-bottom: ${({ nobg }) => (nobg ? 'none' : '3px solid #f0f0f0')};
  @media screen and (min-width: 701px) {
    margin: 0px auto;
    max-width: 701px;
  }
`;

// 헤더에 가려지지 않게 하는 더미
const EmptyBox = styled.div`
  height: 50px;
`;

// 헤더 텍스트
const HeaderText = styled.span`
  display: inline-block;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  color: rgb(112, 112, 112);
  font-weight: 700;
  font-size: 20px;
`;

// 홈 헤더의 타이틀
const HomeTitle = styled.div`
  width: 30%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: 800;
  font-size: 23px;
  color:#C3C9D2;
  float: left ; 
`;

// 공지사항 박스
const AnnoBox = styled.div`
  height: 50px;
  width: 70%;
  float: left;
`;

// 공지사항 배경
const AnnoBack = styled.div`
  height: 30px;
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  background:#dce0e7;
`;

// 공지사항 이미지
const AnnoImg = styled.img`
  float: left;
  margin: 5px;
  height: 20px;
`;

// 공지사항 텍스트
const AnnoText = styled.span`
  display: inline-block;
  margin: 5px;
  height: 20px;
  color: #ffffff;
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
`;

// 헤더 가운데 텍스트
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

// 뒤로가기 버튼
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

// 채팅 버튼
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

const Header = ({headerType, headerText}) => {
    const navigate = useNavigate(); // 페이지 이동을 위해

    // 이전 페이지로 이동
    const handleGoBack = () => {
      navigate(-1); 
    };

    switch (headerType) {
      case "home": // 홈
        return (
          <div>
            <HeaderBox nobg={"true"}>
                <HomeTitle>대학빌림</HomeTitle>
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
      case "user": // 유저
        return (
          <div>
            <HeaderBox nobg={"true"}>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <img src="/image/chat.svg" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "detail": // 글 내부
        return (
          <div>
            <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <img src="/image/chat.svg" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "write": // 작성하기
        return (
          <div>
            <HeaderBox>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/close.svg" alt="" /></HeaderBackBtn>
            <HeaderCenterText>{headerText}</HeaderCenterText>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "chat": // 채팅방
        return (
          <div>
            <HeaderBox>
              <HeaderText>{headerText}</HeaderText>
            </HeaderBox>
            <EmptyBox></EmptyBox>
          </div>
        );
      case "inChat": // 채팅 내부
        return (
          <div>
            <HeaderBox>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/back.svg" alt="" /></HeaderBackBtn>
            <HeaderCenterText>
              {headerText}
            </HeaderCenterText>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "admin": // 어드민 페이지 내부
        return (
          <div>
            <HeaderBox>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/back.svg" alt="" /></HeaderBackBtn>
            <HeaderCenterText>
              {headerText}
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