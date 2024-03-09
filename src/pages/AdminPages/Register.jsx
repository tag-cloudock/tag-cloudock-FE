// /*
// 용도: 회원가입 페이지
// 담당자: 양태석
// 사용법: App.js에서 라우팅
// 기타: 
// */
// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import axios from "axios";
// import Footer from "../../components/layout/Footer";

// // 회원가입 form 박스
// const SignUpBox = styled.div`
//     margin: 20px auto 0 20px;
//     /* padding: 70px 0px; */
//     width: 90%;
//     /* background : #ffffff; */
//     border-radius: 20px;
//     text-align: center;
// `;

// // 아이디 패스워드 조건 사항
// const Requirements = styled.span`
//     font-size: 15px;
//     font-weight: 400;
//     color : #989fac;
// `;

// // 로그인 하러가기
// const GoToSignIn = styled.span`
//     margin-top: 10px;
//     display: block;
//     text-align: center;
//     color : #aaaaaa;
// `;

// // 입력 박스
// const InputBox = styled.input`
//     display: block;
//     margin: 10px auto;
//     height: 40px;
//     background: #ffffff;
//     border: 1px solid #dddddd;
//     border-radius: 10px;
//     color:#333333;
//     font-size: 18px; 
//     outline: none;
//     padding: 0px 3%;
//     width: 60%;
//     &::placeholder {
//         color: #aaaaaa; 
//         font-size: 18px;
//     }
//     &:focus {
//       border-color: #379DFF;
//     }
// `;

// // 제출 버튼
// const SubmitBtn = styled.button`
//     display: block;
//     margin: 30px auto;
//     height: 40px;
//     background: #efefef;
//     border: none;
//     border-radius: 10px;
//     background: #379DFF;
//     font-weight: bold;
//     color:#ffffff;
//     font-size: 18px; 
//     outline: none;
//     width: 66%;
//     &::placeholder {
//         color: #aaaaaa; 
//         font-size: 18px;
//     }
// `;

// // 제출 버튼
// const FileInputBtn = styled.label`
//     display: block;
//     margin: 0 auto;
//     width: 66%;
//     text-align: left;
//     & div{
//       margin-top: 10px;
//       display: inline-block;
//       font-size: 12px;
//       font-weight: 700;
//       color:#777777;
//       border: 1px solid #379DFF;
//       border-radius: 5px;
//       padding: 5px;
//     }
// `;
// const FileInputBox = styled.input`
//     width: 66%;
//     border: none;
//     background: none;
//     &::file-selector-button{
//       display: none;
//     }
// `;

// const Register = () => {
//   const navigate = useNavigate(); // 페이지 이동

//   // 입력박스 자동 포커스를 위해
//   const nicknameRef = useRef();
//   const useridRef = useRef();
//   const passwordRef = useRef();
//   const password2Ref = useRef();

//   // 각 입력 박스 상태
//   const [nickname, setNickname] = useState("");
//   const [userid, setUserid] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [file, setFile] = useState(null);

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     // 이메일 추가 for 비밀번호 찾기
//     const useridRegex = /^[a-z0-9]{5,15}$/;
//     // const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@!?]{5,15}$/;

//     // 입력을 아에 안했는지 검사
//     if (nickname.length < 1) {
//       window.alert("별명을 입력해주세요.");
//       nicknameRef.current.focus();
//       setNickname('');
//       return;
//     }
//     if (userid.length < 1) {
//       window.alert("아이디를 입력해주세요.");
//       useridRef.current.focus();
//       setUserid('');
//       return;
//     }
//     if (password.length < 1) {
//       window.alert("비밀번호를 입력해주세요.");
//       passwordRef.current.focus();
//       setPassword('');
//       return;
//     }
//     if (password2.length < 1) {
//       window.alert("비밀번호 확인을 입력해주세요.");
//       password2Ref.current.focus();
//       setPassword2('');
//       return;
//     }
//     // 최대 글자를 넘었는지 검사
//     if (nickname.length > 10) {
//       window.alert("별명을 10글자 이내로 입력해주세요.");
//       nicknameRef.current.focus();
//       setNickname('');
//       return;
//     }
//     if (userid.length > 15) {
//       window.alert("아이디를 15글자 이내로 입력해주세요.");
//       useridRef.current.focus();
//       setUserid('');
//       return;
//     }
//     if (password.length > 15) {
//       window.alert("패스워드를 15글자 이내로 입력해주세요.");
//       passwordRef.current.focus();
//       setPassword('');
//       return;
//     }
//     // 유효성 검사
//     if (!useridRegex.test(userid)) {
//       window.alert("올바른 아이디 형식이 아닙니다.");
//       useridRef.current.focus();
//       setUserid('');
//       return;
//     }
//     if (password != password2) {
//       window.alert("비밀번호 확인이 틀립니다.");
//       passwordRef.current.focus();
//       setPassword('');
//       setPassword2('');
//       return;
//     }
//     if (!passwordRegex.test(password)) {
//       window.alert("올바른 비밀번호 형식이 아닙니다.");
//       passwordRef.current.focus();
//       setPassword('');
//       return;
//     }

//     try {
//       // 회원가입 api 요청

//       const formData = new FormData();
//       formData.append('request', new Blob([JSON.stringify({
//         userid,
//         nickname,
//         password
//       })],
//       {
//         type : "application/json"
//       }));
//       formData.append('pic', file); // 'file'은 사용자가 선택한 파일 객체

//       const signUpResponse = await axios.post("http://"+process.env.REACT_APP_BACK_URL+"/register",
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       // 성공시
//       if (signUpResponse.status === 200) {
//         window.alert("회원가입 성공!");
//         navigate("/signin");
//       }
//     } catch (error) {
//       // 중복된 아이디라면
//       if (error.response && error.response.status === 409) {
//         window.alert("중복된 아이디 입니다.");
//       } else {
//         console.error("오류 발생:", error);
//       }
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFile(file);
//   };
//   // 엔터 누르면 제출하도록
//   const activeEnter = (event) => {
//     if (event.code === 'Enter') {
//       handleSignUp(event);
//     }
//   };
//   return (
//     <div>
//       <SignUpBox>

//         {/* 이미지 형식 제한해야함 */}
//         <FileInputBtn for="file">
//           <div>학생회 사진 추가</div>
//         </FileInputBtn>
//         <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />
//         {/* 제출 버튼 */}
//         {/* <SubmitBtn onClick={handleSignUp}>회원가입</SubmitBtn> */}

//       </SignUpBox>
//       <Footer></Footer>
//     </div>
//   );
// };

// export default Register;