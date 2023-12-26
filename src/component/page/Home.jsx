/*
용도: 메인 홈 페이지
담당자: 김윤수
사용법: App.js 라우팅
기타: BE와 목록 연동하는 
*/
import MenuBar from "../layout/MenuBar";
import Header from "../layout/Header";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// 홈 각 박스 제목
const BoxTitle = styled.div`
  padding-top: 30px;
  padding-left: 20px;
  height: 50px;
  text-align: left;
  line-height: 50px;
  font-weight: 800;
  font-size: 25px;
  color: #505050;
`;

// 아이콘 이미지 조정
const ImageIcon = styled.img`
  width: 22px;
  height: 22px;
  vertical-align: middle;
  margin-left: 5px;
`;

// 학생회 캠퍼스 선택 박스 Parent
const ParentContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
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
`;

// 중앙 박스 Parent
const CenterContainer = styled.div`
  padding: 20px;
`;

// 중앙 박스 Child
const CenterBox = styled.div`
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  height: 200px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  align-items: center;
  justify-content: center;
`;

// 학생회 선택 Text
const CampusText = styled.div`
  font-weight: 800;
  font-size: 38px;
  color: #949ba5;
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
        <CenterBox style={{ height: "300px" }}></CenterBox>
      </CenterContainer>
      {/* 장소 선택 목록 */}
      <BoxTitle>
        어딘가요? 내 물건이 필요한 곳!
        <ImageIcon src={"/image/face.svg"} alt="" />
      </BoxTitle>
      <CenterContainer>
        <CenterBox></CenterBox>
      </CenterContainer>
      <MenuBar></MenuBar>
    </div>
  );
};

export default Home;
