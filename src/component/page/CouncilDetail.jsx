/*
용도: 학생회 물품 페이지
담당자: 최지우
사용법: 학생회 물품을 볼 수 있습니다
기타: css가더러워요
*/
import { useState, useEffect, useRef } from "react";
import MenuBar from "../layout/MenuBar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../layout/Header";

const CouncilBox = styled.div`
  position: absolute;
  /* padding: 0px 20px; */
  /* border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee; */
  /* margin-left: -1px; */
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const CouncilInforContainer = styled.div`
  padding: 30px;
`;

const TitleBox = styled.div`
  position: relative;
  height: 50px;
`;

const ProductContainer = styled.div`
  padding: 0px 30px 30px 30px;
  & ul li {
    color: #676767;
    font-size: 15px;
    font-weight: 500;
    list-style-type: none;
    line-height: 40px;
    border-bottom: 1px solid#E1E1E1;
  }
`;
const ProfileImg = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 30px;
  border: 1px solid #c8c8c8;
  float: left;
`;
const CouncilInfo = styled.div`
  padding: 20px 0px 10px 0px;

  color: #676767;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  & span {
    color: #676767;
    margin-right: 5px;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const CouncilName = styled.div`
  position: absolute;
  width: 100%;
  color: #676767;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 23px;
  font-weight: 700;
`;

const InfoDetail = styled.div`
  display: flex;
  width: 45.524px;
  height: 45px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #676767;

  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Update = styled.div`
  width: 110px;
  height: 21px;
  border-radius: 30px;
  background: #eef6ff;
  color: #379dff;
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  vertical-align: center;
  & img {
    margin-top: 4px;
    margin-left: 3px;
    float: left;
  }
  & span {
    margin-left: 3px;
    float: left;
    line-height: 21px;
  }
`;

const CategoryTitle = styled.div`
  color: #676767;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CategoryCount = styled.div`
  margin-top: 10px;
  background: #f3f3f3;
  width: 40px;
  height: 22px;
  line-height: 22px;
  border-radius: 22px;
  float: right;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  color: #979797;
`;

const CouncilDetail = () => {
  const [councilData, setCouncilData] = useState({
    name: "경영대학 학생회",
    rentalItems: [
      {
        name: "손세정제",
      },
      {
        name: "손세정제",
      },
    ],
    provideItems: [
      {
        name: "손세정제",
      },
      {
        name: "손세정제",
      },
    ],
  }); // 채팅방 리스트 상태

  return (
    <CouncilBox>
      <Header headerType={"detail"} headerText={"학생회"}></Header>
      <CouncilInforContainer>
        <TitleBox>
          <ProfileImg></ProfileImg>
          <CouncilName>{councilData.name}</CouncilName>
        </TitleBox>

        <CouncilInfo>
          <span>위치 </span> 공학관 505호
          <br />
          <span>이용시간 </span> 9시 ~ 10시
          <br />
          <span>이용수칙 </span> 뒷정리 필수입니다!!! <br />
        </CouncilInfo>
        <Update>
          <img src={"/image/clockupdate.svg"}></img>
          <span>실시간 업데이트중!</span>
        </Update>
      </CouncilInforContainer>
      <ProductContainer>
        <CategoryTitle>제공 물품</CategoryTitle>
        <ul>
          <li>
            손 세정제 <CategoryCount>1</CategoryCount>{" "}
          </li>
          <li>
            손 세정제<CategoryCount>1</CategoryCount>
          </li>
          <li>
            손 세정제<CategoryCount>1</CategoryCount>
          </li>
        </ul>
      </ProductContainer>
      <ProductContainer>
        <CategoryTitle>대여 물품</CategoryTitle>
        <ul>
          <li>
            손 세정제<CategoryCount>1</CategoryCount>
          </li>
          <li>
            손 세정제<CategoryCount>1</CategoryCount>
          </li>
        </ul>
      </ProductContainer>
      <MenuBar></MenuBar>
    </CouncilBox>
  );
};

export default CouncilDetail;
