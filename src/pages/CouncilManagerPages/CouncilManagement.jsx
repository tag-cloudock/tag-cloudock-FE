import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";


const AdminBox = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 700px;
    background: #ffffff;
`;

const ContentBox = styled.div`
    padding: 40px 20px;
`;

const InfoBox = styled.div`
  margin-bottom: 50px;
  font-size: 17px;
  line-height: 30px;
  font-weight: 500;
  color: #525252;
  /* padding: 20px; */
  /* border-radius: 10px; */
  background: #ffffff;
  /* border: 1px solid #eeeeee; */
  & span{
    font-size: 17px;
    font-weight: 600;
    color: #b7b7b7;
    margin-right: 10px;
  }
  & div{
    margin-top: 10px;
    border-radius: 10px;
    white-space: pre-wrap;
    background: #f6f6f6;
    padding: 20px;
  }
`;

const CreateCouncil = styled.div`
  /* float: right; */
  margin: 0px auto;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #777777;
  text-align: center;
  border-radius: 50px;
  background: #eeeeeeca;
  /* border: 1px solid #eeeeee; */
  /* box-shadow: rgba(210, 210, 210, 0.5) 0px 0px 15px; */
  & img{
    margin-top: 5px;
    width: 40px;
    height: 40px;
    opacity: 20%;
  }
`;

const Items = styled.ul`
    background: #ffffff;
    border-radius: 10px;
    /* box-shadow: rgba(205, 207, 208, 0.5) 0px 0px 15px; */

    & li:not(:last-child){
        border-bottom: 1px solid #dddddd;
    }

`;

const Item = styled.li`
    list-style: none;
    padding: 10px 10px;
    font-weight: 700;
    color:#777777;
    font-size: 15px;
    height: 30px;
    line-height: 30px;

`;

const ItemRemoveBtn = styled.button`
    float: right;
    border: none;
    background: none;
    margin-top: 5px;
`;

const CountBox = styled.div`
    float: right;
    border: none;
    background: none;
    margin-right: 20px;
    height: 30px;
    line-height: 10px;
    height: 30px;
`;

const CountChangeBtn = styled.button`
    float: right;
    margin: 5px;
    background: none;
    border: none;
    & img{
        width: 20px;
    }
`;
const Count = styled.div`
    float: right;
    margin: 5px;
    font-size: 15px;
    border-radius: 30px;
    padding: 5px 15px;
    border: 1px solid #cccccc;
`;


const Subtitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  & span{
    display: block;
    float: right;
    border-radius: 10px;
    padding: 5px 7px;
    background: #38d9a9;
    font-size: 11px;
    color: #ffffff;
  }
`;

const Tag = styled.span`
  padding: 2px 7px;
  border-radius: 10px;
  border: 1px solid #38d9a9;
  color:#38d9a9;
  font-size: 15px;
  font-weight: 700;
  background: #e7fff8;
  margin-right: 10px;
`;

const CouncilManagement = () => {
    const [councilData, setCouncilData] = useState({ items: [] }); // 채팅방 리스트 상태
    const [key, setKey] = useState(0);
    const [cookies] = useCookies(); // 쿠키 사용하기 위해
    const navigate = useNavigate(); // 페이지 이동 위해

    useEffect(() => {
        if (!cookies.token) {
            navigate("/signin");
            return;
        }
        if (cookies.roles != "MANAGER") {
            navigate("/");
            return;  
          }
        const fetchCouncils = async () => {
            try {
                // 토큰 쿠키가 없다면 로그인 페이지로 이동
                

                // 유저의 채팅방 모두 가져오기 api 요청
                const response = await axios.get( process.env.REACT_APP_BACK_URL + "/manage/council", {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });

                if (response.data.code != 200) {
                    navigate("/council/signin");
                  }
                setCouncilData(response.data.data);



            } catch (error) {
                console.error("오류 발생:", error);
            }
        };

        fetchCouncils();
    }, [cookies.token, navigate, key]); // [] 와 같이 비워도 됨.


    const removeItem = async (id) => {
        try {
            const response = await axios.delete( process.env.REACT_APP_BACK_URL + "/council-item/" + id, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            window.alert("삭제되었습니다.");
            setKey(key + 1);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    const ItemQuantityChange = async (id, quantity) => {
        try {
            if (quantity < 0) {
                return;
            }
            const response = await axios.put( process.env.REACT_APP_BACK_URL + "/council-item/" + id,
                {
                    quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
            setKey(key + 1);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    return (
        <AdminBox>
            <Header headerType={"council"} headerText={councilData.name + " 학생회"}></Header>
            <ContentBox>
                    <Subtitle>
                    <Link to={"/council/manage/info"}>
                        <span>수정하기</span>
                    </Link>
                </Subtitle>
                <InfoBox>
                    <span>위치</span> {councilData.location}<br />
                    <span>운영시간</span> {councilData.operatingHours}<br />
                    <span>이용수칙</span> <div>{councilData.usageGuidelines}</div>
                </InfoBox>
                <Items>
                    {councilData.items.map((item) => (
                        <Item key={item.itemId}>
                            <Tag>{item.type === "RENTAL" ? "대여" : "제공"}</Tag>{item.name}

                            <ItemRemoveBtn onClick={() => removeItem(item.itemId)}>
                                <img src={"/image/remove.svg"}></img>
                            </ItemRemoveBtn>

                            <CountBox>
                                <CountChangeBtn onClick={() => ItemQuantityChange(item.itemId, item.quantity + 1)}><img src={"/image/up.svg"}></img></CountChangeBtn>
                                <Count>{item.quantity}</Count>
                                <CountChangeBtn onClick={() => ItemQuantityChange(item.itemId, item.quantity - 1)}><img src={"/image/down.svg"}></img></CountChangeBtn>
                            </CountBox>
                        </Item>
                    ))}
                </Items>
                <Link to={"/council/manage/item"}>
                    <CreateCouncil>
                        <img src={"/image/write_black.svg"}></img>
                    </CreateCouncil>
                </Link>
            </ContentBox>
        </AdminBox>
    );
};

export default CouncilManagement;