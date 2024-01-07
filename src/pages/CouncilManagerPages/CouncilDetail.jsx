import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuBar from "../../components/layout/MenuBar";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const CouncilBox = styled.div`
  position: absolute;
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
  const [councilData, setCouncilData] = useState({ items: [] }); // 채팅방 리스트 상태
  const { id } = useParams();
  useEffect(() => {
    const fetchCouncil = async () => {
      try {
        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/council/" + id, {
        });
        setCouncilData(response.data);
        console.log(response.data);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchCouncil();
  }, []);

  return (
    <CouncilBox>
      <Header headerType={"detail"} headerText={"학생회"}></Header>
      <CouncilInforContainer>
        <TitleBox>
          <ProfileImg></ProfileImg>
          <CouncilName>{councilData.name}</CouncilName>
        </TitleBox>

        <CouncilInfo>
          <span>위치 </span> {councilData.location}
          <br />
          <span>이용시간 </span> {councilData.operatingHours}
          <br />
          <span>이용수칙 </span> {councilData.usageGuidelines} <br />
        </CouncilInfo>
        <Update>
          <img src={"/image/clockupdate.svg"}></img>
          <span>실시간 업데이트중!</span>
        </Update>
      </CouncilInforContainer>
      <ProductContainer>
        <CategoryTitle>제공 물품</CategoryTitle>
        <ul>
          {councilData.items.map((item) => (
            <li key={item.itemId}>
              {item.name}
              <CategoryCount>{item.quantity}</CategoryCount>
            </li>
          ))}
        </ul>
      </ProductContainer>
      <ProductContainer>
        <CategoryTitle>대여 물품</CategoryTitle>
        <ul>
          <li>
            개발중<CategoryCount>1</CategoryCount>
          </li>
        </ul>
      </ProductContainer>
      <MenuBar></MenuBar>
    </CouncilBox>
  );
};

export default CouncilDetail;
