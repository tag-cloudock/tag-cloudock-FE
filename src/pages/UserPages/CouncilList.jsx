import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Header from "../../components/layout/Header";

// 애니메이션 정의
const heartBounce = keyframes`
  0% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.2) translateY(-10px);
  }
  100% {
    transform: scale(1) translateY(0);
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

const HeartBtn = styled.img`
  width: 30px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &.active {
    animation: ${heartBounce} 0.5s ease-in-out;
  }
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
  const [likedCouncils, setLikedCouncils] = useState({});
  const [hearts, setHearts] = useState({});

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
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchCouncils();
  }, []);

  const handleHeartClick = (councilId) => {
    setLikedCouncils(prevState => ({
      ...prevState,
      [councilId]: !prevState[councilId]
    }));

    setHearts(prevState => ({
      ...prevState,
      [councilId]: true
    }));

    setTimeout(() => {
      setHearts(prevState => ({
        ...prevState,
        [councilId]: false
      }));
    }, 500);
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
                      src="/image/heart.svg"
                      className={hearts[council.councilId] ? 'active' : ''}
                      onClick={() => handleHeartClick(council.councilId)}
                    />
                    <HeartCount>
                      {likedCouncils[council.councilId] ? '1' : '0'}
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
