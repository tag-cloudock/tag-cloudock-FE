import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  box-sizing: content-box;
  padding: 0px 20px;
  margin-bottom: 40px;

`;

const TitleBox = styled.div`
  /* background: #f1f5ff; */
  padding: 20px 20px;
  display: flex;
  align-items: center;
`;

const CouncilName = styled.div`
  font-weight: 700;
  font-size: 20px;
  color : #000000;
`;

const ProductContainer = styled.div`
  padding: 0px 20px 40px 20px;
  & ul li {
    color: #000000;
    font-size: 16px;
    font-weight: 500;
    list-style-type: none;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const CouncilInfo = styled.div`
  display: inline-block;
  width: 100%;
  padding: 20px 0px;
  color: #828282;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 1px solid #eeeeee;

`;

const InfoItem = styled.div`
  display: block;
  margin-bottom: 20px;
  & span {
    white-space: nowrap;
    display: inline-block;
    padding: 5px 0px;
    border-radius:5px;
    color: #000000;
    font-size: 16px;
    /* background: #e6f3ff; */
    text-align: center;
    font-weight: 700;
    line-height: normal;
  }
`;


const Update = styled.div`
display: inline-block;
  /* height: 21px; */
  border-radius: 30px;
  /* text-align: right; */
  margin-bottom: 30px;
  padding: 5px 7px;
  color: #6093FF;
  background: #f1f5ff;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  /* display: flex; */
  align-items: center;
`;

const CategoryTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #000000;
    font-weight: 700;
    margin-bottom: 10px;
`;

const CategoryCount = styled.div`
  font-weight: 300;
  font-size: 16px;
  color: #6093FF;
`;

const MapButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
  & span{
    display: inline-block;
    color:#6093FF;
    font-size: 15px;
    font-weight: 500;
    margin-left: 5px;
  }
  & img{
    width: 20px;
    height: 20px;
  }
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
  /* align-items: center; */
`;
const ModalBox2 = styled.div`

  margin: 0 auto;
  width: 100%;
  height: 500px;
  max-width: 400px;
  border-radius: 30px 30px 0px 0px;
  background: #ffffff;
  
  position: absolute;
  bottom: 0;
  text-align: center;
`;

const ModalText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color:#000000;
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
  color:${({ isLeft }) => (isLeft ? '#828282' : '#FFFFFF')};
`;

const Map = styled.div`
  border-radius: 15px;
  margin: 20px 20px;
  /* width: 100%; */
  height: 100%;
  height: 330px;
`;

const ProfileImg = styled.div`
  border-radius: 1000px;
  /* margin: 20px 20px; */
  width: 40px;
  height: 40px;
  margin-right: 10px;
  & img{
    border-radius: 1000px;
    width: 100%;
    height: 100%;
  }
`;

const OneLine = styled.div`
  display: flex;
  /* align-items: ce; */
`;

const Info = styled.div`
  display: flex;
  white-space: pre-wrap;
  word-break: break-all;
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
    window.scrollTo(0, 0);

    if (document.getElementById('map') != null ){
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(councilData.latitude, councilData.longitude),
        level: 3
      };
      var map = new kakao.maps.Map(container, options);

      var markerPosition  = new kakao.maps.LatLng(councilData.latitude, councilData.longitude);

      var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    }
  }, )
 

  return (
    <CouncilBox>
       <Header headerType={"council"} headerText={councilData.name}></Header>
      <TitleBox>
        <ProfileImg>
            <img src={ process.env.REACT_APP_BACK_URL + "/image/" + councilData.imgPath}></img>
          </ProfileImg>
        <CouncilName>{councilData.name}</CouncilName>
      </TitleBox>
      <CouncilInforContainer>

        <CouncilInfo>
          <InfoItem>
            <span>위치 </span>
            <OneLine>
            <Info>{councilData.location}</Info>
            <MapButton onClick={() => {
              setIsDoneModalOn(true);
            }}><img src="/image/map.svg"></img><span>지도보기</span></MapButton>
            </OneLine>

          </InfoItem>
          <InfoItem>
            <span>이용시간 </span><Info>{councilData.operatingHours}</Info>
          </InfoItem>
          <InfoItem>
            <span>이용수칙 </span> <Info>{councilData.usageGuidelines}</Info>
          </InfoItem>

        </CouncilInfo>
      </CouncilInforContainer>
      
      <ProductContainer>
        {/* {councilData.isCouncilSelfManage ?
          <div>
            <Update>
              <div></div>
              <span>실시간 개수 업데이트 중</span>
            </Update></div>
          : null} */}
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
