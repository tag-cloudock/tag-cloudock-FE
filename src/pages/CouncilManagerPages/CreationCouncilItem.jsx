import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;

`;

const ContentBox = styled.div`
  padding: 0 20px;
`;

const InputBox = styled.input`
    display: block;
    border: none;
    padding: 15px 10px;
    margin-top: 10px;
    width: calc(100%);
    font-size: 15px;
    font-weight: 600;
    color:#5d5d5d;
    border-radius: 10px;
    /* border: 1px solid #E8E8E8; */
    background: #f8f8f8;
    outline: none;
    &::placeholder {
      color: #dbdbdb; 
        font-weight: 600;
        font-size: 15px;
    }
    &:focus {
      border-color: #38d9a9;
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
    background: #38d9a9;
`;

const Details = styled.details`
    position: relative;
    margin-top: 10px;
    width: 100%;
    font-size: 15px;
    font-weight: 800;
    background: #ffffff;
    border-radius: 10px;
    /* border: 1px solid #E8E8E8; */
    background: #f8f8f8;
    &[open] summary:after {
    transform: rotate(-45deg) translate(0%, 0%);
    }

`;

const OptionList = styled.ul`
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

const Option = styled.li`
    border-bottom: 1px solid #eeeeee;
    list-style: none;
    padding: 10px 20px;
    &:hover{
        background: #e9fff8;
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
    /* &:after {
        content: '';
        float: right;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #aaaaaa;
        border-left: 2px solid #aaaaaa;
        transform: rotate(45deg) translate(50%, 0%);
        transform-origin: center center;
        transition: transform ease-in-out 100ms
    } */
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


const CreationCouncilItem = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("물품 유형");
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
    });

    const handleAddCouncil = async (e) => {
        e.preventDefault();

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
            const PostResponse = await axios.post("http://" + process.env.REACT_APP_BACK_URL + "/manage/council-item",
                {
                    name,
                    type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );
            if (PostResponse.data.code != 200) {
                navigate("/council/signin");
              }
            // 성공시
            if (PostResponse.data.code === 200) {
                window.alert("생성 성공");
                setKey(key + 1);
                navigate("/council/manage");
            }
        } catch (error) {
            console.error("오류 발생:", error);

        }
    };
    return (
        <Container>
            <Header headerType={"noChatIcon"} headerText={"물품 추가"}></Header>
            <ContentBox>
                <InputBox type="text" name="name" placeholder="물품명"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <Details>
                    <Summary isDefault={type == "물품 유형"}>
                        {type == "RENTAL" ? "대여품" : "제공품"}
                    </Summary>
                    <OptionList>
                        <Option>
                            <Button onClick={() => setType("RENTAL")}>
                                대여품
                            </Button>
                        </Option>
                        <Option>
                            <Button onClick={() => setType("PROVIDED")}>
                                제공품
                            </Button>
                        </Option>
                    </OptionList>
                </Details>
                {/* 제출 버튼 */}
                <SummitBtn onClick={handleAddCouncil}>추가</SummitBtn>
            </ContentBox>
        </Container>
    );
};

export default CreationCouncilItem;