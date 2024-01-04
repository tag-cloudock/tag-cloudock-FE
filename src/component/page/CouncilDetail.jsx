/*
용도: 학생회 물품 페이지
담당자: 
사용법: 
기타: 
*/
import MenuBar from "../layout/MenuBar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../layout/Header";

const CouncilInforContainer = styled.div`
  padding: 30px;
`;

const CouncilInfo = styled.div`
  padding: 20px 0px 10px 0px;

  color: #676767;
  font-family: Lexend;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  & span {
    color: #676767;
    margin-right: 5px;
    font-family: Lexend;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const ProvideProductContainer = styled.div``;
const LendProductContainer = styled.div``;

const CouncilName = styled.div`
  color: #676767;
  text-align: center;
  font-family: Lexend;
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

  font-family: Lexend;
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
  font-family: Lexend;
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

const CouncilDetail = () => {
  return (
    <div>
      <Header headerType={"detail"} headerText={"학생회"}></Header>
      <CouncilInforContainer>
        <CouncilName>경영 대학 학생회</CouncilName>
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
      <ProvideProductContainer>
        <ProvideName>
          
        </ProvideName>
      </ProvideProductContainer>
      <LendProductContainer></LendProductContainer>
      <MenuBar></MenuBar>
    </div>
  );
};

export default CouncilDetail;
