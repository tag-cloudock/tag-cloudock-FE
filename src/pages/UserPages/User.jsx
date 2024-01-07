import { Link, useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../components/layout/Header";
import MenuBar from "../../components/layout/MenuBar";

const Logout = styled.button`
   display: block;
   margin: 30px auto 0px auto;
   border: none;
   border-radius: 10px;
   background: none;
   color:#379DFF;
   font-size: 20px;
   line-height: 30px;
   font-weight: 400;
   width: 200px;
   height: 40px;
   &:hover{
    background: #f7f7f7;
   }
`;

const ProfilImgBox = styled.div`
   display: inline-block;
   width: 80px;
`;

const UserInfoTextBox = styled.div`
  height: 100px;
  width: calc(100% - 100px);
  float: right;
`;
const Nickname = styled.div`
  font-size: 20px;
  font-weight: 800;
  color:#333333;
`;
const CountInfoBox = styled.div`
  background: #EEF6FF;
  border-radius: 10px;
  width: 100%;
  height: 60px;
  margin-top: 10px;
`;
const ProfilImg = styled.div`
   width: 80px;
   height: 80px;
   overflow: hidden;
   border-radius: 100px;
   border: 2px solid #379DFF;
   position: relative;
   & img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ isVertical }) => (isVertical ? 'width: 80px' : 'height: 80px')};
   }
`;

const ContentBox = styled.div`
  padding: 10px;
`;

const UserInfoBox = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
`;

const Certification = styled.div`
   display: block;
   margin: 10px auto;
   background: none;
   color:#a9a9a9;
   text-align: center;
   font-size: 15px;
   font-weight: 400;

   & span:hover{
    font-size: 16px;
   }
   & span{
    color: #9d9d9d;
    border-bottom: 1px solid #9d9d9d;
    text-align: center;
   }
   & span span{
    color: #379DFF;
    text-align: center;
   }
`;

const User = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies();
  const [userInfo, setUserInfo] = useState({}); 
  const [img, setImg] = useState({});
  const [isVertical, setIsVertical] = useState(true);
  const { userid } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/account?id=" + userid, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        var img = new Image();
        img.src = "http://" + process.env.REACT_APP_BACK_URL + "/image/" + response.data.imgPath;
        img.onload = function () {
          var width = img.width;
          var height = img.height;
          setImg(img);
          setIsVertical(width <= height);
          console.log("가로 길이:", width);
          console.log("세로 길이:", height);
        };
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          removeCookies();
          navigate("/signin");
        } else {
          console.error("오류 발생:", error);
        }
      }
    };
    fetchUserInfo();
  }, [cookies.token, navigate, userid]);

  const removeCookies = async (e) => {
    removeCookie('token', { path: '/' });
    removeCookie('certification', { path: '/' });
    removeCookie('roles', { path: '/' });
    removeCookie('nickname', { path: '/' });
    removeCookie('userId', { path: '/' });
    navigate("/");
  };

  return (
    <div>
      <Header headerType={"user"}></Header>
      <ContentBox>
        <UserInfoBox>
          <ProfilImgBox>
            <ProfilImg isVertical={isVertical}>
              <img src={img.src}></img>
            </ProfilImg>
          </ProfilImgBox>
          <UserInfoTextBox>
            <Nickname>{userInfo.nickname}</Nickname>
            <CountInfoBox>
            </CountInfoBox>
          </UserInfoTextBox>
        </UserInfoBox>

        <Logout onClick={removeCookies}>로그아웃</Logout>
        {cookies.certification == false ?
          <Link to={"/certification"}>
            <Certification>
                <span>물건을 대여하고 싶나요? <span>학생증 인증하기</span></span>
            </Certification>
          </Link>
        : null}
      </ContentBox>
      <MenuBar/>
    </div>
  );
};

export default User;