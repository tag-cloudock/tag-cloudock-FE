import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState, useRef } from "react";
import axios from "axios";

// 헤더 박스
const HeaderBox = styled.div`
  background: #ffffff;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0px 20px 0px;
  margin-bottom: 5px;
  
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 20px;
  position: relative;
`;

const LoginButton = styled.div`
  width: 80px;
  height: 36px;
  background: #4d9efd;
  color: #ffffff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const LogoutButton = styled(LoginButton)`
  background: #bcbcbc;
  cursor: pointer;
`;

const SearchBox = styled.div`
  width: 200px;
  height: 36px;
 

  background: #f3f3f3;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  color: #bcbcbc;

  & input{
    font-size: 16px;
    font-weight: 500;
    &::placeholder {
      font-size: 16px;
    color: #aaaaaa; /* 플레이스홀더 색상 변경 */
    font-weight: 500; /* 플레이스홀더 두께 변경 (기본 두께보다 얇게 설정) */
  }
  }
`;

const SearchIcon = styled.img``;

const HomeTitle = styled.div`
  color: #6093ff;
  font-weight: 800;
  font-size: 36px;
  text-align: left;
`;

const ResultBox = styled.div`
  width: 187px;
  background: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 100;
  border-radius: 17px;
  position: absolute;
  top: 50px;
  left: 0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Result = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 5px;
  border-radius: 10px;
  color: #828282;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const Header = ({key, setKey}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [searchQuery, setSearchQuery] = useState(""); // 입력된 검색어
  const [searchResults, setSearchResults] = useState([]); // 검색 결과
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  // 로그아웃 처리
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("userId", { path: "/" });
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  // 종목 추가 API 호출
  const handleAddStock = async (stockCode) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACK_URL + "/stock",
        { stockCode }, // 요청 본문에 stockCode 전달
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`, // 헤더에 토큰 포함
          },
        }
      );
      setKey(stockCode);
      setSearchQuery("");
      setSearchResults([]);
      console.log("종목이 추가되었습니다: ", response.data);
      // 성공적으로 종목을 추가한 후의 추가 동작을 여기에 구현 (예: 사용자 알림, 상태 업데이트 등)
    } catch (error) {
      removeCookie("token", { path: "/" });
      removeCookie("userId", { path: "/" });
      navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
      console.error("종목 추가 중 오류 발생", error);
    }
  };

  // API 호출 함수 (검색어에 따라 종목을 검색)
  const fetchSearchResults = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(process.env.REACT_APP_BACK_URL + "/stock/search/" + query);
      setSearchResults(response.data.data.stocks); // API 응답에서 종목 목록을 추출
      console.log(response.data.data.stocks);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  // 검색어 입력 처리
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // 이전 타이머 클리어
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // 새로운 타이머 설정 (0.5초 후 호출)
    debounceTimer.current = setTimeout(() => {
      fetchSearchResults(query);
    }, 500); // 500ms 후에 API 호출
  };

  return (
    <div>
      <HeaderBox>
        <HeaderContent>
          <HomeTitle>Cloudock</HomeTitle>
          <SearchBoxContainer>
            <SearchBox>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="코드 또는 종목명"
                style={{ border: "none", outline: "none", background: "transparent", width: "120px" }}
              />
              <SearchIcon src="/image/search2.svg" />
            </SearchBox>
            {searchResults.length > 0 && (
              <ResultBox>
                {searchResults.slice(0, 5).map((result) => (
                  <Result key={result.stockCode} onClick={() => handleAddStock(result.stockCode)}>
                    {result.name}
                  </Result>
                ))}
              </ResultBox>
            )}
            {cookies.token ? (
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            ) : (
              <Link to="/login">
                <LoginButton>로그인</LoginButton>
              </Link>
            )}
          </SearchBoxContainer>
        </HeaderContent>
      </HeaderBox>
    </div>
  );
};

export default Header;
