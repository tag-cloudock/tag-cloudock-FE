import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import {useState, useEffect, React} from "react";

// 헤더 박스
const HeaderBox = styled.div`
  background: #ffffff;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0px 20px 0px;
  margin-bottom: 3px;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center; /* 모든 요소 수직 정렬 */
`;

const SearchBoxContainer = styled.div`
  display: flex; /* 내부 요소를 수평으로 배치 */
  align-items: center; /* 수직 정렬 */
  margin-left: auto; /* 오른쪽으로 정렬 */
  margin-top: 20px;
`;

const LoginButton = styled.div`
  width: 80px;
  height: 36px;
  background: #4D9EFD;
  color: #ffffff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center; /* 내부 텍스트 수직 정렬 */
  justify-content: center; /* 내부 텍스트 수평 정렬 */
  margin-left: 10px; /* SearchBox와 간격 */
`;

const SearchBox = styled.div`
  width: 166px;
  height: 36px;
  background: #f3f3f3;
  border-radius: 10px;
  display: flex;
  align-items: center; /* 내부 텍스트 및 아이콘 수직 정렬 */
  justify-content: space-between; /* 텍스트와 아이콘 양 끝 배치 */
  padding-left: 10px;
  padding-right: 10px;
  color: #BCBCBC;
`;

const SearchIcon = styled.img``;

const HomeTitle = styled.div`
  color: #6093FF;
  font-weight: 800;
  font-size: 36px;
  text-align: left;
`;

const Header = () => {
    return (
        <div>
            <HeaderBox nobg={"true"}>
                <HeaderContent>
                    <HomeTitle>Cloudock</HomeTitle>
                    {/* SearchBoxContainer 안에 LoginButton과 SearchBox 포함 */}
                    <SearchBoxContainer>
                        <SearchBox>
                            종목 검색
                            <SearchIcon src="/image/search2.svg" />
                        </SearchBox>
                        <Link to={"/login"}>
                            <LoginButton>로그인</LoginButton>
                        </Link>
                    </SearchBoxContainer>
                </HeaderContent>
            </HeaderBox>
        </div>
    );
};

<Link to={"/news"}>
    <Text>외국인</Text>
</Link>

export default Header;
