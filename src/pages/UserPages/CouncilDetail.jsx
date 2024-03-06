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
  /* border-bottom: 1px solid #c6c6c6; */
  padding: 5px 10px;
  /* border-radius: 20px; */
  /* background: #fafafa; */
  border-bottom: 1px solid#eeeeee;
`;

const ProductContainer = styled.div`
  padding: 0px 30px 30px 30px;
  & ul li {
    color: #676767;
    font-size: 15px;
    font-weight: 500;
    list-style-type: none;
    line-height: 40px;
    border-bottom: 1px solid#eeeeee;
  }
  & ul li:last-child {
    border-bottom: none;
  }
`;
const ProfileImg = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 30px;
  border: 1px solid #eeeeee;
  float: left;
  background: #ffffff;
  overflow: hidden;

  & img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const CouncilInfo = styled.div`
  display: inline-block;
  width: 100%;
  padding: 20px 0px 10px 0px;
  color: #000000;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  & span {
    font-family: 'Noto Sans KR';  
    color: #000000;
    margin-right: 5px;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  & div{
    /* width: 100%; */
    font-size: 15px;
    background: #f8f8f8;
    border-radius: 10px;
    white-space:pre;
    padding: 10px;
  }
`;

const CouncilName = styled.div`
  position: absolute;
  width: 100%;
  color: #000000;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Noto Sans KR';  
`;

const Update = styled.div`
  display: inline-block;
  height: 21px;
  padding: 5px 10px;
  border-radius: 30px;
  background: #eef6ff;
  color: #379dff;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  vertical-align: center;
  & img {
    margin-top: 4px;
    float: left;
  }
  & span {
    margin-left: 5px;
    float: left;
    line-height: 21px;
  }
`;

const CategoryTitle = styled.div`
  color: #000000;
  font-family: 'Noto Sans KR';  
  font-size: 20px;
  font-weight: 500;
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
  font-weight: 400;
  font-size: 15px;
  color: #000000;
`;

const CouncilDetail = () => {
  const [councilData, setCouncilData] = useState({ items: [], imgPath:"default.png" }); // 채팅방 리스트 상태
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
      <Header></Header>
      <CouncilInforContainer>
        <TitleBox>
          <ProfileImg>
            <img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + councilData.imgPath}></img>
          </ProfileImg>
          <CouncilName>{councilData.name} 학생회</CouncilName>
        </TitleBox>

        <CouncilInfo>
          <span>위치 </span> {councilData.location}
          <br />
          <span>이용시간 </span> {councilData.operatingHours}
          <br />
          <span>이용수칙 </span> <div>{councilData.usageGuidelines}</div> <br />
        </CouncilInfo>

        {councilData.isCouncilSelfManage ? 
        <Update>
          <img src={"/image/clockupdate.svg"}></img>
          <span>실시간 개수 업데이트</span>
        </Update>
        : null}
      </CouncilInforContainer>
      <ProductContainer>
        <CategoryTitle>제공 물품</CategoryTitle>
        <ul>
          {councilData.items.map((item) => (
            item.type == "PROVIDED" ? 
            <li key={item.itemId}>
              {item.name}
              {councilData.isCouncilSelfManage ? 
              <CategoryCount>{item.quantity}</CategoryCount>:null}
            </li>
            : null
          ))}
        </ul>
      </ProductContainer>
      <ProductContainer>
        <CategoryTitle>대여 물품</CategoryTitle>
        <ul>
          {councilData.items.map((item) => (
            item.type == "RENTAL" ? 
            <li key={item.itemId}>
              {item.name}
              {councilData.isCouncilSelfManage ? 
              <CategoryCount>{item.quantity}</CategoryCount>:null}
            </li>
            : null
          ))}
        </ul>
      </ProductContainer>
    </CouncilBox>
  );
};

export default CouncilDetail;
