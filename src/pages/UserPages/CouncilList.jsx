import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const CouncilBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
  min-height: 1000px;
`;



const ContentBox = styled.div`
  margin-top: 20px;
`;

const CollegeBox = styled.ul`
  background: #ffffff;
  margin-bottom: 30px;
  overflow: hidden;
  /* & a:not(:last-child) li{
      border-bottom: 1px solid #eeeeee;
  } */
`;

const CouncilImgBox = styled.div`
  width: 50px;
  height: 50px;
  /* border: 1px solid #eeeeee; */
  border-radius: 50px;
  float: left;
  margin-right: 10px;
  overflow: hidden;
`;
const CouncilImg = styled.img`
  width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;

const CouncilContent = styled.div`
  display: inline-block;
`;

const CouncilItem = styled.li`
  list-style: none;
  padding: 15px 0px; 
  line-height: 25px;
`;

const CollegeName = styled.div`

    display: inline-block;
    border-radius: 7px;
    font-size: 16px;
    color: #000000;
    font-weight: 700;
    margin-bottom: 10px;
`;

const CouncilName = styled.div`
    font-weight: 500;
    color: #000000;
`;

const ItemInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #bcbcbc;
`;

const SearchContainer = styled.div`
    padding: 20px 0px;
    /* margin-bottom:20px; */
`;

const SearchBox = styled.div`
    /* margin: 0px auto; */
    margin-left: auto;
    margin-right: 20px;
    display: block;
    /* float: right; */
    
    width: 250px;
    background: #f4f4f4af;
    padding: 7px 10px;
    border-radius: 10px;
    display: flex;
    &:focus {
      border: none;
    }
    & img{
      width: 20px;
      margin-right: 10px;
    }

`;
const InputBox = styled.input`
    display: block;
    /* float: right; */
    border: none;
    width: 250px;
    background: none;
    /* border-radius: 10px; */
    outline: none;
    font-size: 16px;
    color: #484848; 
    font-weight: 600;
    &::placeholder {
      color: #d1d1d1; 
      font-weight: 600;
      /* font-size: 15px; */
  }

`;


const CouncilList = ({ campus })  => {
  const [groupedGlobalCouncilList, setGroupedGlobalCouncilList] = useState([]); // 채팅방 리스트 상태
  const [groupedMedicalCouncilList, setGroupedMedicalCouncilList] = useState([]); // 채팅방 리스트 상태


  useEffect(() => {
    const fetchCouncils = async () => {
      try {
        const response = await axios.get( process.env.REACT_APP_BACK_URL + "/council/all?campus=global", {

        });

        const groupedData = response.data.data.reduce((acc, item, index) => {
          const key = item.college;
          if (index !== 0 && key !== response.data.data[index - 1].college) {
            acc.push([]);
          }
          acc[acc.length - 1].push(item);
          return acc;
        }, [[]]);

        setGroupedGlobalCouncilList(groupedData);

        const response2 = await axios.get( process.env.REACT_APP_BACK_URL + "/council/all?campus=medical", {

        });

        const groupedData2 = response2.data.data.reduce((acc, item, index) => {
          const key = item.college;
          if (index !== 0 && key !== response2.data.data[index - 1].college) {
            acc.push([]);
          }
          acc[acc.length - 1].push(item);
          return acc;
        }, [[]]);

        setGroupedMedicalCouncilList(groupedData2);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchCouncils();
  }, []);  // [] 와 같이 비워도 됨.

  return (
    <CouncilBox>
      {/* <SearchContainer>
        <SearchBox>
        <InputBox placeholder={ "학생회를 검색하세요"}
        value={keyword}
        id="inputbox"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyPress={(e) => {}}
        // onKeyDown={handleKeyDown}
        // disabled={postInfo.isClose}
        // ref={inputMessageRef}
        >
        </InputBox>
        <img src="/image/search.svg"></img>
        </SearchBox>
       
      </SearchContainer> */}
      <ContentBox>

        {(campus == "global" ? groupedGlobalCouncilList : groupedMedicalCouncilList).map((college, index) => (
          <div key={index}>
            <CollegeName>{college[0] != null ? college[0].college.slice(1) : null}</CollegeName>
            <CollegeBox>
              {college.map((council) => (
                <Link to={"/councils/" + council.councilId} >
                  <CouncilItem key={council.councilId}>
                    <CouncilImgBox>
                      <CouncilImg src={ process.env.REACT_APP_BACK_URL + "/image/" + council.imgPath}></CouncilImg>
                    </CouncilImgBox>

                    <CouncilContent>
                      <CouncilName>{council.name}</CouncilName>
                      <ItemInfo>제공품 {council.providedItemCount} 대여품 {council.rentalItemCount}</ItemInfo>
                    </CouncilContent>
                  </CouncilItem>
                </Link>
                
              ))}
            </CollegeBox>
          </div>
        ))}

        {/* <AlertBox>
        <Alert>{"학기 초의 경우"}</Alert>
        <Alert>{"학생회의 구비 물품 정보가 적을 수 있습니다"}</Alert>
        <Alert>{"향후 업데이트되는 점 알려드립니다"}</Alert>
        </AlertBox> */}

        
      </ContentBox>
    </CouncilBox>
  );
};

export default CouncilList;