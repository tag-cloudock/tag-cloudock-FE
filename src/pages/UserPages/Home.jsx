import MenuBar from "../../components/layout/MenuBar";
import Header from "../../components/layout/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from 'react';
import RecentPosts from "../../components/page/Home/RecentPosts";
import Footer from "../../components/layout/Footer";

// 홈 각 박스 제목
const SubTitle = styled.div`
  padding-top: 25px;
  padding-bottom: 5px;
  padding-left: 20px;
  text-align: left;
  line-height: 50px;
  font-weight: 700;
  font-size: 22px;
  color: #000000;
  @media screen and (max-width: 700px) {
    padding-top: 10px;
    padding-bottom: 15px;
    font-size: 20px;
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
const CampusMoveBox = styled.div`
  margin: 0px 20px;
  height: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

// 학생회 캠퍼스 선택 박스 Child
const CampusBox = styled.button`
  border: none;
  background: none;
`;


// 학생회 선택 Text
const CampusText = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 400;
  margin-top: 20px;
  font-family: 'Noto Sans KR'; 
  border-bottom: 2px solid #eeeeee;
  font-size: 20px;
  color: #c3cbd5;
  ${({ isOn }) => (isOn ? "color: #379dff; border-bottom: 2px solid #379dff;" : null)};
  &:hover {
    color: #379dff;
    border-bottom: 2px solid #379dff;
  }
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
    background: #f6f6f6;
  }
`;


//물건이 필요한 곳 박스
const LocationItems = styled.div`
  /* padding: 20px 10px; */
  /* margin-bottom: 100px; */
  background: #ffffff;
  border-radius: 20px;
  /* box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px; */
`;

//위치 박스
const LocationItem = styled.span`
  display: inline-block;
  /* margin: 7px 5px; */
  background: #ffffff;
  border-radius: 10px;
  font-weight: 400;
  font-size: 17px;
  color: #379dff;
  padding: 7px;
  &:hover {
    background: #f4f4f4;
    /* color: #ffffff; */
  }
`;

const HomeContainer = styled.div`
  background: #379dff;
  /* box-shadow: 0px 8px 16px 0px rgba(142, 142, 142, 0.2); */
`;

const Container = styled.div`
  /* opacity: 0%; */
  z-index: 2;
  position: absolute;
  margin-top: 230px;

  @media screen and (min-width: 700px) {
    margin-top: 360px;
  } 
  border-radius: 30px 30px 0px 0px;
  background: #ffffff;
  max-width: 701px;
`;
const HomeMainText = styled.div`
  position: fixed;
  width: 100%;
  max-width: 661px;
  background: #379dff;
  top: 0;
  padding: 80px 20px 250px 20px;
  @media screen and (min-width: 700px) {
    padding: 90px 20px 250px 20px;
  } 
  margin-top: 30px;
  /* height: 300px; */
  font-size: 50px;
  font-weight: 300;
  line-height: 50px;
  color: #ffffff;
  font-family: 'Nanum SeACe'; 
  @media screen and (min-width: 700px) {
    font-size: 90px;
    line-height: 90px;
  } 
  & span{
    font-family: 'Nanum SeACe';  
    font-size: 30px;
    @media screen and (min-width: 700px) {
    font-size: 50px;
    } 
  }

  & div{
    transition: right 0.3s ease; 
    font-size: 18px;
    color: #2e89de;
    font-weight: 700;
    width: 150px;
    height: 50px;
    /* line-height: 50px; */
    position: absolute;
    right: 0px;
        @media screen and (min-width: 700px) {
          right: -30px;
      } 
        top: 80px;
        /* background: #4ba8ff; */
        @media screen and (min-width: 700px) {
          top: 290px;
      } 
    &:hover{
      right: -40px; /* 마우스 호버 시 이동할 거리 */
    }
  }
  & img{
    position: absolute;
    top: 15px;
    margin-left: 5px;
    /* margin-top: 15px; */
    @media screen and (min-width: 700px) {
      top: 35px;
    margin-left: 5px;
  } 
  }
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
  padding-top: 7px;
  padding-right: 35px;
`;

const CouncilBtn = styled.div`
  border-radius: 20px;
  background: #FFF;
  padding: 20px 15px;
  box-shadow: 0px 2px 15px 0px rgba(157, 157, 157, 0.25);
  height: 50px;
  margin: 15px 20px 0px 20px;
  &:hover div{
    margin-left: 10px; /* 마우스 호버 시 이동할 거리 */
  }
  &:hover img{
    transform: scale(1.2); 
  }
`;
const CouncilBtnText = styled.div`
  float: left;
  font-size: 22px;
  color: #000000;
  font-weight: 400;
  line-height: 27px;
  transition: margin-left 0.3s ease; /* transition 속성 추가 */

  & span {
    font-size: 15px;
    color: #b1b1b1;
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


const Home = () => {
  const [campus, setCampus] = useState(0);
  return (
    <HomeContainer>
      <Header headerType={"home"}></Header>
      {/* 학생회 대여 */}
      <HomeMainText>
        당신이<br />
        필요한 그 것<br />
        꼭 빌리길 바람 <span>from. 애기</span>
        <Link to={"/test"}>
          <div>
          자세히
        <img src={"/image/menualArrow.svg"} alt="" />
        </div>
        </Link>
        
      </HomeMainText>
      <Container>
        <Bar></Bar>
        <CampusMoveBox>
          {/* 글캠 링크 추가 */}

          <CampusBox onClick={() => {
                        setCampus(0);
                    }}>
            <CampusText isOn={campus==0}>
              글로벌
            </CampusText>
          </CampusBox>
          {/* 메캠 링크 추가 */}
          <CampusBox onClick={() => {
                        setCampus(1);
                    }}>
            <CampusText isOn={campus==1}>
              메디컬
            </CampusText>
          </CampusBox>
        </CampusMoveBox>

        {/* 일반 대여 목록 */}
        <Link to={campus == 0 ?"/council/g" : "/council/m"}>
          <CouncilBtn>
            <CouncilBtnText>
              {campus == 0 ?"글" : "메"}캠 학생회 물품 보러가기
              <span>
                25개의 학생회, 150개의 물품대여중
              </span>
            </CouncilBtnText>
            <MoveArrow src={"/image/arrow.svg"} alt="" />
          </CouncilBtn>
        </Link>



        <SubTitle>
          최근에 빌리길 바람 <ImageIcon src={"/image/hand.svg"} alt="" /><Link to={"/post/:location"}><ArrowIcon src={"/image/arrow.svg"} alt="" /></Link>
        </SubTitle>
        <ContentAreaBox>
          <RecentPostBox>
            <RecentPosts></RecentPosts>
          </RecentPostBox>
        </ContentAreaBox>
        {/* 장소 선택 목록 */}
        <SubTitle>
          어딘가요? 내 물건을 바라는 곳
          <ImageIcon src={"/image/sad.svg"} alt="" />
        </SubTitle>
        <ContentAreaBox>
          <LocationItems>
            <Link to={"/post/바나대"}>
              <LocationItem>#바나대</LocationItem>
            </Link>
            <Link to={"/post/AI공학관"}>
              <LocationItem>#AI공학관</LocationItem>
            </Link>
            <Link to={"/post/중앙도서관"}>
              <LocationItem>#중앙도서관</LocationItem>
            </Link>
            <Link to={"/post/가천관"}>
              <LocationItem>#가천관</LocationItem>
            </Link>
            <Link to={"/post/공대2"}>
              <LocationItem>#공대2</LocationItem>
            </Link>
            <Link to={"/post/공대1"}>
              <LocationItem>#공대1</LocationItem>
            </Link>
            <Link to={"/post/글로벌센터"}>
              <LocationItem>#글로벌센터</LocationItem>
            </Link>
            <Link to={"/post/반도체대학"}>
              <LocationItem>#반도체대학</LocationItem>
            </Link>
            <Link to={"/post/비전타워"}>
              <LocationItem>#비전타워</LocationItem>
            </Link>
            <Link to={"/post/교육대학"}>
              <LocationItem>#교육대학</LocationItem>
            </Link>
          </LocationItems>
        </ContentAreaBox>
        <Footer></Footer>
      </Container>
      
      <MenuBar></MenuBar>
    </HomeContainer>
  );
};

export default Home;
