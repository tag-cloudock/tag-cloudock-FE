import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState } from 'react';

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
  padding: 0px 20px;
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
  width: 100%;
  display: flex;
  align-items: center;
  
  /* justify-content: space-between; */
`;

const EmptyBox = styled.div`
  height: 70px;
`;

const HomeTitle = styled.div`
  color : #6093FF;
  font-weight: 800;
  font-size: 36px;
  margin: 0px auto;
`;

const HeaderBackBtn = styled.button`
  height: 40px;
  width: 40px;
  margin-left: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const InfoBtn = styled.img`
  position: absolute;
  right: 20px;
  height: 22px;
  width: 22px;
  margin-left: 0px;
`;

const ModalContainer = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000077;

  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
const ModalBox2 = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 500px;
  max-width: 500px;
  border-radius: 30px 30px 0px 0px;
  background: #ffffff;
  
  position: absolute;
  bottom: 0;
  text-align: center;
`;

const ModalText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color:#000000;
  margin-bottom: 20px;
`;


const ModalBtnBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBtn = styled.button`
  border: none;
  width: 100%;
  margin: 0px 20px;
  background: ${({ isLeft }) => (isLeft ? '#f5f5f5' : '#6093FF')};
  padding: 15px;
  text-align: center;
  border-radius: 15px;
  font-weight: 500;
  font-size: 18px;
  color:${({ isLeft }) => (isLeft ? '#828282' : '#FFFFFF')};
`;

const TextBox = styled.ul`
  padding: 0px 40px;
`;

const Text = styled.li`
  text-align: left;
  font-size: 16px;
  color: #828282;
  padding-bottom: 20px;
`;

const Logos = styled.img`
  text-align: left;
  font-size: 16px;
  color: #828282;
  /* padding-bottom: 20px; */
  /* flex: 1; */
  height: 50px;
  
  margin: auto 0;
  padding: 15px 50px;
`;

const Header = ({ headerType, headerText }) => {
  const [isDoneModalOn, setIsDoneModalOn] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies();
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
              <InfoBtn src={"image/info.svg"} onClick={() => {
                setIsDoneModalOn(true);
              }}>

              </InfoBtn>
            </HeaderContent>
          </HeaderBox>

          {isDoneModalOn ?
            <ModalContainer>
              <ModalBox2>
                <ModalText>
                  바람은?
                </ModalText>

                <TextBox>

                  <Text>
                    바람은 가천대학교 학생회 복지 물품 안내 서비스입니다.
                  </Text>
                  <Text>
                    학생회 운영 시간, 위치, 이용 수칙 등을 확인할 수 있으며, 실시간으로 업데이트되는 복지 품의 개수도 확인할 수 있습니다.
                  </Text>
                  <Text>
                    본 서비스는 42대 총학생회 청의 지원을 받고 있습니다.
                  </Text>
                </TextBox>
                <Logos src="/image/cheongwithbaram.jpg">

                </Logos>
                <ModalBtnBox>
                  <ModalBtn onClick={() => {
                    setIsDoneModalOn(false);
                  }} isLeft={true}>
                    닫기
                  </ModalBtn>
                </ModalBtnBox>
              </ModalBox2>
            </ModalContainer>
            : null}
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
