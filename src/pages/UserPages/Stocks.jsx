import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StockContainer = styled.div`
  background: #ffffff;
  width: 203px;
  height: 88vh;
`;
const StockTitlesHeader=styled.div`
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
const StockNums= styled.div`
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
    return (
        <div>
            <StockContainer>
                <StockTitlesHeader>
                <StockTitles>관심 종목</StockTitles>
                <StockNums>8</StockNums>
                    <BackIcon src="/image/backicon2.svg"/>
                </StockTitlesHeader>
                <StockList>
                    <StockImage src="/image/stockImage/samsunglogo.svg"/>
                    삼성전자</StockList>
                <StockList>
                    <StockImage src="/image/stockImage/samsunglogo.svg"/>
                    삼성전자</StockList>
                <StockList>
                    <StockImage src="/image/stockImage/samsunglogo.svg"/>
                    삼성전자</StockList>
                <StockList>
                    <StockImage src="/image/stockImage/samsunglogo.svg"/>
                    삼성전자</StockList>
                <StockList>
                    <StockImage src="/image/stockImage/samsunglogo.svg"/>
                    삼성전자</StockList>
                <StockList>
                    <StockImage src="/image/stockImage/samsunglogo.svg"/>
                    삼성전자</StockList>


                <Logout>로그아웃</Logout>
            </StockContainer>
        </div>
    );
};
export default Stocks;