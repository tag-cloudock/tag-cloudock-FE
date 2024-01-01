/*
용도: 메뉴바
담당자: 양태석
사용법: 메뉴바가 필요한 곳에서 사용
기타:
*/
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

// 메뉴바 박스
const MenuBarBox = styled.div`
  display: flex;
  background: #ffffff;
  justify-content: space-between;
  position: fixed;
  margin: 0 auto;
  bottom: 20px;
  width: 70%;
  max-width: 700px;
  left: 0;
  right: 0;
  border-radius: 40px 40px 40px 40px;
  height: 50px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  & img {
    width: 30px;
  }
`;

// 버튼
const NavBtn = styled.div`
  display: flex;
  opacity: ${({ ison }) => (ison === "true" ? "100%" : "40%")};
  width: 33%;
  /* height: 100%; */
  background: none;
  border: none;
  & a {
    display: inline-block;
    margin: auto auto;
  }
`;

// 장식 원
const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  /* border: 1px solid #379DFF; */
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  background: #379dff;
  position: relative;
  top: -30px;
  text-align: center;

  & img {
    width: 50px;
    margin-top: 5px;
  }
`;

const MenuBar = () => {
  const location = useLocation(); // 주소 확인
  const [cookies] = useCookies(); // 쿠기 가져오기
  return (
    <MenuBarBox>
      {/* 홈 버튼 */}
      <NavBtn ison={location.pathname === "/" ? "true" : "false"}>
        <Link to={"/"}>
          <img src={"/image/home.svg"} alt="" />
        </Link>
      </NavBtn>
      {/* 글쓰기 버튼 */}
      <NavBtn ison={"true"}>
        <Link to={"/write"}>
          <Circle>
            <img src="/image/write.svg" alt="" />
          </Circle>
        </Link>
      </NavBtn>
      {/* 유저 버튼 */}
      <NavBtn ison={location.pathname.startsWith("/user") ? "true" : "false"}>
        <Link to={"/user/" + cookies.userId}>
          <img src={"/image/user.svg"} alt="" />
        </Link>
      </NavBtn>
    </MenuBarBox>
  );
};

export default MenuBar;
