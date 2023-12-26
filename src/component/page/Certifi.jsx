/*
용도: 학생증 인증 페이지
담당자: 양태석
사용법: 
기타: 
*/
import Header from "../layout/Header";
import { useState } from "react";
import styled from "styled-components";

const SubmitBtn = styled.button`
    display: block;
    margin: 30px auto;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #379DFF;
    font-weight: bold;
    color:#ffffff;
    font-size: 18px; 
    outline: none;
    width: 66%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
`;

// 제출 버튼
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

const Certifi = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
      };
    return (
        <div>
            <Header headerType={"write"} headerText={"학생증 인증하기"}></Header>
                    {/* 이미지 형식 제한해야함 */}
            <FileInputBtn for="file">
                <div>학생증 이미지 선택</div>
                <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />
            </FileInputBtn>
            <SubmitBtn onClick={" "}>인증 요청하기</SubmitBtn>
        </div>
    );
  };

export default Certifi;