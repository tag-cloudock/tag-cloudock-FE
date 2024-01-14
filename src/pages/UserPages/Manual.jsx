import Header from "../../components/layout/Header";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ManualBox = styled.div`
  padding: 20px;
  align-items: center;
`;

const ManualContent = styled.div`
  font-weight: 700;
  line-height: 180%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 4s, transform 2s;
`;

const ManualText1 = styled.div`
  color: #000000;
  font-size: 30px;
  width: 100%;
  padding: 0px 0px 7px 50px;
  line-height: 180%;
`;

const ManualText2 = styled.div`
  color: #636363;
  font-size: 18px;
  width: 100%;

  padding: 0px 50px 200px 100px;
  line-height: 180%;
`;

const ImageIcon = styled.img`
  width: 90%;
  max-width: 480px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  text-align: center;
  height: 45px;
  line-height: 45px;
  margin-bottom: 250px;
  font-size: 85px;
  font-weight: 850;
  & a {
    color: #379dff;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #adb5c2;
  padding-top: 73px;
  padding-bottom: 45px;
`;

const Manual = () => {
  const manualContentsRef = useRef([]);

  const handleScroll = () => {
    manualContentsRef.current.forEach((ref, index) => {
      const rect = ref.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight - 100;

      if (isInView) {
        ref.style.opacity = 1;
        ref.style.transform = "translateY(0)";
      }
    });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Header headerType={"manual"} headerText={"도움말"}></Header>
      <Title>
        <SubTitle>당장 필요할때 바로 빌리자</SubTitle>
        <Link to={"/"}>대학빌림</Link>
      </Title>
      <ManualBox>
        <ManualContent ref={(el) => (manualContentsRef.current[0] = el)}>
          <ImageIcon src={"/image/borrow.svg"} alt="" />
          <ManualText1>대여서비스</ManualText1>
          <ManualText2>가천대 학생만을 위한 대여서비스에요. <br></br>학교 어디서든 빠르게
            빌릴 수 있어요. 
          </ManualText2>
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[1] = el)}>
          <ImageIcon src={"/image/council2.svg"} alt="" />
          <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이 얼마나
            남아 있는지 알 수 있어요.
          </ManualText2>
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[2] = el)}>
          <ImageIcon src={"/image/userpage.svg"} alt="" />

          <ManualText2>
            후기를 보고 믿을만한 학우와 거래할 수 있어요.
          </ManualText2>
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[3] = el)}>
          <ImageIcon src={"/image/studentconfirm.png"} alt="" />

          <ManualText2>
            안전하게 대여할 수 있도록 학생증 인증 기능을 넣었어요.
          </ManualText2>
        </ManualContent>
      </ManualBox>
    </div>
  );
};

export default Manual;
