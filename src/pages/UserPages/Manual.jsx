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
  transform: translateY(40px);
  transition: opacity 1s, transform 1s;
  margin-bottom: 200px;
  
`;

const ManualText1 = styled.div`
  color: #000000;
  font-size: 30px;
  width: 100%;
  /* padding: 0px 0px 7px 50px; */
  line-height: 180%;
`;

const ManualText2 = styled.div`
  color: #636363;
  font-size: 18px;
  width: 100%;
  /* padding: 0px 50px 200px 100px; */
  line-height: 180%;
`;

const ImageIcon = styled.img`
  width: 100%;
  /* max-width: 480px; */
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  margin: 200px 0px 400px 0px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 55px;
  font-weight: 600;
  /* font-family: 'Noto Sans KR';   */
  font-family: "Poppins";
  color: #379dff;
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 23px;
  font-weight: 600;
  color: #343434;
  /* padding-bottom: 15px; */
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
      <Header headerType={"close"}></Header>
      <ManualBox>
        <ManualContent ref={(el) => (manualContentsRef.current[0] = el)}>
        <Title>
          <SubTitle>가천대 대여 중개 서비스</SubTitle>
          amadda
        </Title>
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[1] = el)}>
          <ImageIcon src={"/image/borrow.svg"} alt="" />
          <ManualText1>대여서비스</ManualText1>
          <ManualText2>
            가천대 학생만을 위한 대여서비스에요. <br></br>학교 어디서든 빠르게
            빌릴 수 있어요.
          </ManualText2>
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[2] = el)}>
          <ImageIcon src={"/image/council2.svg"} alt="" />
          <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2>
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[3] = el)}>
        <ImageIcon src={"/image/council2.svg"} alt="" />
          <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2>
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[4] = el)}>
        <ImageIcon src={"/image/council2.svg"} alt="" />
          <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2>
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[5] = el)}>
        <ImageIcon src={"/image/council2.svg"} alt="" />
          <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2>
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[6] = el)}>
        <ImageIcon src={"/image/council2.svg"} alt="" />
          <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2>
        </ManualContent>
      </ManualBox>
    </div>
  );
};

export default Manual;
