import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

// 헤더 박스
const HeaderBox = styled.div`
  background: #ffffff;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0px 20px 0px;
  margin-bottom: 3px;
`;

const  SearchBoxContainer = styled.div`
  margin-left: auto;
  margin-top: 20px;
`

const SearchBox = styled.div`
  width: 166px;
  height: 36px;
  background: #f3f3f3;
  border-radius:10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  color: #BCBCBC;
  justify-content: space-between;
`

const SearchIcon = styled.img`
  
`

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
`;


const HomeTitle = styled.div`
  color : #6093FF;
  font-weight: 800;
  font-size: 36px;
  text-align: left;
`;


const Header = () => {
  // 홈, 기본, 챗룸, 챗방
  return (
      <div>
        <HeaderBox nobg={"true"}>
          <HeaderContent>
            <HomeTitle>
              Cloudock
            </HomeTitle>
              <SearchBoxContainer>
                  <SearchBox>
                      종목 검색
                      <SearchIcon src="/image/search2.svg"/>
              </SearchBox>
              </SearchBoxContainer>
          </HeaderContent>
        </HeaderBox>

      </div>
  );
};

export default Header;

