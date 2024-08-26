import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

// 헤더 박스
const HeaderBox = styled.div`
  z-index: 1;
  background: #ffffff;
  /* position: fixed;
  left: 0;
  right: 0; */
  height: 100px;
  display: flex;
  align-items: center;

  margin: 0px auto;
  max-width: 701px;
`;

const HeaderBox2 = styled.div`
  z-index: 1;
  background: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  align-items: center;

  margin: 0px auto;
  max-width: 701px;
`;


const HeaderContent = styled.div`

  margin: 0px auto;
  max-width: 701px;
`;

const EmptyBox = styled.div`
  height: 70px;
`;

const HomeTitle = styled.div`
  color : #6093FF;
  text-align: center;
  font-weight: 800;
  font-size: 36px;
`;

const HeaderBackBtn = styled.button`
  height: 40px;
  width: 40px;
  margin-left: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Header = ({ headerType, headerText }) => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies] = useCookies();
  // 이전 페이지로 이동
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoHome = () => {
    navigate("/");
  };

  // 홈, 기본, 챗룸, 챗방
  switch (headerType) {
    case "home": // 홈
      return (
        <div>
          <HeaderBox nobg={"true"}>
            <HeaderContent>
              <HomeTitle>
                Baram
              </HomeTitle>
            </HeaderContent>
          </HeaderBox>
          {/* <EmptyBox></EmptyBox> */}
        </div>
      );
    case "council":
      return (
        <div>
          <HeaderBox2 nobg={"true"}>
            <HeaderBackBtn onClick={handleGoHome}>
              <img src="/image/back.svg" alt="" />
            </HeaderBackBtn>
          </HeaderBox2>
          <EmptyBox></EmptyBox>
        </div>
      );

  }
};

export default Header;
