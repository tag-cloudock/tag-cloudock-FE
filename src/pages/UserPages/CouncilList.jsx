import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const CouncilBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;  
`;

const CampusAnnoBox = styled.div`
  background: #f1f5ff;
  /* margin-bottom: 20px; */
  /* border-radius: 15px; */
  /* box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px; */
  padding: 30px 20px;
  @media screen and (min-width: 700px) {
    border-radius: 15px; 
  }
  
`;

const BigText = styled.div`
  font-weight: 800;
  font-size: 25px;
  color : #6093FF;
`;

const SmallText = styled.div`
  font-size: 15px;
  font-weight: 400;
  color : #6093FF;
`;

const RealTime = styled.span`
  /* float: left;
  padding: 5px;
  font-size: 14px;
  margin-top: -5px;
  background: #ffdddd;
  color: #ff7979;
  border: 1px solid #ff7979;
  border-radius: 15px; */
`;


const ContentBox = styled.div`
  padding: 0px 20px;
`;

const CollegeBox = styled.ul`
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 5px;
  /* border: 1px solid #eeeeee; */
  /* box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px; */
  overflow: hidden;
  & a:not(:last-child) li{
      border-bottom: 1px solid #eeeeee;
  }
`;

const CouncilImgBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #eeeeee;
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
  padding: 15px 10px; 
  line-height: 25px;
`;

const CollegeName = styled.div`
    display: inline-block;
    padding: 7px 15px;
    border-radius: 7px;
    font-size: 15px;
    font-weight: 400;
    color: #6e6e6e;
    font-weight: 700;
    margin-bottom: 10px;
    background: #f5f5f5;
    /* 379dff */
`;

const CouncilName = styled.div`
    font-weight: 500;
    color: #000000;
`;

const ItemInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #aaaaaa;
`;

const Alert = styled.div`
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    color: #d2d2d2aa;
`;
const AlertBox = styled.div`
    margin-top: 50px;
    background: #f4f4f49c;
    padding: 20px;
    border-radius: 20px;
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


const CouncilList = () => {
  const [groupedCouncilList, setGroupedCouncilList] = useState([]); // 채팅방 리스트 상태
  const [councilCount, setCouncilCount] = useState();
  const [keyword, setKeyword] = useState("");
  const [key, setKey] = useState(0);
  const [cookies] = useCookies(); // 쿠키 사용하기 위해
  const navigate = useNavigate(); // 페이지 이동 위해
  const location = useLocation();
  const [campus, setCampus] = useState();

  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const DEBOUNCE_TIME = 200;

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchValue(keyword);
  }, DEBOUNCE_TIME); // 새로운 타이머 설정

  return () => clearTimeout(debounce); 

  }, [keyword]);


  useEffect(() => {
    const campusValue = new URLSearchParams(location.search).get('campus');
    setCampus(campusValue);
    const fetchCouncils = async () => {
      try {
        const response = await axios.get( process.env.REACT_APP_BACK_URL + "/council/all?campus=" + campusValue, {

        });

        setCouncilCount(response.data.data.length);
        const groupedData = response.data.data.reduce((acc, item, index) => {
          const key = item.college;
          if (index !== 0 && key !== response.data.data[index - 1].college) {
            acc.push([]);
          }
          acc[acc.length - 1].push(item);
          return acc;
        }, [[]]);

        setGroupedCouncilList(groupedData);
        console.log(groupedData);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchCouncils();
  }, [cookies.token, navigate, key]);  // [] 와 같이 비워도 됨.

  return (
    <CouncilBox>
      <Header headerText={"학생회"}></Header>

      <CampusAnnoBox>
        <BigText>{campus == 'global' ? "글" : campus == 'medical' ? "메" : "까아꿍"}캠에서 빌리길 바람</BigText>
        <SmallText>총 {councilCount}개의 학생회에서 물품대여중</SmallText>
      </CampusAnnoBox>
      <SearchContainer>
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
       
      </SearchContainer>
      <ContentBox>
        {/* <div>
          <CollegeName>{"총학생회"}</CollegeName>
          <Link to={"/councils/" + 1} >
            <CouncilItem key={-1}>
              <CouncilImgBox>
                <CouncilImg src={"image/tc.jpg"}></CouncilImg>
              </CouncilImgBox>

              <CouncilContent>
                <CouncilName>{"총학생회"}</CouncilName>
                <ItemInfo>제공품 {0} 대여품 {0}</ItemInfo>
              </CouncilContent>
            </CouncilItem>
          </Link>
        </div> */}
        {groupedCouncilList.map((college, index) => (
          <div key={index}>
            {debouncedSearchValue == "" ?
            <CollegeName>{college[0] != null ? college[0].college.slice(1) : null}</CollegeName>
            :null
          }
            <CollegeBox>
              {college.map((council) => (
                council.name.includes(debouncedSearchValue) ?
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
                : null
              ))}
            </CollegeBox>
          </div>
        ))}
        <AlertBox>
        <Alert>{"학기 초의 경우"}</Alert>
        <Alert>{"학생회의 구비 물품 정보가 적을 수 있습니다"}</Alert>
        <Alert>{"향후 업데이트되는 점 알려드립니다"}</Alert>
        </AlertBox>

        
      </ContentBox>
    </CouncilBox>
  );
};

export default CouncilList;