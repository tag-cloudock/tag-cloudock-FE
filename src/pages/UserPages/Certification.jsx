import Header from "../../components/layout/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
  padding-bottom: 100px;
`;

const Announcement = styled.div`
    margin: 30px auto;
    width: 80%;
    padding: 20px;
    border-radius: 20px;
    background: #fbfbfb;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 25px;
    color: #777777;
    text-align: left;
    & p{
        margin: 10px 0;
    }
    & p span{
        color: #6093FF;
    }
`;

const CertifiBox = styled.div`
    width: 100%;
    @media screen and (min-width: 701px) {
        width: 700px;
    }
`;

const InputBox = styled.input`
    display: block;
    margin: 10px auto;
    height: 40px;
    background: #f7f7f7;
    /* border: 1px solid #dddddd; */
    border: none;
    border-radius: 10px;
    color:#333333;
    font-size: 17px; 
    outline: none;
    padding: 0px 3%;
    width: 74%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 17px;
    }
    &:focus {
      border-color: #6093FF;
    }
`;

const SubmitBtn = styled.button`
    display: block;
    margin: 0px auto;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #6093FF;
    font-weight: bold;
    color:#ffffff;
    font-size: 18px; 
    outline: none;
    width: 80%;
    margin-top: 40px;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
`;

// 제출 버튼
const FileInputBtn = styled.label`
    display: block;
    margin: 0 auto;
    
    & div{
        display: block;
        margin: 0px auto;
        height: 40px;
        background: #efefef;
        border: none;
        border-radius: 10px;
        background: ${({ isFileSelected }) => (isFileSelected ? "#6093FF" : "#d6e3ff")};
        font-weight: bold;
        color:#ffffff;
        text-align: center;
        line-height: 40px;
        font-size: 18px; 
        outline: none;
        width: 80%;
        &::placeholder {
            color: #aaaaaa; 
            font-size: 18px;
        }
    }
`;
const FileInputBox = styled.input`
    /* width: 66%; */
    display: none;
    border: none;
    background: none;
    &::file-selector-button{
      display: none;
    }
`;

const Certification = () => {
    const [cookies, , removeCookie] = useCookies();
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위해
    const [name, setName] = useState("");
    const [studentIdNumber, setstudentIdNumber] = useState("");
    useEffect(() => {
        if (!cookies.token) {
            navigate("/signin");
            return;
        }
        
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length < 1) {
            window.alert("이름을 입력해주세요.");
            return;
        }
        if (studentIdNumber.length < 1) {
            window.alert("학번을 입력해주세요.");
            return;
        }
        if (file == null) {
            window.alert("사진을 선택해주세요.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('request', new Blob([JSON.stringify({
                name,
                studentIdNumber
            })],
                {
                    type: "application/json"
                }));
            formData.append('pic', file);
            const signUpResponse = await axios.post( process.env.REACT_APP_BACK_URL + "/certifi/request",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bearer ${cookies.token}`
                    },
                }
            );
            if (signUpResponse.data.code === 200) {
                window.alert("요청 성공!");
                navigate("/");
            }
        } catch (error) {
            console.error("오류 발생:", error);

        }
    };
    return (
        <Container>
            <Header headerType={"noChatIcon"} headerText={"학생증 인증하기"}></Header>
            {/* 이미지 형식 제한해야함 */}
            <Announcement>
                <p>
                    더욱 원활한 대여를 위해 <span>학생증 인증</span>을 하세요.
                </p>
                <p>
                    <span>모바일 학생증</span>의 캡처 사진 또는
                    <span> 카드형 학생증</span>의 촬영 사진을 업로드해주세요. <br /><span>*이름과 학번이 보여야합니다. <br />
                    *이를 제외한 정보는 가려주시기 바랍니다.</span>
                </p>
                <p>
                    제공한 정보는 학생증 인증 유무 표시 용도 외에는 사용되지 않습니다.
                </p>
                <p>
                    승인은  <span>1일~3일</span> 이내에 이루어집니다.<br />
                    3일 이후에도 승인 되지 않은 경우는 반려된 것이며, 반려 사유 문의는  <span>@baram_official_</span>로 부탁드립니다.
                </p>
            </Announcement>
            <CertifiBox>
                <InputBox
                    type="text"
                    // ref={useridRef}
                    name="name"
                    // value={userid}
                    placeholder="이름 (ex 홍길동)"
                    autocomplete="off"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                // onKeyDown={(e) => { activeEnter(e) }}
                />
                <InputBox
                    type="text"
                    // ref={""}
                    name="id"
                    // value={""}
                    placeholder="학번 (ex 2024xxxxx)"
                    autocomplete="off"
                    onChange={(e) => {
                        setstudentIdNumber(e.target.value);
                    }}
                // onKeyDown={(e) => { activeEnter(e) }}
                />
                <FileInputBtn for="file" isFileSelected={file != null}>
                    <div>학생증 이미지 선택</div>
                    <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />
                </FileInputBtn>
                <SubmitBtn onClick={handleSubmit}>인증 요청하기</SubmitBtn>
            </CertifiBox>
        </Container>
    );
};

export default Certification;