/*
용도: 메인 홈 페이지
담당자: 김윤수
사용법: App.js 라우팅
기타: 
*/
import MenuBar from "../layout/MenuBar";
import Header from "../layout/Header";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "./Home/PostList";

// 홈 각 박스 제목
const BoxTitle = styled.div`
  padding-top: 25px;
  padding-left: 20px;
  text-align: left;
  line-height: 50px;
  font-weight: 800;
  font-size: 25px;
  color: #505050;
  @media screen and (max-width: 700px) {
    padding-top: 8px;
    font-size: 22px;
  }
`;

// 아이콘 이미지 조정
const ImageIcon = styled.img`
  width: 30px;
  vertical-align: middle;
  margin-left: 5px;
  margin-bottom: 5px;
  @media screen and (max-width: 700px) {
    width: 24px;
  }
`;

// 학생회 캠퍼스 선택 박스 Parent
const ParentContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media screen and (max-width: 700px) {
    margin-top: -15px;
    gap: 15px;
  }
`;

// 학생회 캠퍼스 선택 박스 Child
const ContainerBox = styled.div`
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  height: 150px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 700px) {
    height: 100px;
  }
`;

// 대여 박스 Parent
const CenterContainer = styled.div`
  padding: 20px;
  @media screen and (max-width: 700px) {
    margin-top: -15px;
  }
`;

// 대여 박스 Child
const CenterBox = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 10px 0px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 700px) {
  }
`;

// 학생회 선택 Text
const CampusText = styled.div`
  font-weight: 800;
  font-size: 38px;
  color: #949ba5;
  @media screen and (max-width: 700px) {
    font-size: 150%;
  }
`;

//물건이 필요한 곳 박스
const CampusBox = styled.div`
  padding: 20px 10px;
  margin-bottom: 100px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  text-align: center;
  @media screen and (max-width: 700px) {
  }
`;

//위치 상위 박스
// const Location = styled.div`
//   display: flex;
//   padding: 15px;
//   padding-top: 25px;
//   justify-content: center;
//   @media screen and (max-width: 700px) {
//     padding: 13px;
//   }
// `;

//위치 박스
const LocationBox = styled.span`
  display: inline-block;
  margin: 3px 3px;
  padding: 15px;
  background: #ffffff;
  border: 1px solid #379dff;
  border-radius: 30px;
  font-weight: 800;
  font-size: 17px;
  color: #379dff;
  &:hover{
    background: #379dff;
    color: #ffffff;
  }
  @media screen and (max-width: 700px) {
    font-weight: 700;
    font-size: 13px;
  }
`;

const Home = () => {
  return (
    <div>
      <Header headerType={"home"}></Header>
      {/* 학생회 대여 */}
      <BoxTitle>
        학생회에서 빌려드려요 <ImageIcon src={"/image/pin.svg"} alt="" />
      </BoxTitle>
      <ParentContainer>
        {/* 글캠 링크 추가 */}
        <Link to={"/"}>
          <ContainerBox>
            <CampusText>
              <span style={{ color: "#379DFF" }}>글로벌</span> 캠퍼스
            </CampusText>
          </ContainerBox>
        </Link>
        {/* 메캠 링크 추가 */}
        <Link to={"/"}>
          <ContainerBox>
            <CampusText>
              <span style={{ color: "#379DFF" }}>메디컬</span> 캠퍼스
            </CampusText>
          </ContainerBox>
        </Link>
      </ParentContainer>
      {/* 일반 대여 목록 */}
      <BoxTitle>
        대여를 원하고 있어요 <ImageIcon src={"/image/hand.svg"} alt="" />
      </BoxTitle>
      <CenterContainer>
        <CenterBox>
          <PostList></PostList>
        </CenterBox>
      </CenterContainer>
      {/* 장소 선택 목록 */}
      <BoxTitle>
        어딘가요? 내 물건이 필요한 곳!
        <ImageIcon src={"/image/sad.svg"} alt="" />
      </BoxTitle>
      <CenterContainer>
        <CampusBox>
            <Link to={"/"}>
              <LocationBox>바나대</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>AI공학관</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>중앙도서관</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>가천관</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>공대2</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>공대1</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>글로벌센터</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>반도체대학</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>비전타워</LocationBox>
            </Link>
            <Link to={"/"}>
              <LocationBox>교육대학</LocationBox>
            </Link>
        </CampusBox>
      </CenterContainer>
      <MenuBar></MenuBar>
    </div>
  );
};

export default Home;
