import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // useCookies 훅을 추가
import axios from "axios"; // axios를 사용하여 API 호출

const StockContainer = styled.div`
  background: #ffffff;
  width: 203px;
  height: 88vh;
`;

const StockTitlesHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center; 
  padding-bottom: 7px;
`;

const StockTitles = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-left: 18px;
  padding-right: 5px;
`;

const StockNums = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #BCBCBC;
`;

const BackIcon = styled.img`
  height: 22px;
  margin-left: auto;
  padding: 10px;
`;

const Logout = styled.div`
  position: absolute;
  bottom: 10px; /* 하단에서 10px 떨어진 위치 */
  left: 15px; /* 좌측에서 10px 떨어진 위치 */
  font-size: 14px;
  font-weight: 600;
  color: #bcbcbc;
`;

const StockList = styled.div`
  width: 182px;
  height: 52px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 0 5px 18px;
`;

const StockImage = styled.img`
  height: 40px; 
  width: 40px; 
  margin-right: 10px; 
  border-radius: 20px;
`;

const Stocks = () => {
  const [cookies] = useCookies(["token"]); // 쿠키에서 'token'을 가져옵니다.
  const [stocks, setStocks] = useState([]); // 종목 목록 상태
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리디렉션

  useEffect(() => {
    // 로그인 토큰 확인 후 API 호출
    if (!cookies.token) {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 리디렉션
    } else {
      fetchStockList();
    }
  }, [cookies.token, navigate]); // cookies.token이 변경되면 실행

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
      setStocks(response.data.data.stocks); // 응답 받은 종목 데이터를 상태에 저장
    } catch (error) {
      console.error("API 요청 중 오류 발생: ", error);
    }
  };

  return (
    <StockContainer>
      <StockTitlesHeader>
        <StockTitles>관심 종목</StockTitles>
        <StockNums>{stocks.length}</StockNums>
        <BackIcon src="/image/backicon2.svg" />
      </StockTitlesHeader>
      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <StockList key={stock.stockCode}>
            {stock.name}
          </StockList>
        ))
      ) : (
        <StockList>등록된 종목이 없습니다.</StockList>
      )}
    </StockContainer>
  );
};

export default Stocks;
