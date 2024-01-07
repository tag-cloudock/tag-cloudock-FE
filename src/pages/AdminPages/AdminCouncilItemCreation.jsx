import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const AdminBox = styled.div`
    padding: 0 20px;
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

const Details = styled.details`
    position: relative;
    margin-top: 10px;
    width: 100%;
    font-size: 15px;
    font-weight: 800;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #E8E8E8;

    &[open] summary:after {
    transform: rotate(-45deg) translate(0%, 0%);
    }

`;
const ListBox = styled.ul`
    width: 100%;
    background: #ffffff;
    position: absolute;
    top: 55px;
    left: -1px;
    margin: 0;
    border-radius: 10px;
    border: 1px solid #E8E8E8;
    overflow: hidden;
`;

const List = styled.li`
    border-bottom: 1px solid #eeeeee;
    list-style: none;
    padding: 10px 20px;
    &:hover{
        background: #559cff1e;
    }
    &:last-child {
    border-bottom: none;
    }
`;

const Summary = styled.summary`
    padding: 15px 10px;
    border-radius: 5px;
    border-radius: 10px;
    list-style: none;
    color:  ${({ isDefault }) => (isDefault ? '#aaaaaa' : '#333333')};
    &:after {
        content: '';
        float: right;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #aaaaaa;
        border-left: 2px solid #aaaaaa;
        transform: rotate(45deg) translate(50%, 0%);
        transform-origin: center center;
        transition: transform ease-in-out 100ms
    }
`;

const Button = styled.button`
    color: #777777;
    font-weight: 700;
    border: none;
    background: none;
    font-size: 17px;
    width: 100%;
    text-align: center;
    display: block;
`;

const CouncilName = styled.div`
    margin: 20px 0px 10px 0px;
    font-weight: 700;

`;

const Items = styled.ul`
    background: #ffffff;
    border-radius: 10px;
    box-shadow: rgba(205, 207, 208, 0.5) 0px 0px 15px;

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

const Tag = styled.span`
  padding: 2px 7px;
  border-radius: 20px;
  border: 1px solid #559BFF;
  color:#559BFF;
  font-size: 15px;
  font-weight: 700;
  background: #EEF6FF;
  margin-right: 10px;
`;

const AdminCouncilItemCreation = () => {
    const [councilData, setCouncilData] = useState({
        college: '',
        items: []
    }); 
    const [name, setName] = useState("");
    const [type, setType] = useState("물품 유형");
    const [key, setKey] = useState(0);
    const { id } = useParams();
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
                const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/council/" + id, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });

                setCouncilData(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("오류 발생:", error);
            }
        };

        fetchCouncils();
    }, [cookies.token, navigate, key]); // [] 와 같이 비워도 됨.


    const handleAddCouncil = async (e) => {
        e.preventDefault();

        // 입력을 아에 안했는지 검사
        if (name.length < 1) {
            window.alert("학과를 입력해주세요.");
            setName('');
            return;
        }
        if (type == "물품 유형") {
            window.alert("물품 유형을 선택해주세요.");
            return;
        }

        try {
            // 회원가입 api 요청
            const councilId = id;
            const signUpResponse = await axios.post("http://" + process.env.REACT_APP_BACK_URL + "/council-item",
                {
                    councilId,
                    name,
                    type,
                }
            );
            // 성공시
            if (signUpResponse.status === 200) {
                window.alert("생성 성공");
                setKey(key + 1);
                // navigate("/");
            }
        } catch (error) {
            console.error("오류 발생:", error);

        }
    };
    const removeItem = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete("http://" + process.env.REACT_APP_BACK_URL + "/council-item/" + id, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            window.alert("삭제되었습니다.");
            setKey(key + 1);
            console.log(response);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    const ItemQuantityChange = async (id, quantity) => {
        try {
            console.log(id);
            if (quantity < 0) {
                return;
            }
            const response = await axios.put("http://" + process.env.REACT_APP_BACK_URL + "/council-item/" + id,
                {
                    quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
            setKey(key + 1);
            console.log(response);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };
    return (
        <AdminBox>
            <Header headerType={"admin"} headerText={"물품 추가"}></Header>
            <div>
                <InputBox type="text" name="name" placeholder="물품명"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <Details>
                    <Summary isDefault={type == "물품 유형"}>
                        {type}
                    </Summary>
                    <ListBox>
                        <List>
                            <Button onClick={() => setType("RENTAL")}>
                                RENTAL
                            </Button>
                        </List>
                        <List>
                            <Button onClick={() => setType("PROVIDED")}>
                                PROVIDED
                            </Button>
                        </List>
                    </ListBox>
                </Details>
                {/* 제출 버튼 */}
                <SummitBtn onClick={handleAddCouncil}>추가</SummitBtn>
            </div>
            <div>
                <CouncilName>{councilData.name}</CouncilName>
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

            </div>
        </AdminBox>
    );
};

export default AdminCouncilItemCreation;