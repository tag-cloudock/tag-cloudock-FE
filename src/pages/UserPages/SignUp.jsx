import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Footer from "../../components/layout/Footer";

const SignUpBox = styled.div`
    margin: 20px auto 0 20px;
    padding: 70px 0px;
    width: 90%;
    border-radius: 20px;
    text-align: center;
`;

const Title = styled.div`
    text-align: center;
    height: 45px;
    line-height: 45px;
    margin-bottom: 120px;
    font-size: 60px;
    font-weight: 850;
    color : #6093FF;
`;

const SubTitle = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color : #adb5c2;
`;

const Requirements = styled.span`
    font-size: 15px;
    font-weight: 400;
    color : #989fac;
`;

const GoToSignIn = styled.span`
    margin-top: 10px;
    display: block;
    text-align: center;
    color : #aaaaaa;
`;

const InputBox = styled.input`
    display: block;
    margin: 10px auto;
    height: 40px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    color:#333333;
    font-size: 18px; 
    outline: none;
    padding: 0px 3%;
    width: 60%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    &:focus {
      border-color: #6093FF;
    }
`;

const SubmitBtn = styled.button`
    display: block;
    margin: 30px auto;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #6093FF;
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
      border: 1px solid #6093FF;
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

const SignUp = () => {
  const navigate = useNavigate();
  const nicknameRef = useRef();
  const useridRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const [nickname, setNickname] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [file, setFile] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 이메일 추가 for 비밀번호 찾기
    const useridRegex = /^[a-z0-9]{5,15}$/;
    // const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@!?]{5,15}$/;

    // 입력을 아에 안했는지 검사
    if (nickname.length < 1) {
      window.alert("별명을 입력해주세요.");
      nicknameRef.current.focus();
      setNickname('');
      return;
    }
    if (userid.length < 1) {
      window.alert("아이디를 입력해주세요.");
      useridRef.current.focus();
      setUserid('');
      return;
    }
    if (password.length < 1) {
      window.alert("비밀번호를 입력해주세요.");
      passwordRef.current.focus();
      setPassword('');
      return;
    }
    if (password2.length < 1) {
      window.alert("비밀번호 확인을 입력해주세요.");
      password2Ref.current.focus();
      setPassword2('');
      return;
    }
    // 최대 글자를 넘었는지 검사
    if (nickname.length > 10) {
      window.alert("별명을 10글자 이내로 입력해주세요.");
      nicknameRef.current.focus();
      setNickname('');
      return;
    }
    if (userid.length > 15) {
      window.alert("아이디를 15글자 이내로 입력해주세요.");
      useridRef.current.focus();
      setUserid('');
      return;
    }
    if (password.length > 15) {
      window.alert("패스워드를 15글자 이내로 입력해주세요.");
      passwordRef.current.focus();
      setPassword('');
      return;
    }
    // 유효성 검사
    if (!useridRegex.test(userid)) {
      window.alert("올바른 아이디 형식이 아닙니다.");
      useridRef.current.focus();
      setUserid('');
      return;
    }
    if (password != password2) {
      window.alert("비밀번호 확인이 틀립니다.");
      passwordRef.current.focus();
      setPassword('');
      setPassword2('');
      return;
    }
    if (!passwordRegex.test(password)) {
      window.alert("올바른 비밀번호 형식이 아닙니다.");
      passwordRef.current.focus();
      setPassword('');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('request', new Blob([JSON.stringify({
        userid,
        nickname,
        password
      })],
      {
        type : "application/json"
      }));
      formData.append('pic', file);

      const signUpResponse = await axios.post("http://"+process.env.REACT_APP_BACK_URL+"/register",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (signUpResponse.status === 200) {
        window.alert("회원가입 성공!");
        navigate("/signin");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        window.alert("중복된 아이디 입니다.");
      } else {
        console.error("오류 발생:", error);
      }
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const activeEnter = (event) => {
    if (event.code === 'Enter') {
      handleSignUp(event);
    }
  };
  return (
    <div>
      <SignUpBox>
        <Title>
          <SubTitle>
            당장 필요할때 바로 빌리자
          </SubTitle>
          대학빌림
        </Title>

        {/* 별명 */}
        <InputBox
          type="text"
          ref={nicknameRef}
          name="nickname"
          value={nickname}
          placeholder="별명"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }} />
        <Requirements>최대 10글자</Requirements>

        {/* 이메일(제작중) */}
        {/* <InputBox
          type="email"
          // ref={nicknameRef}
          name="email"
          // value={nickname}
          placeholder="이메일"
          // onChange={(e) => {
          //   setNickname(e.target.value);
          // }}
          onKeyDown={(e) => {activeEnter(e)}}/> */}

        {/* 아이디 */}
        <InputBox
          type="text"
          ref={useridRef}
          name="id"
          value={userid}
          placeholder="아이디"
          onChange={(e) => {
            setUserid(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }}
        />
        <Requirements>영문 소문자, 숫자 조합 5~15자리</Requirements>

        {/* 비밀번호 */}
        <InputBox
          type="password"
          ref={passwordRef}
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }} />

        {/* 비밀번호 확인*/}
        <InputBox
          type="password"
          ref={password2Ref}
          name="password2"
          value={password2}
          placeholder="비밀번호 확인"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          onKeyDown={(e) => { activeEnter(e) }} />
        <Requirements>대소문자, 숫자, @!? 조합 5~15자리</Requirements>

        {/* 이미지 형식 제한해야함 */}
        <FileInputBtn for="file">
          <div>프로필 사진 추가</div>
        </FileInputBtn>
        <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />

        <SubmitBtn onClick={handleSignUp}>회원가입</SubmitBtn>
        <Link to={"/signin"}>
          <GoToSignIn>로그인 하러가기</GoToSignIn>
        </Link>

      </SignUpBox>
      <Footer></Footer>
    </div>
  );
};

export default SignUp;