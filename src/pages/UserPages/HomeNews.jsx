import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import Stocks from "./Stocks";
import Dates from "./Dates";
import KeyWord from "./KeyWord";
import NewsList from "./NewsList";
import StockTitle from "./StockTitle";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie"; // useCookies 훅을 추가
import axios from "axios"; // axios를 사용하여 API 호출

const HomeContainer = styled.div`
  position: relative;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

// 왜인진 모르겠지만 이걸 해야 가운데로 예쁘게 됨
const LeftContainer = styled.div`
  /* display: flex; */
  height: ;
  overflow: hidden;
  width: 200px; /* 좌측 고정 너비 */
`;

const CenterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeNews = () => {
  const [cookies] = useCookies(["token"]); // 쿠키에서 'token'을 가져옵니다.
  const [stocks, setStocks] = useState([]); // 종목 목록 상태
  const [key, setKey] = useState(0);
  const [stock, setStock] = useState(null); // 종목 상태
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리디렉션

  useEffect(() => {
    // 로그인 토큰 확인 후 API 호출
    if (!cookies.token) {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 리디렉션
    } else {
      fetchStockList();
    }
  }, [cookies.token, navigate, key]); // cookies.token이 변경되면 실행

  // /stock/list API 호출 함수
  const fetchStockList = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACK_URL + "/stock/list", // API 엔드포인트
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`, // 헤더에 토큰 추가
          },
        }
      );
      const stockData = response.data.data.stocks;
      setStocks(stockData); // 응답 받은 종목 데이터를 상태에 저장
      if (stockData.length > 0) {
        setStock(stockData[0]); // 첫 번째 종목을 stock에 설정
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생: ", error);
    }
  };

  return (
    <HomeContainer>
      <Header setKey={setKey}/>
      <ContentWrapper>
        <LeftContainer>
          <Stocks stocks={stocks} setStock={setStock} nowStock={stock}/>
          {/* <Dates /> */}
        </LeftContainer>
        <CenterContainer>
                <KeyWord/>
                <NewsList/>
        </CenterContainer>
        {stock != null ?  <StockTitle stockCode={stock.stockCode} setKey={setKey}/> : null}
      </ContentWrapper>
    </HomeContainer>
  );
};

export default HomeNews;