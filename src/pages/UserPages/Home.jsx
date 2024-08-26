import MenuBar from "../../components/layout/MenuBar";
import Header from "../../components/layout/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import RecentPosts from "../../components/page/Home/RecentPosts";
import Footer from "../../components/layout/Footer";
import { useCookies } from "react-cookie";
import moment from "moment";
import axios from "axios";
import CouncilList from "./CouncilList";

// 학생회 캠퍼스 선택 박스 Parent
const CampusMoveBox = styled.div`
  position: sticky;
  top: 0px;
  z-index: 10;
  /* display: flex; */
  /* justify-content: space-evenly; */
  background: #ffffff;
  padding: 0px 20px;
  /* position: relative; */
  border-bottom: 1px solid #eeeeee;
`;

// 학생회 캠퍼스 선택 박스 Child
const CampusBox = styled.button`
  border: none;
  background: none;
  width: 50%;
  outline: none;
  padding-top: 5px;
  background: #ffffff;
  box-sizing: border-box;
  position: relative;
`;

// 학생회 선택 Text
const CampusText = styled.span`
  text-align: center;
  padding: 20px 20px;
  font-weight: 800;
  font-size: 16px;
  color: ${({ isOn }) => (isOn ? "#000000" : "#bcbcbc")};
  position: relative;
  display: inline-block;
  z-index: 1;
`;

// 애니메이션을 위한 ActiveBorder
const ActiveBorderBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
`;

const ActiveBorder = styled.div`
  position: absolute;
  bottom: 0;
  left :  ${({ position }) => (position == 0 ? "0%" : "50%") };
  
  width: 50%;
  transition: left 0.3s ease, width 0.3s ease;
  border-radius: 3px;
  /* padding: 0px 20px; */
`;

const ActiveBorderColor = styled.div`
  height: 3px;
  width: 100px;
  margin: 0px auto;
  background-color: #6093FF;
`;

const HomeContainer = styled.div`
  position: relative;
  height: auto;
`;

const Container = styled.div`
  padding: 0px 20px;
`;

const Search = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
`;

const SearchBox = styled.div`
  background: #f5f5f5;
  height: 40px;
  width: 100%;
  border: none;
  z-index: 5;
  box-sizing: border-box;
  padding: 0px 20px;
  border-radius: 100px;
  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  font-weight: 400;
  font-size: 16px;
  color: #000000; 
  outline: none;
  border: none;
  background: none;
  flex: 1;
  &::placeholder {
    color: #bcbcbc; 
    font-weight: 400;
    font-size: 16px;
  }
`;

const ResultBox = styled.ul`
  ${({ isVisiable }) => (isVisiable ? "display: block;" : "display: none;")}
  background: #f5f5f5;
  width: 100%;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 15px;
  list-style: none;
  z-index: 200;

  & li {
    padding: 10px 0px;
    line-height: 17px;
    list-style: none;
    font-size: 15px;
    color: #575757;
    display: flex;
    justify-content: space-between;
  }
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
  font-weight: 900;
  color: #ffffff;
  margin-right: 5px;
`;

const SearchIcon = styled.img`
  width: 18px;
  margin-right: 10px;
`;

const CancleBtn = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 100px;
  background: #bcbcbc;
  text-align: center;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const CancleIcon = styled.img`
  margin: 0px auto;
  width: 18px;
  height: 18px;
`;

const Home = () => {
  const [cookies, setCookies] = useCookies();
  const [campus, setCampus] = useState("global");

  const [keyword, setKeyword] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [borderPosition, setBorderPosition] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const DEBOUNCE_TIME = 300;

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchValue(keyword);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(debounce);
  }, [keyword]);

  useEffect(() => {
    const getResults = async () => {
      try {
        if (debouncedSearchValue.length === 0) {
          setResults([]);
          return;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/council-item/search/${debouncedSearchValue}`
        );

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

  const handleCancle = () => {
    setKeyword("");
  };

  const handleCampusClick = (campusType, position) => {
    setCampus(campusType);
    setCookies("campus", campusType, {
      path: "/",
      expires: moment().add(1, "hours").toDate(),
    });
    setBorderPosition(position);
  };

  return (
    <HomeContainer>
      <Header headerType={"home"}></Header>
      <Search>
        <SearchBox>
          <SearchIcon src="/image/search.svg"></SearchIcon>
          <InputBox  
            type="text"
            name="search"
            placeholder="무엇이 필요한가요?"
            onChange={handleSearch}
            value={keyword}
            autoComplete="off"
          ></InputBox>
          {keyword !== "" &&
          <CancleBtn onClick={handleCancle}>
            <CancleIcon src="/image/cancle.svg"></CancleIcon>
          </CancleBtn>}
        </SearchBox>
        <ResultBox isVisiable={keyword.length !== 0}>
          {results.slice(0, 3).map((result, index) => (
            <Link to={`/councils/${result.councilId}`} key={index}>
              <li>
                <span>{result.name}</span>
                <CouncilName>{result.councilName}</CouncilName>
              </li>
            </Link>
          ))}
          <li>
            <AlertBox>!</AlertBox>
            <NoResult>물품을 찾을 수 없나요?</NoResult>
            <Link to={"/write"}>
              <Request>요청하기</Request>
            </Link>
          </li>
        </ResultBox>
      </Search>
      <CampusMoveBox>
        <CampusBox
          onClick={() => handleCampusClick("global", 0)}
          isOn={campus === "global"}
        >
          <CampusText isOn={campus === "global"}>글로벌</CampusText>
      
        </CampusBox>
        <CampusBox
          onClick={() => handleCampusClick("medical", 1)}
          isOn={campus === "medical"}
        >
          <CampusText isOn={campus === "medical"}>메디컬</CampusText>
        </CampusBox>

        <ActiveBorderBox>
        <ActiveBorder position={borderPosition}>
          <ActiveBorderColor></ActiveBorderColor>
        </ActiveBorder>
        </ActiveBorderBox>
       
      </CampusMoveBox>
      <Container>
        <CouncilList campus={campus} />
      </Container>
      <Footer></Footer>
    </HomeContainer>
  );
};

export default Home;
