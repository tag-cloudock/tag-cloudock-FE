import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

// 메뉴바 박스
const MenuBarBox = styled.div`
  z-index: 3;
  display: flex;
  position: fixed;
  margin: 0 auto;
  bottom: 20px;
  max-width: 700px;
  left: 0;
  right: 20px;
`;

// 장식 원
const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  background: #379dff;
  text-align: center;
  position: absolute;
  bottom: 0;
  right: 0;
  &:hover{
    background: #79BDFF;
  }
  & img {
    /* width: 50px; */
    margin-top: 17px;
  }
`;

const MenuBar = () => {
  const location = useLocation(); // 주소 확인
  const [cookies] = useCookies(); // 쿠기 가져오기
  return (
    <MenuBarBox>
      <Link to={"/write"}>
          <Circle>
            <img src="/image/pencle.svg" alt="" />
          </Circle>
      </Link>
    </MenuBarBox>
  );
};

export default MenuBar;
