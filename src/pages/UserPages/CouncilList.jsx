import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Header from "../../components/layout/Header";

// 애니메이션 정의
const heartBounce = keyframes`
  0% {
    transform: scale(1) translateY(0) translateX(0);
    fill: #eeeeee; 
  }
  50% {
    transform: scale(1.2) translateY(-10px) translateX(-2px);
    fill: #F54D5F;
  }
  100% {
    transform: scale(1) translateY(0) translateX(0);
    fill: #eeeeee; 
  }
`;



// 스타일 정의
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
  overflow: visible;
`;

const CouncilImgBox = styled.div`
  width: 50px;
  height: 50px;
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
  display: flex;
  align-items: center;
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
`;

const SearchBox = styled.div`
  margin-left: auto;
  margin-right: 20px;
  display: block;
  width: 250px;
  background: #f4f4f4af;
  padding: 7px 10px;
  border-radius: 10px;
  display: flex;
  &:focus {
    border: none;
  }
  & img {
    width: 20px;
    margin-right: 10px;
  }
`;

const InputBox = styled.input`
  border: none;
  width: 250px;
  background: none;
  outline: none;
  font-size: 16px;
  color: #484848;
  font-weight: 600;
  &::placeholder {
    color: #d1d1d1;
    font-weight: 600;
  }
`;

const NoCouncils = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 30px;
  color: #eeeeee;
`;

const HeartBox = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

const HeartBtn = styled.div`
  width: 30px;
  overflow: visible;
  
`;

const Heart = styled.path`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &.active {
    animation: ${heartBounce} 0.5s ease-in-out;
  }
  margin-left: -5px;
  fill: #eeeeee;
  overflow: visible;

`;
const HeartCount = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #bcbcbc;
  margin-top: 5px;
`;

const CouncilList = ({ campus }) => {
  const [groupedGlobalCouncilList, setGroupedGlobalCouncilList] = useState([]);
  const [groupedMedicalCouncilList, setGroupedMedicalCouncilList] = useState([]);
  const [hearts, setHearts] = useState({});
  const [activeHearts, setActiveHearts] = useState({});

  useEffect(() => {
    const fetchCouncils = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/council/all?campus=global`
        );
        const groupedData = response.data.data.reduce((acc, item, index) => {
          const key = item.college;
          if (index !== 0 && key !== response.data.data[index - 1].college) {
            acc.push([]);
          }
          acc[acc.length - 1].push(item);
          return acc;
        }, [[]]);
        setGroupedGlobalCouncilList(groupedData);

        const response2 = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/council/all?campus=medical`
        );
        const groupedData2 = response2.data.data.reduce((acc, item, index) => {
          const key = item.college;
          if (index !== 0 && key !== response2.data.data[index - 1].college) {
            acc.push([]);
          }
          acc[acc.length - 1].push(item);
          return acc;
        }, [[]]);
        setGroupedMedicalCouncilList(groupedData2);

        // Initialize hearts state
        const heartsState = response.data.data.reduce((acc, item) => {
          acc[item.councilId] = item.heart;
          return acc;
        }, {});
        setHearts(heartsState);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchCouncils();
  }, []);

  const handleHeartClick = async (councilId) => {
    // Toggle heart state immediately
    setHearts(prevState => ({
      ...prevState,
      [councilId]: (prevState[councilId] || 0) + 1
    }));

    // Add active class to trigger animation
    setActiveHearts(prevState => ({
      ...prevState,
      [councilId]: true
    }));

    try {
      await axios.put(`${process.env.REACT_APP_BACK_URL}/council/${councilId}`);
    } catch (error) {
      console.error("오류 발생:", error);
    }

    // Remove active class after animation duration
    setTimeout(() => {
      setActiveHearts(prevState => ({
        ...prevState,
        [councilId]: false
      }));
    }, 500); // Match this time with the animation duration
  };

  return (
    <CouncilBox>
      <ContentBox>
        {(campus === "global" ? groupedGlobalCouncilList : groupedMedicalCouncilList).map((college, index) => (
          <div key={index}>
            <CollegeName>{college[0] ? college[0].college.slice(1) : null}</CollegeName>
            <CollegeBox>
              {college.map((council) => (
                <CouncilItem key={council.councilId}>
                  <Link to={`/councils/${council.councilId}`}>
                    <CouncilImgBox>
                      <CouncilImg src={`${process.env.REACT_APP_BACK_URL}/image/${council.imgPath}`} />
                    </CouncilImgBox>
                    <CouncilContent>
                      <CouncilName>{council.name}</CouncilName>
                      <ItemInfo>제공품 {council.providedItemCount} 대여품 {council.rentalItemCount}</ItemInfo>
                    </CouncilContent>
                  </Link>
                  <HeartBox>
                    <HeartBtn
                      // src="/image/heart.svg"
                      className={activeHearts[council.councilId] ? 'active' : ''}
                      onClick={() => handleHeartClick(council.councilId)}
                    >
                        <svg  overflow="visible" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Heart className={activeHearts[council.councilId] ? 'active' : ''} d="M17.5 1.9165C16.3739 1.93402 15.2724 2.24836 14.3067 2.82778C13.341 3.40719 12.5453 4.23117 12 5.2165C11.4546 4.23117 10.6589 3.40719 9.6932 2.82778C8.7275 2.24836 7.62601 1.93402 6.49996 1.9165C4.7049 1.99449 3.01366 2.77976 1.79574 4.10074C0.577818 5.42171 -0.0677922 7.17103 -4.17093e-05 8.9665C-4.17093e-05 13.5135 4.78596 18.4795 8.79996 21.8465C9.69618 22.5996 10.8293 23.0125 12 23.0125C13.1706 23.0125 14.3037 22.5996 15.2 21.8465C19.214 18.4795 24 13.5135 24 8.9665C24.0677 7.17103 23.4221 5.42171 22.2042 4.10074C20.9863 2.77976 19.295 1.99449 17.5 1.9165Z" />
                          <defs>
                            <clipPath id="clip0_406_1997">
                              <rect width="24" height="24" fill="none"/>
                            </clipPath>
                          </defs>
                        </svg>
                    </HeartBtn>
                    <HeartCount>
                      {hearts[council.councilId] || 0}
                    </HeartCount>
                  </HeartBox>
                </CouncilItem>
              ))}
            </CollegeBox>
          </div>
        ))}
        {campus === "medical" && <NoCouncils>준비중이에요!</NoCouncils>}
      </ContentBox>
    </CouncilBox>
  );
};

export default CouncilList;
