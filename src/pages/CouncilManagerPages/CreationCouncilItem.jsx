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

const Title = styled.div`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
`;

const InputBox = styled.input`
    border: none;
    padding: 15px 10px;
    margin-top: 10px;
    box-sizing: border-box;
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    color:#000000;
    border-radius: 10px;
    /* border: 1px solid #E8E8E8; */
    background: #f5f5f5;
    outline: none;
    &::placeholder {
      color: #dbdbdb; 
        font-weight: 500;
        font-size: 16px;
    }
    &:focus {
      border-color: #6093FF;
    }
`;

const SummitBtn = styled.button`
    width: 100%;
    height: 36px;
    font-size: 16px;
    font-weight: 700;
    border: none;
    color: #ffffff;
    margin-top: 30px;
    border-radius: 1000px;
    background: #6093FF;
`;



const OptionList = styled.div`
    margin-top: 10px;
    width: 100%;
    background: #ffffff;

    border-radius: 100px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #eeeeee;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;


const Button = styled.button`

    background:  ${({ isOn }) => (isOn ? " #eeeeee" : "none")};
    color: #000000;
    font-weight: 700;
    border: none;
    padding: 10px 0px;
    border-radius: 1000px;
    font-size: 14px;
    width: 100%;
    text-align: center;
    display: block;
`;


const CreationCouncilItem = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("RENTAL");
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
            const PostResponse = await axios.post( process.env.REACT_APP_BACK_URL + "/manage/council-item",
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
            <Header headerType={"manage"} headerText={"물품 추가"}></Header>
            <ContentBox>
                <Title>물품명</Title>
                <InputBox type="text" name="name" placeholder="물품명"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
 <Title>물품 타입</Title>
                    <OptionList>
                    <Button isOn={type == "RENTAL"} onClick={() => setType("RENTAL")}>
                                대여품
                    </Button>
                     <Button isOn={type == "PROVIDED"}  onClick={() => setType("PROVIDED")}>
                                제공품
                  </Button>
                    </OptionList>
                {/* 제출 버튼 */}
                <SummitBtn onClick={handleAddCouncil}>추가</SummitBtn>
            </ContentBox>
        </Container>
    );
};

export default CreationCouncilItem;