import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuBar from "../../components/layout/MenuBar";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const {kakao} = window;

const CouncilBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const CouncilInforContainer = styled.div`
  padding: 0px 30px;
`;

const TitleBox = styled.div`
  background: #f1f5ff;
  /* margin-bottom: 20px; */
  /* border-radius: 15px; */
  /* box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px; */
  padding: 30px;
  @media screen and (min-width: 700px) {
    border-radius: 20px;
  } 
`;

const CouncilName = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 25px;
  color : #6093FF;
`;

const ProductContainer = styled.div`
  padding: 0px 30px 30px 30px;
  & ul li {
    color: #676767;
    font-size: 15px;
    font-weight: 500;
    list-style-type: none;
    line-height: 40px;
    padding-left: 15px;
    border-bottom: 1px solid#eeeeee;
  }
  & ul li:last-child {
    border-bottom: none;
  }
`;

const CouncilInfo = styled.div`
  display: inline-block;
  width: 100%;
  padding: 20px 0px 10px 0px;
  color: #000000;
  font-size: 17px;
  font-weight: 400;
  line-height: 30px;


`;

const InfoItem = styled.div`
  display: flex;
  &:last-child{
    display: block;
  }
  & span {
    display: inline-block;
    padding: 5px 7px;
    border-radius:5px;
    color: #393939;
    font-size: 17px;
    /* background: #e6f3ff; */
    text-align: center;
    font-weight: 700;
    line-height: normal;
  }
  & div{
    margin-left: 5px;
  }
  & img{
    display: inline-block;
    margin-left: 10px;
    width: 20px;
  }
`;

const Guidelines = styled.div`
  margin-top: 10px;
    font-size: 15px;
    background: #f8f8f8;
    border-radius: 10px;
    white-space:pre;
    padding: 10px;
    margin-bottom: 20px;
`;


const Update = styled.div`
display: inline-block;
  height: 21px;
  border-radius: 30px;
  text-align: right;
  margin-bottom: 30px;
  padding: 2px 7px;
  color: #6093FF;
  background: #f1f5ff;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  /* display: flex; */
  align-items: center;
  & span {
    margin-left: 5px;
    line-height: 21px;
  }
  & div{
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 100px;
    background-color: #6093FF;
  }
`;

const CategoryTitle = styled.div`

  display: inline-block;
    padding: 7px 15px;
    border-radius: 7px;
    font-size: 15px;
    font-weight: 400;
    color: #6e6e6e;
    font-weight: 700;
    margin-bottom: 10px;
    background: #f5f5f5;
    /* 6093FF */
`;

const CategoryCount = styled.div`
  margin-top: 10px;
  /* background: #f3f3f3; */
  width: 40px;
  height: 22px;
  line-height: 22px;
  border-radius: 22px;
  float: right;
  text-align: right;
  margin-right:15px;
  font-weight: 500;
  font-size: 15px;
  color: #6093FF;
`;

const MapButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

`;

const ModalContainer = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000077;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBox2 = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 370px;
  max-width: 400px;
  border-radius: 30px;
  background: #ffffff;
  
  position: relative;
  text-align: center;

`;

const ModalText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color:#535353;
  /* line-height: 30px; */
`;


const ModalBtnBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBtn = styled.button`
  border: none;
  width: 100%;
  margin: 0px 20px;
  background: ${({ isLeft }) => (isLeft ? '#f5f5f5' : '#6093FF')};
  padding: 15px;
  text-align: center;
  border-radius: 15px;
  font-weight: 500;
  font-size: 18px;
  color:${({ isLeft }) => (isLeft ? '#aaaaaa' : '#FFFFFF')};
`;

const Map = styled.div`
  border-radius: 15px;
  margin: 20px 20px;
  /* width: 100%; */
  height: 100%;
  height: 200px;
`;


const CouncilDetail = () => {
  const [isDoneModalOn, setIsDoneModalOn] = useState(false);
  const [councilData, setCouncilData] = useState({ items: [], imgPath: "default.png" }); // 채팅방 리스트 상태
  const { id } = useParams();
  useEffect(() => {

   

    const fetchCouncil = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACK_URL + "/council/" + id, {
        });
        setCouncilData(response.data.data);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchCouncil();
  }, []);

  useEffect(() => {
    console.log(document.getElementById('map'))
    if (document.getElementById('map') != null ){
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.45324570186913, 127.13436283275537),
        level: 3
      };
      var map = new kakao.maps.Map(container, options);

      
      var markerPosition  = new kakao.maps.LatLng(37.45324570186913, 127.13436283275537); 
      var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    }
  }, )
 

  return (
    <CouncilBox>
      <Header></Header>
      <TitleBox>
        {/* <ProfileImg>
            <img src={ process.env.REACT_APP_BACK_URL + "/image/" + councilData.imgPath}></img>
          </ProfileImg> */}
        <CouncilName>{councilData.name}</CouncilName>
      </TitleBox>
      <CouncilInforContainer>

        <CouncilInfo>
          <InfoItem>
            <span>위치 </span>
            <div>{councilData.location}</div>
            <MapButton onClick={() => {
              setIsDoneModalOn(true);
            }}><img src="/image/map.svg"></img></MapButton>
          </InfoItem>
          <InfoItem>
            <span>이용시간 </span><div>{councilData.operatingHours}</div>
          </InfoItem>
          <InfoItem>
            <span>이용수칙 </span> <Guidelines>{councilData.usageGuidelines}</Guidelines>
          </InfoItem>

        </CouncilInfo>
      </CouncilInforContainer>

      <ProductContainer>
        {councilData.isCouncilSelfManage ?
          <div>
            <Update>
              <div></div>
              <span>실시간 개수 업데이트 중</span>
            </Update></div>
          : null}
        <CategoryTitle>제공 물품</CategoryTitle>
        <ul>
          {councilData.items.map((item) => (
            item.type == "PROVIDED" ?
              <li key={item.itemId}>
                {item.name}
                {councilData.isCouncilSelfManage ?
                  <CategoryCount>{item.quantity}</CategoryCount> : null}
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
                  <CategoryCount>{item.quantity}</CategoryCount> : null}
              </li>
              : null
          ))}
        </ul>
      </ProductContainer>

      {isDoneModalOn ?
        <ModalContainer>
          <ModalBox2>
            <ModalText>
              위치
            </ModalText>

            <Map id="map" ></Map>
            <ModalBtnBox>
              <ModalBtn onClick={() => {
                setIsDoneModalOn(false);
              }} isLeft={true}>
                닫기
              </ModalBtn>
            </ModalBtnBox>
          </ModalBox2>
        </ModalContainer>
        : null}
    </CouncilBox>
  );
};

export default CouncilDetail;
