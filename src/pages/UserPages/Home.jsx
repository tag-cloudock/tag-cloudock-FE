import MenuBar from "../../components/layout/MenuBar";
import Header from "../../components/layout/Header";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useState, useEffect } from 'react';
import RecentPosts from "../../components/page/Home/RecentPosts";
import Footer from "../../components/layout/Footer";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";

// 홈 각 박스 제목
const SubTitle = styled.div`
  margin-top: 10px;
  padding-bottom: 5px;
  padding-left: 20px;
  text-align: left;
  line-height: 50px;
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  @media screen and (max-width: 700px) {
    padding-bottom: 20px;
    font-size: 20px;
  }
  & span{
    font-size: 15px;
    float: right;
    margin-right: 20px;
    font-weight: 400;
    color: #6093FF;
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
  margin-bottom: 20px;
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
const HomeBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  background: linear-gradient(to top, #6fb9ff, #6093FF 50%);
  top: -30px;
  margin-top: 30px;
`;
const HomeMainTextBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  /* background: linear-gradient(to top, #6fb9ff, #6093FF 50%); */
  top: 0px;
  margin-top: 30px;
  z-index: 0;
`;
const BlurBar = styled.div`
  z-index: 100;
  width: 50px;
  height: 500px;
  position: absolute;
  ${({ isLeft }) => (isLeft ? "left: 0;" : "right: 0;")}
  background: linear-gradient(${({ isLeft }) => (isLeft ? "to left" : "to right")}, #379eff00, #6093FF 90%);
`

const HomeMainText = styled.div`
  position: sticky;
  top: 50px;
  margin: 0px auto;
  max-width:701px;
  font-size: 65px;
  line-height: 60px;
  color: #ffffff;
  height: 250px;
  
  /* background: #ffffff72; */


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
  padding: 60px 20px;
  /* box-shadow: 0px 2px 15px 0px rgba(181, 181, 181, 0.25); */
  /* border: 1px solid #f2f2f2; */
  background: #f1f5ff;
  /* background: #f4f4f4a2; */
  height: 50px;
  margin: 30px 0px 0px 0px;
  @media screen and (min-width: 700px) {

  } 
  
`;
const CouncilBtnText = styled.div`
  float: left;
  & div{
    margin-top: 7px;
    font-size: 27px;
  color : #6093FF;
  line-height: 10px;
  padding-right: 20px;
  transition: margin-left 0.3s ease; /* transition 속성 추가 */
  font-weight: 800;
  @media screen and (max-width: 700px) {
    font-size: 23px;
  } 
  border-bottom: 15px solid rgb(215, 229, 255);
  }
 
  & span {
    font-weight: 500;
    /* margin-top: 5px; */
    font-size: 17px;
    color: #646464;
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
const SearchBox = styled.input`
  display: block;
  background: #4d7ce2;
  height: 50px;
  width: 70%;
  border: none;
  padding: 0px 20px;
  z-index: 0;

  margin: 100px auto 0px auto;
  border-radius: 100px;

  font-weight: 600;
  font-size: 20px;
  color: #ffffff; 
  outline: none;
    /* padding: 0px 3%; */
    &::placeholder {
        color: #6093FF; 
        font-weight: 600;
        font-size: 20px;
    }
    &:focus {
      border-color: #6093FF;
    }
    
`;
const ResultBox = styled.ul`

  ${({ isVisiable }) => (isVisiable ? "display: block;":"display: none;")}
  
  background: #ffffff;
  /* border: 2px solid #eeeeee; */
  width: 70%;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 15px;
  list-style: none;
  z-index: 200;
  & li{
    padding: 10px 0px;
    line-height: 17px;
    list-style: none;
    font-size: 15px;
    color:#575757;
    display: flex;
    justify-content: space-between;
  }
  /* & li:hover{
    border-bottom: 1px solid #eeeeee;
  } */
`;

const CouncilName = styled.span`
  color : #6093FF; 

  border-left: 1px solid #6093FF; 
  padding-left: 5px;
`;

const Request = styled.span`
display: inline-block;
background: #6093FF; 
padding: 5px 10px;
font-size: 13px;
border-radius: 100px;
font-weight: 600;
  color : #ffffff; 
`;

const NoResult = styled.span`
display: inline-block;
/* padding: 5px 10px; */
font-size: 15px;
line-height: 25px;
font-weight: 500;
border-radius: 100px;
  color : #d1d1d1; 
  flex: 1;
`;

const AlertBox = styled.div`
margin-top: 3px;
display: inline-block;
height: 20px;
width: 20px;
background: #e4e4e4;
border-radius: 100px;
text-align: center;
font-weight:900;
color: #ffffff;
margin-right: 5px;

`;


const Bar = styled.div`
height: 5px;
width: 50px;
  margin: 10px auto;
  background: #d5d5d5;
  border-radius: 20px;
`;

const Ad = styled.div`
  margin-top: 30px;
  padding: 0px 20px;
  & img{
    width: 100%;
  }
`;

const Home = () => {
  const [cookies, setCookies] = useCookies();
  const [campus, setCampus] = useState(cookies.campus ? cookies.campus : 0);

  const [keyword, setKeyword] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const DEBOUNCE_TIME = 300;

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchValue(keyword);
  }, DEBOUNCE_TIME); // 새로운 타이머 설정

  return () => clearTimeout(debounce); 

  }, [keyword]);

  useEffect(() => {
    const getResults = async () => {
      try {
        if (debouncedSearchValue.length == 0){
          setResults([]);
          return;
        }
        const response = await axios.get(
          process.env.REACT_APP_BACK_URL + "/council-item/search/"+debouncedSearchValue
        )
        setResults(response.data.data);
      } catch (error) {
        console.log("오류 발생: ", error);
      }
    };
    getResults();
  

  }, [debouncedSearchValue]);

  const handleSearch = (e) => {
    setKeyword(e.target.value); 
  };

  return (
    <HomeContainer>
      <Header headerType={"home"}></Header>
      {/* 학생회 대여 */}
      <HomeBackground>
      </HomeBackground>
      <HomeMainTextBox>
        <HomeMainText>
          <SearchBox type="text"
          name="search"
          placeholder="학생회에서 찾아보기!"
          onChange={handleSearch}
          autocomplete="off"
          >
          </SearchBox>
          <ResultBox isVisiable = {keyword.length != 0}>
          {results.map((result, index) => (
            <Link to={"/councils/"+result.councilId}><li key={index}><span>{result.name}</span><CouncilName>{result.councilName}</CouncilName></li></Link>
          ))}
            <li><AlertBox>!</AlertBox><NoResult>물품을 찾을 수 없나요?</NoResult> <Link to={"/write"}><Request>요청하기</Request></Link></li>
          </ResultBox>
        </HomeMainText>

      </HomeMainTextBox>
      <Container>
        <Bar></Bar>
        <CampusMoveBox>
          {/* 글캠 링크 추가 */}

          <CampusBox onClick={() => {
            setCampus(0);
            setCookies("campus", 0, {
              path: "/",
              expires: moment().add(1, "hours").toDate(),
            });
          }} isOn={campus == 0}>
            <CampusText isOn={campus == 0}>
              글로벌
            </CampusText>
          </CampusBox>
          {/* 메캠 링크 추가 */}
          <CampusBox onClick={() => {
            setCampus(1);
            setCookies("campus", 1, {
              path: "/",
              expires: moment().add(1, "hours").toDate(),
            });
          }} isOn={campus == 1}>
            <CampusText isOn={campus == 1}>
              메디컬
            </CampusText>
          </CampusBox>
        </CampusMoveBox>

        {/* 일반 대여 목록 */}
        <Link to={campus == 0 ? "/councils?campus=global" : "/councils?campus=medical"}>
          <CouncilBtn>
            <CouncilBtnText>
              <div>{campus == 0 ? "글" : "메"}캠 학생회 구비물품 확인하기!</div>
              <span>
                학생회 위치와 물건 수량을 확인해보세요!
              </span>
            </CouncilBtnText>

          </CouncilBtn>
        </Link>


        {/* <Ad>
          <img src={"/image/adgh.png"} alt="" />
        </Ad>   */}
        <SubTitle>
          학우들이 요청중이에요! <Link to={"/posts?campus=" + (campus == 0 ? "global" : "medical") + "&page=0"}><span>모두보기</span></Link>
        </SubTitle>
        <ContentAreaBox>
          <RecentPostBox>
            <RecentPosts campus={campus}></RecentPosts>
          </RecentPostBox>
        </ContentAreaBox>
        {/* 장소 선택 목록 */}
        <SubTitle>
          내 근처 요청 보기!
        </SubTitle>
        <ContentAreaBox>
          <LocationItems>
            {campus == 0 ?
              <div>
                <Link to={"/posts?location=G 바나대&page=0"}>
                  <LocationItem>바나대</LocationItem>
                </Link>
                <Link to={"/posts?location=G AI공학관&page=0"}>
                  <LocationItem>AI공학관</LocationItem>
                </Link>
                <Link to={"/posts?location=G 중앙도서관&page=0"}>
                  <LocationItem>중앙도서관</LocationItem>
                </Link>
                <Link to={"/posts?location=G 가천관&page=0"}>
                  <LocationItem>가천관</LocationItem>
                </Link>
                <Link to={"/posts?location=G 공과대학1&page=0"}>
                  <LocationItem>공과대학1</LocationItem>
                </Link>
                <Link to={"/posts?location=G 공과대학2&page=0"}>
                  <LocationItem>공과대학2</LocationItem>
                </Link>
                <Link to={"/posts?location=G 반도체대학&page=0"}>
                  <LocationItem>반도체대학</LocationItem>
                </Link>
                <Link to={"/posts?location=G 한의과대학&page=0"}>
                  <LocationItem>한의과대학</LocationItem>
                </Link>
                <Link to={"/posts?location=G 예체대1&page=0"}>
                  <LocationItem>예체대1</LocationItem>
                </Link>
                <Link to={"/posts?location=G 예체대2&page=0"}>
                  <LocationItem>예체대2</LocationItem>
                </Link>
                <Link to={"/posts?location=G 전자정보도서관&page=0"}>
                  <LocationItem>전자정보도서관</LocationItem>
                </Link>
                <Link to={"/posts?location=G 대학원&page=0"}>
                  <LocationItem>대학원</LocationItem>
                </Link>
                <Link to={"/posts?location=G 교육대학원&page=0"}>
                  <LocationItem>교육대학원</LocationItem>
                </Link>
                <Link to={"/posts?location=G 바이오나노연구원&page=0"}>
                  <LocationItem>바이오나노연구원</LocationItem>
                </Link>

                <Link to={"/posts?location=G 학생회관&page=0"}>
                  <LocationItem>학생회관</LocationItem>
                </Link>
                <Link to={"/posts?location=G 제1기숙사&page=0"}>
                  <LocationItem>제1기숙사</LocationItem>
                </Link>
                <Link to={"/posts?location=G 제2기숙사&page=0"}>
                  <LocationItem>제2기숙사</LocationItem>
                </Link>
                <Link to={"/posts?location=G 제3기숙사&page=0"}>
                  <LocationItem>제3기숙사</LocationItem>
                </Link>
                <Link to={"/posts?location=G 글로벌센터&page=0"}>
                  <LocationItem>글로벌센터</LocationItem>
                </Link>
                <Link to={"/posts?location=G 반도체대학&page=0"}>
                  <LocationItem>반도체대학</LocationItem>
                </Link>
                <Link to={"/posts?location=G 비전타워&page=0"}>
                  <LocationItem>비전타워</LocationItem>
                </Link>
                <Link to={"/posts?location=G 법과대학&page=0"}>
                  <LocationItem>법과대학</LocationItem>
                </Link>
                <Link to={"/posts?location=G 바개동&page=0"}>
                  <LocationItem>바개동</LocationItem>
                </Link>
                <Link to={"/posts?location=G 광장&page=0"}>
                  <LocationItem>광장</LocationItem>
                </Link>
              </div>
              :
              <div>
                <Link to={"/posts?location=M 보건과학대학&page=0"}>
                  <LocationItem>보건과학대학</LocationItem>
                </Link>
                <Link to={"/posts?location=M 약학대학&page=0"}>
                  <LocationItem>약학대학</LocationItem>
                </Link>
                <Link to={"/posts?location=M 간호대학&page=0"}>
                  <LocationItem>간호대학</LocationItem>
                </Link>
                <Link to={"/posts?location=M 학생회관&page=0"}>
                  <LocationItem>학생회관</LocationItem>
                </Link>
                <Link to={"/posts?location=M 의과대학&page=0"}>
                  <LocationItem>의과대학</LocationItem>
                </Link>
                <Link to={"/posts?location=M 기숙사&page=0"}>
                  <LocationItem>기숙사</LocationItem>
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
