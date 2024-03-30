import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import Register from "./Register";

const AdminBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;

`;

const ContentBox = styled.div`
  padding: 0 20px;
`;
const SubTitle = styled.div`
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 800;
    color: #555555;
`;

const InputBox = styled.input`
    display: block;
    border: none;
    padding: 15px 3%;
    margin-top: 10px;
    width: 94%;
    color:#333333;
    font-size: 18px; 
    border-radius: 10px;
    border: 1px solid #dddddd;
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
    font-size: 18px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #E8E8E8;

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

const OptionItem = styled.li`
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

const FileInputBtn = styled.label`
    display: block;
    margin: 0 auto;
    width: 66%;
    text-align: left;
    & div{
      margin-top: 10px;
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      color:#777777;
      border: 1px solid #379DFF;
      border-radius: 5px;
      padding: 5px;
    }
`;
const FileInputBox = styled.input`
    width: 66%;
    border: none;
    background: none;
    &::file-selector-button{
      display: none;
    }
`;
const TextareaBox = styled.textarea`
    width: 94%;
    height: 100px;
    resize: none;
    margin: 10px 0px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    color:#333333;
    font-size: 18px; 
    outline: none;
    padding: 10px 3%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    &:focus {
      border-color: #379DFF;
    }
`;

const AdminCouncilCreation = () => {
    const [groupedCouncilList, setGroupedCouncilList] = useState([]); // 채팅방 리스트 상태
    const [key, setKey] = useState(0);
    const [name, setName] = useState("");
    const [college, setCollege] = useState("단과대 이름");
    const [location, setLocation] = useState("");
    const [operatingHours, setOperatingHours] = useState("");
    const [usageGuidelines, setUsageGuidelines] = useState("");
    const [file, setFile] = useState(null);
    const [cookies] = useCookies(); // 쿠키 사용하기 위해
    const navigate = useNavigate(); // 페이지 이동 위해

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };
    useEffect(() => {
        if (!cookies.token) {
            navigate("/signin");
            return;
        }
        if (cookies.roles != "ADMIN") {
            navigate("/");
            return;

        }
        const fetchCouncils = async () => {
            try {
                // 토큰 쿠키가 없다면 로그인 페이지로 이동
                if (!cookies.token) {
                    navigate("/signin");
                    return;
                }

                // 유저의 채팅방 모두 가져오기 api 요청
                const response = await axios.get( process.env.REACT_APP_BACK_URL + "/councils/all", {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });

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
    }, [cookies.token, navigate, key]); // [] 와 같이 비워도 됨.

    const handleAddCouncil = async (e) => {
        e.preventDefault();

        // 입력을 아에 안했는지 검사
        if (name.length < 1) {
            window.alert("학과를 입력해주세요.");
            setName('');
            return;
        }
        if (college == "단과대 이름") {
            window.alert("단과대를 선택해주세요.");
            return;
        }
        if (location.length < 1) {
            window.alert("위치를 입력해주세요.");
            setLocation('');
            return;
        }
        if (operatingHours.length < 1) {
            window.alert("운영시간을 입력해주세요.");
            setOperatingHours('');
            return;
        }

        if (usageGuidelines.length < 1) {
            window.alert("가이드라인을 입력해주세요.");
            setUsageGuidelines('');
            return;
        }
        try {

            const formData = new FormData();
            formData.append('request', new Blob([JSON.stringify({
                name,
                college,
                location,
                operatingHours,
                usageGuidelines
            })],
                {
                    type: "application/json"
                }));
            formData.append('pic', file);
            const signUpResponse = await axios.post( process.env.REACT_APP_BACK_URL + "/manage/council",
                formData,
                {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${cookies.token}`,
                }
            );
            // 성공시
            if (signUpResponse.data.code === 200) {
                window.alert("생성 성공");
                // navigate("/");
            }
        } catch (error) {
            console.error("오류 발생:", error);

        }
    };
    return (
        <AdminBox>
            <Header headerType={"noChatIcon"} headerText={"학생회 추가"}></Header>
            <ContentBox>
                <SubTitle>학생회 생성</SubTitle>
                <InputBox type="text" name="name" placeholder="과 이름 (ex 컴퓨터공학과)"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <Details>
                    <Summary isDefault={college == "단과대 이름"}>
                        {college}
                    </Summary>
                    <OptionList>
                    <OptionItem>
                            <Button onClick={() => setCollege("G*총학생회")}>
                                총학생회
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G경영대학")}>
                                경영대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G사회과학대학")}>
                                사회과학대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G인문대학")}>
                                인문대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G법과대학")}>
                                법과대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G공과대학")}>
                                공과대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G바이오나노대학")}>
                                바이오나노대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("GIT융합대학")}>
                                IT융합대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G한의과대학")}>
                                한의과대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G예술체육대학")}>
                                예술체육대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G미래산업대학")}>
                                미래산업대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("G가천리버럴아츠칼리지")}>
                                가천리버럴아츠칼리지
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("M간호대학")}>
                                간호대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("M보건과학대학")}>
                                보건과학대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("M약학대학")}>
                                약학대학
                            </Button>
                        </OptionItem>
                        <OptionItem>
                            <Button onClick={() => setCollege("M의과대학")}>
                                의과대학
                            </Button>
                        </OptionItem>
                    </OptionList>
                </Details>

                <InputBox type="text" name="location" placeholder="위치 (ex AI공학관 500호)"

                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }}
                />
                <InputBox type="text" name="operatingHours" placeholder="운영시간 (ex 9시 ~ 16시)"
                    value={operatingHours}
                    onChange={(e) => {
                        setOperatingHours(e.target.value);
                    }}
                />
                <TextareaBox
                    type="text"
                    // ref={passwordRef}
                    name="usageGuidelines"
                    placeholder="이용수칙 (ex 뒷정리 필수)"
                    onChange={(e) => {
                        setUsageGuidelines(e.target.value);
                    }}
                />

                <FileInputBtn for="file">
                    <div>학생회 사진 추가</div>
                </FileInputBtn>
                <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />
                {/* 제출 버튼 */}
                <SummitBtn onClick={handleAddCouncil}>추가</SummitBtn>
            </ContentBox>
        </AdminBox>
    );
};

export default AdminCouncilCreation;