import Header from "../../components/layout/Header";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ManualBox = styled.div`
  /* padding: 10px; */
  align-items: center;
  & > div:first-child{
    margin-top:300px;
  }
  
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
  margin-top: 200px;
  
`;

const ImageIcon = styled.img`
  width: 100%;
  /* max-width: 480px; */
  /* box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px; */
  /* border-radius: 15px; */
  margin-bottom: 20px;
`;

const TitleBox = styled.div`
  width: 100%;
  /* margin: 220px 0px 400px 0px; */
  
`;
const Title = styled.div`
  text-align: center;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  
& div{
  display: inline-block;
  font-size: 60px;
  font-weight: 850;
  font-family: "Poppins";
  color: #6093FF;
  @media screen and (min-width: 700px) {
    font-size: 80px;
}
}
& img{
  width: 80px;
}
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #6093FF;
  margin-bottom:18px;
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
    window.scrollTo(0, 0);
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
          <TitleBox>
          <SubTitle>가천대학교 대여 플렛폼</SubTitle>
        <Title>
          {/* <img src="/image/logo.svg"></img> */}
          <div>Baram</div>
        </Title>
          </TitleBox>
       
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[1] = el)}>
          <ImageIcon src={"/image/m1.png"} alt="" />
          {/* <ManualText1>대여서비스</ManualText1>
          <ManualText2>
            가천대 학생만을 위한 대여서비스에요. <br></br>학교 어디서든 빠르게
            빌릴 수 있어요.
          </ManualText2> */}
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[2] = el)}>
          <ImageIcon src={"/image/m2.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[3] = el)}>
        <ImageIcon src={"/image/m3.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>

        <ManualContent ref={(el) => (manualContentsRef.current[4] = el)}>
        <ImageIcon src={"/image/m4.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[5] = el)}>
        <ImageIcon src={"/image/m5.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[6] = el)}>
        <ImageIcon src={"/image/m6.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[7] = el)}>
        <ImageIcon src={"/image/m7.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[8] = el)}>
        <ImageIcon src={"/image/m8.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>
        <ManualContent ref={(el) => (manualContentsRef.current[9] = el)}>
        <ImageIcon src={"/image/m9.png"} alt="" />
          {/* <ManualText1>학생증 대여 물품</ManualText1>
          <ManualText2>
            학생회 대여 물품을 쉽게 알 수 있어요. <br></br>실시간으로 대여물품이
            얼마나 남아 있는지 알 수 있어요.
          </ManualText2> */}
        </ManualContent>
      </ManualBox>
    </div>
  );
};

export default Manual;
