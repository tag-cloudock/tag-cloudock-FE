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

const CollegeBox = styled.ul`
    background: #ffffff;
    margin-bottom: 20px;
    border-radius: 15px;
    box-shadow: rgba(215, 218, 220, 0.2) 0px 0px 15px;
    overflow: hidden;
    & a:not(:last-child) li{
        border-bottom: 1px solid #dddddd;
    }
`;

const CouncilImg = styled.div`
    width: 50px;
    height: 50px;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    float: left;
    margin-right: 10px;
`;

const CouncilContent = styled.div`
    /* float: left; */
    display: inline-block;

`;

const RemoveBtn = styled.button`
    width: 20px;
    float: right;
    margin-right: 10px;
    background: none;
    border: none;
    & img{
        margin-top: 13px;
        width: 25px;
    }
`;


const Council = styled.li`
    list-style: none;
    padding: 15px 10px; 
    line-height: 25px;
`;
const CollegeName = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: #505050;
    margin-bottom: 10px;
`;

const CouncilName = styled.div`
    font-weight: 800;
    color: #555555;
`;

const ItemInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #aaaaaa;
`;



const CreateCouncil = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #777777;
  text-align: center;
  /* padding: 10px; */
  border-radius: 10px;
  background: #ffffff;
  box-shadow: rgba(215, 218, 220, 0.2) 0px 0px 15px;
  & img{
    opacity: 30%;
  }
`;


const CiManage = () => {
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

    const removeCouncil = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete("http://"+process.env.REACT_APP_BACK_URL+"/council/"+id, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
            });
            window.alert("삭제되었습니다.");
            setKey(key+1);
            console.log(response);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    return (
        <AdminBox>
            <Header headerType={"admin"} headerText={"학생회 대여품 관리"}></Header>
            <Link to={"/admin/cimanage/create"}>
                <CreateCouncil>
                    <img src={"/image/write_black.svg"}></img>
                </CreateCouncil>
            </Link>
            <div>
            {groupedCouncilList.map((college, index) => (
                <div key={index}>
                    <CollegeName>{college[0] != null ? college[0].college.slice(1) : null}</CollegeName>
                    <CollegeBox>
                        {college.map((council) => (
                            <Council key={council.councilId}>
                                <CouncilImg></CouncilImg>
                                <Link to={"/admin/cimanage/add/"+council.councilId} >
                                <CouncilContent>
                                    <CouncilName>{council.name}</CouncilName>
                                    <ItemInfo>제공 물품 {council.providedItemCount} 대여 물품 {council.rentalItemCount}</ItemInfo>
                                </CouncilContent>
                                </Link>
                                <RemoveBtn onClick={() => removeCouncil(council.councilId)}>
                                    <img src={"/image/remove.svg"}></img>
                                </RemoveBtn>
                            </Council>
                        ))}
                    </CollegeBox>
                </div>
            ))}
            </div>
        </AdminBox>
    );
  };

export default CiManage;