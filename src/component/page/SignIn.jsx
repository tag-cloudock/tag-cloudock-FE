import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";


const SignIn = () => {
  const navigate = useNavigate();

  const useridRef = useRef();
  const passwordRef = useRef();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (userid.length < 1) {
      window.alert("ID를 입력해주세요.");
      useridRef.current.focus();
      return;
    }
    if (password.length < 1) {
      window.alert("패스워드를 입력해주세요.");
      passwordRef.current.focus();
      return;
    }

    const loginResponse = await axios.post("http://127.0.0.1:8080/login",
      { 
        userid, 
        password 
      }
    );

    if (loginResponse.status === 200) {
      const expires = moment().add(1, "hours").toDate();
      setCookie("token", loginResponse.data.token, {
        path: "/",
        expires: expires,
      });
      setCookie("userId", loginResponse.data.userId, {
        path: "/",
        expires: expires,
      });
      setCookie("roles", loginResponse.data.roles, {
        path: "/",
        expires: expires,
      });
      setCookie("certification", loginResponse.data.certification, {
        path: "/",
        expires: expires,
      });
      navigate("/");
    } else if (loginResponse.status == 404) {
      window.alert("ID를 다시 확인해주세요.");
      return;
    } else if (loginResponse.status == 401) {
      window.alert("비밀번호가 올바르지 않습니다.");
    }
  };
  const activeEnter = (event) => {
    if (event.code == 'Enter') {
      handleLogin(event);
    }
  };
  return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          ref={useridRef}
          name="ID"
          placeholder="ID"
          onChange={(e) => {
            setUserid(e.target.value);
          }}
          onKeyDown={(e) => {activeEnter(e)}}
        />
        <input
          type="password"
          ref={passwordRef}
          name="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {activeEnter(e)}}/>
          <button onClick={handleLogin}>Login</button>
      </div>
  );
};

export default SignIn;