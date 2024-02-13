import Header from "../../components/layout/Header";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
const EditBox = styled.div`
  position: absolute;
  width: 100%;
  height: 110%;
  max-width: 700px;
  background: #ffffff;
`;

const ContentBox = styled.div`
  padding: 20px;
`;

const InputBoxTitle = styled.div`
float: left;
width: 100%;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
  color: #000000;
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
    padding: 20px 3%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    &:focus {
      border-color: #379DFF;
    }
`;

const InputBox = styled.input`
    width: 94%;
    height: 40px;
    margin: 10px 0px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    color:#333333;
    font-size: 18px; 
    outline: none;
    padding: 0px 3%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    &:focus {
      border-color: #379DFF;
    }
`;

const HalfInputBox = styled.input`
    width: 42%;
    height: 40px;
    margin: 10px auto;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    color:#333333;
    font-size: 18px; 
    float: right;
    outline: none;
    padding: 0px 3%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    &:focus {
      border-color: #379DFF;
    }
`;

const InputContainer = styled.div`
    width: 100%;
`;
const SubmitBtn = styled.button`
    display: block;
    margin: 30px 0px;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #379DFF;
    font-weight: bold;
    color:#ffffff;
    font-size: 18px; 
    outline: none;
    width: 100%;
`;

const DropdownWrapper = styled.div`
  margin: 10px 0px;
  width: 48%;
  position: relative;
  float: left;
  
`;

const DropdownButton = styled.button`
  border: 1px solid #dddddd;
  border-radius: 10px;
  font-size: 18px;
  background-color: #ffffff;
  color: #000000;
  padding: 10px 10px;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  & div{
    display: inline-block;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
  }
`;

const DropdownContent = styled.div`
    margin-top: 10px;
  display: ${props => (props.open ? 'block' : 'none')};
  border-radius: 10px;
  background-color: #ffffff;
  position: absolute;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(96, 96, 96, 0.2);
  z-index: 1;
  overflow: hidden;
`;

const DropdownItem = styled.a`
    /* border-radius: 10px; */
  color: black;
  padding: 12px 16px;
  text-align: center;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f5f5f5;
  }
  
`;

const DateWrapper = styled.div`
width: 100%;
float: left;
margin: 10px 0px;
  display: flex;
  flex-direction: row; /* 가로로 나오도록 수정 */
  align-items: center; /* 화면 중앙 정렬 */
  justify-content: center;
  /* gap: 4%; 간격 추가 */
  & span{
    margin: 0px 10px;
    height: 30px;
    font-size: 20px;
    color:#aaaaaa;
    vertical-align: middle;
  }
`;

const DateLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const DateInput = styled.input`
  padding: 10px 20px;
  width: 48%;
  border: 1px solid #dddddd;
border-radius: 10px;
&:focus {
  }

`;

// 제출 버튼
const FileInputBtn = styled.label`
    display: block;
    margin: 0 auto;
    /* width: 80%; */
    text-align: left;
    /* padding: 20px; */
    & div{
      margin-top: 10px;
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      color:#379DFF;
      border: 1px solid #379DFF;
      border-radius: 30px;
      padding: 10px;
    }
`;

const FileInputBox = styled.input`
    border: none;
    background: none;
    margin-left: 5px;
    &::file-selector-button{
      display: none;
    }
`;
const RangeInput = styled.input`
  width: 100%;
  margin-top: 10px;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  border-radius: 5px;
  background: #eeeeee;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #379DFF;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #379DFF;
    cursor: pointer;
  }
`;

const PostEdit = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(); // 쿠키 사용을 위해
    const [isOpen, setIsOpen] = useState(false);
    const [todayDate, setTodayDate] = useState('');

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState("G 글로벌 캠퍼스");
    const [locationDetail, setLocationDetail] = useState('');
    const [rentalFee, setRentalFee] = useState(0);
    const [security, setSecurity] = useState('없음');
    const [needAt, setNeedAt] = useState('');
    const [returnAt, setReturnAt] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handlePost = async (e) => {
        e.preventDefault();

        if (title.length < 1) {
            window.alert("제목을 입력해주세요.");
            // useridRef.current.focus();
            // setUserid('');
            return;
          }
        try {
            const formData = new FormData();
            formData.append('request', new Blob([JSON.stringify({
                title,
                location,
                locationDetail,
                rentalFee,
                security,
                needAt,
                returnAt,
                content
            })],
                {
                    type: "application/json"
                }));
            formData.append('pic', file);

            const Response = await axios.post("http://" + process.env.REACT_APP_BACK_URL + "/post",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${cookies.token}`,
                    },
                }
            );
            if (Response.status === 200) {
                window.alert("작성 완료");
                navigate("/");
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        // 오늘 날짜를 얻기 위해 현재 날짜 객체를 생성
        const today = new Date();

        // 시작 날짜의 최소 선택일을 오늘로 설정
        const todayString = today.toISOString().split('T')[0];
        setTodayDate(todayString);
        setNeedAt(todayString);
        setReturnAt(todayString);
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setLocation(option);
        setIsOpen(false);
    };
    const handleStartDateChange = (e) => {
        setNeedAt(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setReturnAt(e.target.value);
    };
    return (
        <EditBox>
            <Header headerType={"close"} headerText={"작성"}></Header>
            <ContentBox>
                <InputBoxTitle>제목</InputBoxTitle>
                <InputBox
                    type="text"
                    // ref={passwordRef}
                    name="title"
                    placeholder="제목"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <InputBoxTitle>빌리는 위치</InputBoxTitle>
                <InputContainer>
                    <DropdownWrapper>
                        <DropdownButton onClick={toggleDropdown}>
                            <div>{location ? location : '위치 선택'}</div>
                            <span>{isOpen ? ">" : "<"}</span>
                        </DropdownButton>
                        <DropdownContent open={isOpen}>
                        <DropdownItem href="#" onClick={() => handleOptionClick('G 글로벌 캠퍼스')}>
                                G 글로벌 캠퍼스
                            </DropdownItem>
                            <DropdownItem href="#" onClick={() => handleOptionClick('G 비전타워')}>
                                G 비전타워
                            </DropdownItem>
                            <DropdownItem href="#" onClick={() => handleOptionClick('G 가천관')}>
                                G 가천관
                            </DropdownItem>
                            <DropdownItem href="#" onClick={() => handleOptionClick('G AI공학관')}>
                                G AI공학관
                            </DropdownItem>
                            <DropdownItem href="#" onClick={() => handleOptionClick('M 약학대학')}>
                                M 약학대학
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownWrapper>
                    <HalfInputBox
                        type="text"
                        // ref={passwordRef}
                        name="locationDetail"
                        placeholder="자세한 위치"
                        onChange={(e) => {
                            setLocationDetail(e.target.value);
                        }}
                    />
                </InputContainer>
                <InputBoxTitle>대여금</InputBoxTitle>
                <InputBox
                    type="text"
                    value={rentalFee == 0 ? "무료로 대여하기" : rentalFee+"원"}
                    name="rentalFee"
                    placeholder="₩ 대여금을 설정해주세요."
                />
                <RangeInput
                    type="range"
                    id="rentalFee"
                    name="rentalFee"
                    min={0}
                    max={10000}
                    step={500}
                    value={rentalFee}
                    onChange={(e) => {
                        setRentalFee(e.target.value);
                    }}
                />



                <InputBoxTitle>보증품</InputBoxTitle>
                <InputBox
                    type="text"
                    // ref={passwordRef}
                    name="security"
                    placeholder="보증품을 입력하세요(ex 신분증, 현금)"
                    onChange={(e) => {
                        setSecurity(e.target.value);
                    }}
                />
                <InputBoxTitle>대여 기간</InputBoxTitle>
                <DateWrapper>
                    {/* <DateLabel htmlFor="startDate">시작 날짜:</DateLabel> */}
                    <DateInput
                        type="date"
                        id="needAt"
                        name="needAt"
                        value={needAt}
                        onChange={handleStartDateChange}
                        min={todayDate}
                        required
                    />
                    <span>~</span>
                    {/* <DateLabel htmlFor="endDate">끝나는 날짜:</DateLabel> */}
                    <DateInput
                        type="date"
                        id="returnAt"
                        name="returnAt"
                        value={returnAt}
                        onChange={handleEndDateChange}
                        min={needAt}  // 끝 날짜는 시작 날짜 이후만 선택 가능
                        required
                    />
                </DateWrapper>
                <InputBoxTitle>내용</InputBoxTitle>
                <TextareaBox
                    type="text"
                    // ref={passwordRef}
                    name="content"
                    placeholder="내용(최대 100글자)"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                <FileInputBtn for="file">
                    <div>사진 추가하기</div>
                    <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />
                </FileInputBtn>

                <SubmitBtn onClick={handlePost}>작성 완료</SubmitBtn>

            </ContentBox>


        </EditBox>
    );
};

export default PostEdit;