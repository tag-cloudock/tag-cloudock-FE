import React, { useState } from "react";
import styled, { keyframes } from 'styled-components';

// 키 프레임 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px); /* 시작 위치 조정 */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* 최종 위치 */
  }
`;

const LoginBox = styled.div`
    margin: 0px auto;
    padding: 70px 0px;
    width: 90%;
    background : none;
    border-radius: 20px;
    &  > img{
      margin: 150px auto;
      display: block;
      width: 150px;
    }

`;
const KakaoLoginBtn = styled.button`
    display: block;
    margin: 30px auto;
    height: 50px;
    background: #efefef;
    border: none;
    border-radius: 12px;
    background: #FEE500;
    font-weight: bold;
    color:#191919;
    font-size: 17px; 
    outline: none;
    width: 90%;
    max-width: 500px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 10px;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    & img{
      position: absolute;
      left: 30px;
      width: 30px;
    }
`;

const TitleBox = styled.div`
  margin-top: 120px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 70px;
  font-weight: 850;
  font-family: "Poppins";
  color: #6093FF;
  @media screen and (min-width: 700px) {
    font-size: 70px;
}

`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #6093FF;
  margin-bottom: -20px;
`;
const Collabo = styled.div`
  text-align: center;
  font-size: 25px;
  /* font-weight: 500; */
  color: #6093FF;
  margin-top: -12px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const CollaboText = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #6093FF;
  margin-top: 15px;
  animation: ${fadeIn} 1s ease-in-out; /* 애니메이션 적용 */
`;




const KSignIn = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <LoginBox>
        {/* 대여 플렛폼 */}
        {/* <img src="/image/logo.svg">
        </img> */}

        <TitleBox>
          <SubTitle>가천대학교 대여 활성화 서비스</SubTitle>
          <Title>Baram</Title>
          <Collabo>x</Collabo>
          <CollaboText>제 40대 총학생회 청</CollaboText>
        </TitleBox>

        <a href={"https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REST_API_KEY+"&redirect_uri=https://baram.today/oauth/kakao&response_type=code"}>
          <KakaoLoginBtn>
            <img src={"/image/kakao.svg"}></img>
            카카오로 3초만에 로그인
          </KakaoLoginBtn>
        </a>
      </LoginBox>
    </div>
  );
};

export default KSignIn;