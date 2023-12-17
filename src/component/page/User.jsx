import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Logout = styled.button`
   display: block;
   margin: 0 auto;
   border: 1px solid #559BFF;
   border-radius: 10px;
   background: #ffffff;
   color:#559BFF;
   font-size: 20px;
   line-height: 30px;
   font-weight: 500;
   width: 80%;
   height: 30px;
`;

const User = () => {
    const [cookies] = useCookies(["nickname"]);
    const [userInfo, setUserInfo] = useState({});
    const { userid } = useParams();
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['token','certification','roles','nickname','userId']);

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          if (!cookies.token) {
            navigate("/signin");
            return;
          }
          const response = await axios.get("http://127.0.0.1:8080/account?id="+userid, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          console.log(response.data);
  
          setUserInfo(response.data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            navigate("/signin");
          } else {
            console.error("오류 발생:", error);
          }
        }
      };
      fetchUserInfo();
    }, [cookies.token,navigate,userid]); 

    const handleLogout = async (e) => {
      removeCookie('token',{path:'/'});
      removeCookie('certification',{path:'/'});
      removeCookie('roles',{path:'/'});
      removeCookie('nickname',{path:'/'});
      removeCookie('userId',{path:'/'});
      navigate("/");
    };

    return (
      <div>
        <Header headerType={"user"}></Header>
        {userInfo.nickname}

        <Logout onClick={handleLogout}>로그아웃</Logout>
        <MenuBar></MenuBar>
      </div>
    );
  };

export default User;