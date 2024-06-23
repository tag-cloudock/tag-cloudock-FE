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

const HomeContainer = styled.div`
  background: #6093FF;
  /* box-shadow: 0px 8px 16px 0px rgba(142, 142, 142, 0.2); */
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

const AlertTextBox = styled.div`
  /* width: 1000px; */
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  /* background: linear-gradient(to top, #6fb9ff, #6093FF 50%); */
  top: 0px;
  margin-top: 30px;
  z-index: 0;
  text-align: center;
`;

const AlertText = styled.div`
  margin: 100px auto;
  font-size: 25px;
  font-weight: 900;
  color: #ffffff;
  & div{
    margin-top: 20px;
    font-size: 18px;
    font-weight: 900;
  }
`;

const Title = styled.div`
  margin-top: 130px;
font-size: 60px;
  font-weight: 850;
  font-family: "Poppins";
  line-height: 50px;
  color: #ffffff;

`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
`;

const Home2 = () => {
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
      {/* 학생회 대여 */}
      <HomeBackground>


      </HomeBackground>
      <AlertTextBox>

      <Title>
        Baram
        </Title>
        <SubTitle>
        가천대학교 대여 플렛폼
        </SubTitle>
        <AlertText>
        바람을 이용해 주셔서 감사합니다.<br></br>
        현재 사이트는 리뉴얼 진행 중입니다.

        <div>
        9월 2일에 다시 찾아뵙겠습니다.
          </div>
        </AlertText>
          
        </AlertTextBox>


      <Footer></Footer>

    </HomeContainer>
  );
};

export default Home2;
