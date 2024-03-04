import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const LoginBox = styled.div`
    margin: 0px auto;
    padding: 70px 0px;
    width: 90%;
    background : none;
    border-radius: 20px;

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


const Image = styled.div`
    margin: 60px auto;
    height: 300px;
    max-width: 300px;
    background : #ffffff;
    border-radius: 40px;
    box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px;

`;

const DotBox = styled.div`
    height: 100px;
    margin: 60px auto;
    background: #ffffff;
    text-align: center;
    
`;
const Dot = styled.button`
    border:none;
    cursor: pointer;
    display: inline-block;
    height:13px;
    width: 13px;
    border-radius: 30px;
    margin: 0px 5px;
    background: ${({ isOn }) => (isOn ? '#379dff' : '#e3e3e3')};

`;

const KSignIn = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies();
  const useridRef = useRef();
  const passwordRef = useRef();
  const [index, setIndex] = useState(0);
  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <LoginBox>
        <Image>

        </Image>
        <DotBox>
          <Dot isOn={0 == index}
            onClick={(e) => {
              setIndex(0);
            }}>

          </Dot>
          <Dot isOn={1 == index}
            onClick={(e) => {
              setIndex(1);
            }}>

          </Dot>
          <Dot isOn={2 == index}
            onClick={(e) => {
              setIndex(2);
            }}>

          </Dot>
        </DotBox>
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=cd1ddaf4965cd20d1500023af8129185&redirect_uri=http://localhost:3000/oauth/kakao&response_type=code">
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