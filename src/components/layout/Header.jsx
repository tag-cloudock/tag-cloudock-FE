import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

// 헤더 박스
const HeaderBox = styled.div`
  z-index: 1;
  background: ${({ nobg }) => (nobg ? '#379DFF' : '#ffffff')};
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  /* border-bottom: ${({ nobg }) => (nobg ? 'none' : '1px solid #eeeeee')}; */
  @media screen and (min-width: 701px) {
    margin: 0px auto;
    max-width: 701px;
  }
`;

const HeaderContent = styled.div`
  @media screen and (min-width: 701px) {
    margin: 0px auto;
    max-width: 701px;
  }
`;

// 헤더에 가려지지 않게 하는 더미
const EmptyBox = styled.div`
  height: 50px;
`;

const Help = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 100px;
  background: #ffffff;
  text-align: center;
  line-height: 25px;
  font-weight: 900px;
  color: #aaaaaa;
  margin: 2px auto 0px auto;
`;


// 헤더 텍스트
const HeaderText = styled.span`
  display: inline-block;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  color: #999999;
  font-weight: 800;
  font-size: 20px;
`;

// 홈 헤더의 타이틀
const HomeTitle = styled.div`
  /* font-family: 'Noto Sans KR';   */
  font-family: "Poppins";
  width: 30%;
  padding-left: 20px;
  height: 50px;
  text-align: left;
  line-height: 50px;
  font-weight: 600;
  font-size: 25px;
  color: #ffffff;
  float: left;
`;

// 공지사항 박스
const AnnoBox = styled.div`
  float: right;
  margin-right: 20px;
`;

const Anno = styled.div`
  width: 30px;
  height: 30px;
  margin-top: 10px;
  float: right;
  margin-left: 10px;
  border-radius: 5px;
  &:hover {
    background: #2F91EF;
  }
  & img {
    width: 30px;
  }
`;


// 헤더 가운데 텍스트
const HeaderCenterText = styled.span`
  /* text-align: center; */
  font-family: 'Noto Sans KR';
  position: absolute;
  left: 60px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #000000;
  font-weight: 500;
  font-size: 20px;
`;

// 뒤로가기 버튼
const HeaderBackBtn = styled.button`
  z-index: 1;
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;
  height: 40px;
  width: 40px;
  line-height: 50px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
  border-radius: 10px;
  background: none;
  border: none;
  float: left;
  cursor: pointer;
  & img {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
  }
  &:hover {
    background: #f5f5f5;
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
  & a {
    display: inline-block;
  }
  & img {
    width: 27px;
  }
`;

const CouncilTitle = styled.div`
display: inline-block;
    width: 30%;
  padding-left: 20px;
  height: 50px;
  text-align: left;
  line-height: 50px;
  font-weight: 800;
  font-size: 25px;
  color: #c5c5c5;
  /* float: left; */
`;

const CouncilName = styled.div`
  height: 50px;
  margin-top: 5px;
  margin-right: 20px;
  line-height: 50px;
  font-weight: 800;
  font-size: 17px;
  color: #c5c5c5;
  float: right;
`;

const Header = ({ headerType, headerText }) => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies] = useCookies();
  // 이전 페이지로 이동
  const handleGoBack = () => {
    navigate(-1);
  };

  // 홈, 기본, 챗룸, 챗방
  switch (headerType) {
    case "home": // 홈
      return (
        <div>
          <HeaderBox nobg={"true"}>
            <HeaderContent>
              <HomeTitle>amadda</HomeTitle>
              <AnnoBox>
                <Link to={"/user/" + cookies.id}>
                  <Anno>
                    <img style={{ width: '26px', marginTop:"2px", marginLeft:"2px"}} src={"/image/user.svg"}></img>
                  </Anno>
                </Link>
                <Link to={"/notice"}>
                  <Anno>
                    <img src={"/image/megaphone.svg"}></img>
                  </Anno>
                </Link>
                <Link to={"/test"}>
                  <Anno>
                    <Help>?</Help>
                  </Anno>
                </Link>
              </AnnoBox>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
        </div>
      );
    case "close": // 작성하기
      return (
        <div>
          <HeaderBox>
            <HeaderContent>
              <HeaderBackBtn onClick={handleGoBack}>
                <img src="/image/close.svg" alt="" />
              </HeaderBackBtn>
              <HeaderCenterText>{headerText}</HeaderCenterText>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
        </div>
      );
    case "noChatIcon": // 채팅 버튼 없는거
      return (
        <div>
          <HeaderBox>
            <HeaderContent>
              <HeaderBackBtn onClick={handleGoBack}><img src="/image/back.svg" alt="" /></HeaderBackBtn>
              <HeaderCenterText>
                {headerText}
              </HeaderCenterText>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
        </div>
      );
    case "onlyText": // 텍스트만
      return (
        <div>
          <HeaderBox nobg={false}>
            <HeaderContent>
              <HeaderCenterText>{headerText}</HeaderCenterText>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
        </div>
      );
    case "council": // 학생회용
      return (
        <div>
          <HeaderBox nobg={false}>
          <CouncilTitle>Baram</CouncilTitle>
              <CouncilName>{headerText}</CouncilName>
          </HeaderBox>
          <EmptyBox></EmptyBox>
        </div>
      );
    default: // 뒤로가기 버튼, 제목, 채팅방 버튼
      return (
        <div>
          <HeaderBox>
            <HeaderContent>
              <HeaderBackBtn onClick={handleGoBack}>
                <img src="/image/back.svg" alt="" />
              </HeaderBackBtn>
              <HeaderCenterText>{headerText}</HeaderCenterText>
              <ChatBtn>
                <Link to={"/chat"}>
                  <img src="/image/chat.svg" alt="" />
                </Link>
              </ChatBtn>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
        </div>
      );
  }
};

export default Header;
