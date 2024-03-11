import React, { useState } from "react";
import styled from "styled-components";

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


const Title = styled.div`
  text-align: center;
  font-size: 60px;
  font-weight: 850;
  font-family: "Poppins";
  margin-top: 100px;
  color: #6093FF;
`;

const KSignIn = () => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <LoginBox>
        <img src="/image/logo.svg">
        </img>

        <a href="https://kauth.kakao.com/oauth/authorize?client_id=cd1ddaf4965cd20d1500023af8129185&redirect_uri=http://43.202.228.198:3000/oauth/kakao&response_type=code">
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