/*
용도: 관리자 페이지
담당자: 양태석
사용법: App.js에서 라우팅됨.
기타: ADMIN 권한 유저만 접근 가능
*/
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../layout/Header";


const AdminBox = styled.div`
    padding: 0 20px;
`;




const SelectBox = styled.select`
    display: block;
    border: none;
    padding: 15px 2.5%;
    margin-top: 10px;
    width: 100%;
    font-size: 15px;
    font-weight: 800;
    color: #333333;
    border-radius: 10px;
    border: 1px solid #E8E8E8;
    outline: none;
    color: #aaaaaa; 
    & option {
        color: #aaaaaa; 
    }
`;
const InputBox = styled.input`
    display: block;
    border: none;
    padding: 15px 3%;
    margin-top: 10px;
    width: 94%;
    font-size: 15px;
    font-weight: 800;
    color: #333333;
    border-radius: 10px;
    border: 1px solid #E8E8E8;
    outline: none;
    &::placeholder {
        color: #aaaaaa; 
    }
    &:focus {
      border-color: #559BFF;
    }
`;

const SummitBtn = styled.button`
    width: 100%;
    height: 40px;
    font-size: 20px;
    font-weight: 800;
    border: none;
    color: #ffffff;
    margin-top: 20px;
    border-radius: 10px;
    background: #559BFF;
`;


const CiCreate = () => {
    const [groupedCouncilList, setGroupedCouncilList] = useState([]); // 채팅방 리스트 상태
    const [key, setKey] = useState(0); 
    const [cookies] = useCookies(); // 쿠키 사용하기 위해
    const navigate = useNavigate(); // 페이지 이동 위해
  
    useEffect(() => {
      const fetchCouncils = async () => {
        try {
          // 토큰 쿠키가 없다면 로그인 페이지로 이동
          if (!cookies.token) {
            navigate("/signin");
            return;
          }
  
          // 유저의 채팅방 모두 가져오기 api 요청
          const response = await axios.get("http://"+process.env.REACT_APP_BACK_URL+"/council/all", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });

          const groupedData = response.data.reduce((acc, item, index) => {
            const key = item.college;
            if (index !== 0 && key !== response.data[index-1].college) {
              acc.push([]);
            }
            acc[acc.length-1].push(item);
            return acc;
          }, [[]]);
    
          setGroupedCouncilList(groupedData);
          console.log(groupedData);

        } catch (error) {
          console.error("오류 발생:", error);
        }
      };

      fetchCouncils();
    }, [cookies.token, navigate, key]); // [] 와 같이 비워도 됨.


    return (
        <AdminBox>
            <Header headerType={"admin"} headerText={"학생회 추가"}></Header>
            <div>
                <InputBox type="text" name="name" placeholder="과 이름 (ex 컴퓨터공학과)"/>
                <SelectBox value={""}>
                    <option value="">단과대 이름</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </SelectBox>
                <InputBox type="text" name="location" placeholder="위치 (ex AI공학과 500호)"/>
                <InputBox type="text" name="operatingHours" placeholder="운영시간 (ex 9시 ~ 16시)"/>
                <InputBox type="text" name="usageGuidelines" placeholder="이용수칙 (ex 뒷정리 필수)"/>
                {/* 제출 버튼 */}
                <SummitBtn onClick={""}>추가</SummitBtn>
            </div>
        </AdminBox>
    );
  };

export default CiCreate;