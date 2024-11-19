import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // useCookies 훅을 추가
import axios from "axios"; // axios를 사용하여 API 호출

const StockContainer = styled.div`
  background: #ffffff;
  /* width: 203px; */
  height: 90vh;
  /* overflow: hidden; */
  border-top-right-radius: 10px;
`;

const StockTitlesHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center; 
  white-space: nowrap;
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
  background: #f5f5f5;
  width: 182px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  box-sizing: border-box;
  border-radius: 12px;
  color: #828282; /* 기본 색상 */

  cursor: pointer;

  /* isOn이 true일 때 글씨 색을 진하게 변경 */
  color: ${(props) => (props.isOn ? "#333333" : "#828282")};

  /* 마우스를 올렸을 때 글씨 진해지게 */
  &:hover {
    color: #333333; /* 진한 색으로 변경 */
  }
`;


const StockListBox = styled.div`
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
`;

const Stocks = ( {stocks, setStock, nowStock, setIsNewsView} ) => {

  const goToCloud = (stock) => {
    setStock(stock)
    setIsNewsView(false);
  };

  return (
    <StockContainer>
      <StockTitlesHeader>
        <StockTitles>관심 종목</StockTitles>
        <StockNums>{stocks.length}</StockNums>
      </StockTitlesHeader>
      <StockListBox>
      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <StockList onClick={() => goToCloud(stock)} key={stock.stockCode} isOn={nowStock.stockCode == stock.stockCode}>
            {stock.name}
          </StockList>
        ))
      ) : (
        <StockList>등록된 종목이 없습니다.</StockList>
      )}
      </StockListBox>
     
    </StockContainer>
  );
};

export default Stocks;
