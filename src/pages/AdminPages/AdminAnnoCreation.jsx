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

const InputBox = styled.input`
    display: block;
    border: none;
    padding: 15px 3%;
    margin-top: 10px;
    width: 94%;
    color:#333333;
    font-size: 18px; 
    color: #333333;
    border-radius: 10px;
    border: 1px solid #dddddd;
    outline: none;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
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

const TextareaBox = styled.textarea`
    width: 94%;
    height: 300px;
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
const AdminAnnoCreation = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate(); // 페이지 이동 위해

    const handleAddAnno = async (e) => {
        e.preventDefault();

        // 입력을 아에 안했는지 검사
        if (title.length < 1) {
            window.alert("제목을 입력해주세요.");
            setTitle('');
            return;
        }
        if (content.length < 1) {
            window.alert("내용을 입력해주세요.");
            setContent('');
            return;
        }
        const createdAt = new Date();

        try {
            // 회원가입 api 요청
            const signUpResponse = await axios.post("http://" + process.env.REACT_APP_BACK_URL + "/anno",
                {
                    title,
                    content,
                    createdAt
                }
            );
            // 성공시
            if (signUpResponse.status === 200) {
                window.alert("작성 완료");
                navigate("/admin/anno-manage");
            }
        } catch (error) {
            console.error("오류 발생:", error);

        }
    };
    return (
        <AdminBox>
            <Header headerType={"noChatIcon"} headerText={"공지사항 작성"}></Header>
            <ContentBox>
                <InputBox type="text" name="title" placeholder="제목"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <TextareaBox
                    type="text"
                    // ref={passwordRef}
                    name="content"
                    placeholder="내용"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                {/* 제출 버튼 */}
                <SummitBtn onClick={handleAddAnno}>작성</SummitBtn>
            </ContentBox>
        </AdminBox>
    );
};

export default AdminAnnoCreation;