import MenuBar from "../../components/layout/MenuBar";
import Header from "../../components/layout/Header";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useState } from 'react';
import RecentPosts from "../../components/page/Home/RecentPosts";
import Footer from "../../components/layout/Footer";

// 홈 각 박스 제목
const SubTitle = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 20px;
  text-align: left;
  line-height: 50px;
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-top: 15px;
  @media screen and (max-width: 700px) {
    padding-top: 10px;
    padding-bottom: 20px;
    font-size: 20px;
  }
`;

// 학생회 캠퍼스 선택 박스 Parent
const CampusMoveBox = styled.div`
  /* margin: 0px 20px; */
  display: flex;
  justify-content: space-evenly;

  background: #f2f2f2;
  border-radius: 30px;
  margin: 30px 20px 10px 20px;

`;

// 학생회 캠퍼스 선택 박스 Child
const CampusBox = styled.button`
  border: none;
  background: none;
  width: 50%;
  margin: 3px 3px;
  border-radius: 40px;
  background: ${({ isOn }) => (isOn ? "#ffffff" : null)};
  &:hover {
    /* background: #f9f9f9; */
  }
  /* box-shadow: 0px 1px 8px rgba(74, 74, 74, 0.2); */
`;


// 학생회 선택 Text
const CampusText = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 500;
  padding: 7px 0px;
  font-size: 17px;
  color: ${({ isOn }) => (isOn ? " #6093FF" : "#a3abb5")};
`;

// 대여 박스 Parent
const ContentAreaBox = styled.div`
  padding: 0px 20px;
  @media screen and (max-width: 700px) {
    margin-top: -15px;
  }
`;

// 대여 박스 Child
const RecentPostBox = styled.div`
  /* background: #ffffff; */
  border-radius: 20px;
  margin-top: 10px;
  /* padding: 10px 10px; */
  /* box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px; */
  align-items: center;
  justify-content: center;

  & div div:nth-child(odd) a div {
    background: #f4f4f4;
  }
`;


//물건이 필요한 곳 박스
const LocationItems = styled.div`
  /* padding: 20px 10px; */
  /* margin-bottom: 100px; */
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  /* box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px; */
`;

//위치 박스
const LocationItem = styled.span`
  display: inline-block;
  /* margin: 7px 5px; */
  background: #f1f6ff;
  text-align: center;
  border-radius: 50px;
  font-weight: 400;
  font-size: 14px;
  color: #6093FF;
  padding: 7px 10px;
  margin: 5px;
  &:hover {
    /* background: #f4f4f4; */
    /* color: #ffffff; */
  }
`;

const HomeContainer = styled.div`
  background: #6093FF;
  /* box-shadow: 0px 8px 16px 0px rgba(142, 142, 142, 0.2); */
`;

const Container = styled.div`
  /* opacity: 0%; */
  z-index: 2;
  width: 100%;
  position: absolute;
  margin-top: 350px;

  @media screen and (min-width: 700px) {
    /* margin-top: 360px; */
  } 
  border-radius: 30px 30px 0px 0px;
  background: #ffffff;
  max-width: 701px;
`;
const HomeMainTextBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  background: linear-gradient(to top, #6fb9ff, #6093FF 50%);
  top: -30px;

  margin-top: 30px;
`;
const BlurBar= styled.div`
  z-index: 100;
  width: 50px;
  height: 500px;
  position: absolute;
  ${({ isLeft }) => (isLeft ? "left: 0;"  : "right: 0;"   )}
  background: linear-gradient(${({ isLeft }) => (isLeft ? "to left"  : "to right"   )}, #379eff00, #6093FF 90%);
`

const HomeMainText= styled.div`
  position: relative;
  margin: 50px auto;
  max-width:701px;
  font-size: 65px;
  /* overflow: hidden; */
  line-height: 60px;
  color: #ffffff;

  margin-top: 35px;
  height: 250px;
  
  /* background: #ffffff72; */

  @media screen and (min-width: 700px) {
    font-size: 90px;
    line-height: 90px;
  } 
  & span{
    /* margin-left: -20px; */
    margin-top: 10px;
    display: inline-block;
    width: 1000px;
    font-weight: 800;
    color:#ffffff22;

  }
  padding: 20px;
  & img{
    border-radius: 0px;
    /* position: absolute; */
    width: 100%;
    margin-top: 40px;
    border-radius: 20px;
    @media screen and (min-width: 700px) {
    border-radius: 30px;
  } 
  }
`;

const AdAlert = styled.div`
/* z-index: 100; */
  /* position: absolute; */
  color: #ffffff;
  top: 100px;
  font-weight: 700;
  font-size: 15px;
  float: right;
`;

// 화살표 아이콘 이미지 조정
const ArrowIcon = styled.img`
  width: 30px;
  vertical-align: middle;
  margin-left: 5px;
  margin-bottom: 5px;
  float:right;
  @media screen and (max-width: 700px) {
    width: 24px;
  }
  padding-top: 12px;
  padding-right: 35px;
`;

const CouncilBtn = styled.div`
  /* border-radius: 20px; */
  padding: 30px 30px;
  /* box-shadow: 0px 2px 15px 0px rgba(181, 181, 181, 0.25); */
  /* border: 1px solid #f2f2f2; */
  background: #f1f5ff;
  /* background: #f4f4f4a2; */
  height: 50px;
  margin: 30px 0px 0px 0px;
  @media screen and (min-width: 700px) {
    &:hover div{
    margin-left: 30px; /* 마우스 호버 시 이동할 거리 */
  }
  &:hover img{
    transform: scale(1.2); 
  }
  } 
  
`;
const CouncilBtnText = styled.div`
  float: left;
  font-size: 25px;
  /* color: #6093FF; */
  
  color : #6093FF;
  line-height: 27px;
  transition: margin-left 0.3s ease; /* transition 속성 추가 */
  font-weight: 700;
  & span {
    font-weight: 400;
    margin-top: 2px;
    font-size: 15px;
    color: #2e2e2e;
    display: block;
  }
`;
const MoveArrow = styled.img`
  float: right;
  margin-top: 10px;
  transition: transform 0.3s ease; /* transition 속성 추가 */

  &:hover {
    transform: scale(1.2); /* 마우스 호버 시 크기가 1.1배로 커지도록 설정 */
  }
`;

const Bar = styled.div`
height: 5px;
width: 50px;
  margin: 10px auto;
  background: #d5d5d5;
  border-radius: 20px;
`;

const Intro = styled.div`
  /* position: absolute; */
  font-size: 20px;
  /* font-weight: 700; */
  width: 100%;
  text-align: center;
  bottom: 0px;
`;

const Home = () => {
  const [campus, setCampus] = useState(0);
  return (
    <HomeContainer>
      <Header headerType={"home"}></Header>
      {/* 학생회 대여 */}
      <HomeMainTextBox>
        <HomeMainText>
        {/* <BlurBar isLeft={true}></BlurBar> */}
        <a href="https://www.leets.land">
          <img src={"/image/ad.svg"}></img>
          </a>
          {/* <Intro>가천대 대여 중개 사이트</Intro> */}
          {/* <AdAlert>교내 홍보 문의</AdAlert> */}
        </HomeMainText>
       
      </HomeMainTextBox>
      <Container>
        <Bar></Bar>
        <CampusMoveBox>
          {/* 글캠 링크 추가 */}

          <CampusBox onClick={() => {
                        setCampus(0);
                    }} isOn={campus==0}>
            <CampusText isOn={campus==0}>
              글로벌
            </CampusText>
          </CampusBox>
          {/* 메캠 링크 추가 */}
          <CampusBox onClick={() => {
                        setCampus(1);
                    }} isOn={campus==1}>
            <CampusText isOn={campus==1}>
              메디컬
            </CampusText>
          </CampusBox>
        </CampusMoveBox>

        {/* 일반 대여 목록 */}
        <Link to={campus == 0 ?"/councils?campus=global" : "/councils?campus=medical"}>
          <CouncilBtn>
            <CouncilBtnText>
              {campus == 0 ?"글" : "메"}캠 학생회 대여품 보러 GO!
              <span>
                총학생회에서 18가지 물품을 대여, 제공 중이에요
              </span>
            </CouncilBtnText>
           
          </CouncilBtn>
        </Link>



        <SubTitle>
          최근에 빌리길 바람 <Link to={"/posts?campus="+(campus == 0 ? "global" : "medical")}><ArrowIcon src={"/image/arrow.svg"} alt="" /></Link>
        </SubTitle>
        <ContentAreaBox>
          <RecentPostBox>
            <RecentPosts campus={campus}></RecentPosts>
          </RecentPostBox>
        </ContentAreaBox>
        {/* 장소 선택 목록 */}
        <SubTitle>
          어딘가요? 내 물건을 바라는 곳!
        </SubTitle>
        <ContentAreaBox>
          <LocationItems>
            {campus == 0 ? 
            <div>
            <Link to={"/posts?location=G 바나대"}>
              <LocationItem>바나대</LocationItem>
            </Link>
            <Link to={"/posts?location=G AI공학관"}>
              <LocationItem>AI공학관</LocationItem>
            </Link>
            <Link to={"/posts?location=G 중앙도서관"}>
              <LocationItem>중앙도서관</LocationItem>
            </Link>
            <Link to={"/posts?location=G 가천관"}>
              <LocationItem>가천관</LocationItem>
            </Link>
            <Link to={"/posts?location=G 공과대학1"}>
              <LocationItem>공과대학1</LocationItem>
            </Link>
            <Link to={"/posts?location=G 공과대학2"}>
              <LocationItem>공과대학2</LocationItem>
            </Link>
            <Link to={"/posts?location=G 반도체대학"}>
              <LocationItem>반도체대학</LocationItem>
            </Link>
            <Link to={"/posts?location=G 한의과대학"}>
              <LocationItem>한의과대학</LocationItem>
            </Link>
            <Link to={"/posts?location=G 예체대1"}>
              <LocationItem>예체대1</LocationItem>
            </Link>
            <Link to={"/posts?location=G 예체대2"}>
              <LocationItem>예체대2</LocationItem>
            </Link>
            <Link to={"/posts?location=G 전자정보도서관"}>
              <LocationItem>전자정보도서관</LocationItem>
            </Link>
            <Link to={"/posts?location=G 대학원"}>
              <LocationItem>대학원</LocationItem>
            </Link>
            <Link to={"/posts?location=G 교육대학원"}>
              <LocationItem>교육대학원</LocationItem>
            </Link>
            <Link to={"/posts?location=G 바이오나노연구원"}>
              <LocationItem>바이오나노연구원</LocationItem>
            </Link>
              
            <Link to={"/posts?location=G 학생회관"}>
              <LocationItem>학생회관</LocationItem>
            </Link>
            <Link to={"/posts?location=G 제1기숙사"}>
              <LocationItem>제1기숙사</LocationItem>
            </Link>
            <Link to={"/posts?location=G 제2기숙사"}>
              <LocationItem>제2기숙사</LocationItem>
            </Link>
            <Link to={"/posts?location=G 제3기숙사"}>
              <LocationItem>제3기숙사</LocationItem>
            </Link>
            <Link to={"/posts?location=G 글로벌센터"}>
              <LocationItem>글로벌센터</LocationItem>
            </Link>
            <Link to={"/posts?location=G 반도체대학"}>
              <LocationItem>반도체대학</LocationItem>
            </Link>
            <Link to={"/posts?location=G 비전타워"}>
              <LocationItem>비전타워</LocationItem>
            </Link>
            <Link to={"/posts?location=G 교육대학"}>
              <LocationItem>법과대학</LocationItem>
            </Link>
            <Link to={"/posts?location=G 제1기숙사"}>
              <LocationItem>바개동</LocationItem>
            </Link>
            <Link to={"/posts?location=G 제1기숙사"}>
              <LocationItem>광장</LocationItem>
            </Link>
            </div>
            :
            <div>
              <Link to={"/posts?location=G 비전타워"}>
              <LocationItem>약학대학</LocationItem>
              </Link>
              <Link to={"/posts?location=G 교육대학"}>
                <LocationItem>학생회관</LocationItem>
              </Link>
            </div>
            }
          </LocationItems>
        </ContentAreaBox>
        <Footer></Footer>
      </Container>
      
      <MenuBar></MenuBar>
    </HomeContainer>
  );
};

export default Home;
