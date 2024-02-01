import { Link, useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../components/layout/Header";
import MenuBar from "../../components/layout/MenuBar";

// 로그아웃 버튼
const Logout = styled.button`
  display: block;
  margin: 10px auto 0px auto;
  border: none;
  border-radius: 10px;
  background: none;
  color: #379dff;
  font-size: 20px;
  line-height: 30px;
  font-weight: 400;
  width: 200px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
`;

const ProfilImgBox = styled.div`
  display: inline-block;
`;

const UserInfoContentBox = styled.div`
  width: calc(100% - 100px);
  float: right;
`;
const Nickname = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
  color: #333333;
`;
const CountBox = styled.div`
  display: flex;
  padding: 3px;
  margin-top: 5px;
  margin-left: -7px;
`;
const CountInfoBox = styled.span`
  text-align: center;
  font-weight: 400;
  font-size: 17px;
  color: #379dff;
  display: inline-block;
  margin: 5px;
  padding: 10px;
  background: #eef6ff;
  border-radius: 10px;
  width: 100%;
  @media screen and (max-width: 700px) {
    font-weight: 800;
    font-size: 15px;
  }
`;
const ProfilImg = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 100px;
  border: 1px solid #e9e9e9;
  position: relative;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const UserBox = styled.div`
  padding: 10px;
`;

const UserInfoBox = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
`;

const Certifi = styled.div`
  display: block;
  margin: 10px auto;
  background: none;
  color: #a9a9a9;
  text-align: center;
  font-size: 15px;
  font-weight: 400;

  & span:hover {
    font-size: 16px;
  }
  & span {
    color: #9d9d9d;
    border-bottom: 1px solid #9d9d9d;
    text-align: center;
  }
  & span span {
    color: #379dff;
    text-align: center;
  }
`;
//후기 박스
const PostBox = styled.div`
  padding: 10px;
`;
//
const PostInfoBox = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
`;
//박스 제목
const BoxTitle = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  text-align: left;
  line-height: 50px;
  font-weight: 700;
  font-size: 22px;
  color: #000000;
  @media screen and (max-width: 700px) {
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 18px;
  }
  & a {
    float: right;
  }
`;
// 아이콘 이미지 조정
const ImageIcon = styled.img`
  width: 30px;
  vertical-align: middle;
  margin-left: 5px;
  margin-bottom: 5px;
  @media screen and (max-width: 700px) {
    width: 24px;
  }
`;
const Option = styled.span`
  float: right;
`;
//옵션
const OptionBox = styled.span`
  display: block;
  margin-top: 5px;
  margin-right: 18px;
 cursor: pointer;
  /* margin: 0px 3px; */
  /* padding: 1px 8px; */
  background: #ffffff;
  /* border: 1px solid #379dff; */
  border-radius: 30px;
  font-weight: 400;
  font-size: 14px;
  color: #d8d8d8;
  /* background: #379dff; */
  &:hover {
  }
  @media screen and (max-width: 700px) {
    font-weight: 700;
    font-size: 13px;
  }
`;

const User = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies, , removeCookie] = useCookies(); // 쿠키 가져오기, 쿠기 삭제를 위한 함수
  const [userInfo, setUserInfo] = useState({imgPath:"default.png"}); // 유저 정보 상태

  const [img, setImg] = useState({}); // 유저 정보 상태
  const [isVertical, setIsVertical] = useState(true); // 유저 정보 상태
  const { id } = useParams(); // 파라미터 값 가져오기

  useEffect(() => {
    // 유저 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        // 회원 조회 api 요청
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/account?id=" + id,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        console.log(response.data);
        // 유저 상태 등록
        setUserInfo(response.data);
      } catch (error) {
        // 없는 유저라면 쿠키 지우고 로그인 페이지로 이동
        if (error.response && error.response.status === 404) {
          removeCookies();
          navigate("/signin");
        } else {
          console.error("오류 발생:", error);
        }
      }
    };
    fetchUserInfo();
  }, [cookies.token, navigate, id]);

  // 쿠키 지우기
  const removeCookies = async (e) => {
    removeCookie("token", { path: "/" });
    removeCookie("certification", { path: "/" });
    removeCookie("roles", { path: "/" });
    removeCookie("nickname", { path: "/" });
    removeCookie("userId", { path: "/" });
    navigate("/");
  };

  return (
    <div>
      <Header></Header>
      <UserBox>
        <UserInfoBox>
          <ProfilImgBox>
            <ProfilImg >
              <img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + userInfo.imgPath}></img>
            </ProfilImg>
          </ProfilImgBox>
          <UserInfoContentBox>
            <Nickname>{userInfo.nickname}</Nickname>
            <Option>
              <OptionBox>정보수정
              </OptionBox>
            </Option>
            <CountBox>
              <CountInfoBox>
                빌린 횟수 <br></br>2
              </CountInfoBox>
              <CountInfoBox>
                빌려준 횟수
                <br></br>2
              </CountInfoBox>
            </CountBox>
          </UserInfoContentBox>
        </UserInfoBox>
      </UserBox>
      <PostBox>
        <BoxTitle>
          빌려준 후기
          <ImageIcon src={"/image/text.svg"} alt="" />
          <Link to={"/"}>
            <ImageIcon src={"/image/moreinfo.svg"} alt="" />
          </Link>
        </BoxTitle>
        <PostInfoBox></PostInfoBox>
      </PostBox>
      <PostBox>
        <BoxTitle>
          빌린 후기
          <ImageIcon src={"/image/heart.svg"} alt="" />
          <Link to={"/"}>
            <ImageIcon src={"/image/moreinfo.svg"} alt="" />
          </Link>
        </BoxTitle>
        <PostInfoBox></PostInfoBox>
      </PostBox>
      <PostBox>
        <BoxTitle>
          {userInfo.nickname}님이 작성한 글이에요
          <Link to={"/"}>
            <ImageIcon src={"/image/moreinfo.svg"} alt="" />
          </Link>
        </BoxTitle>
        <PostInfoBox></PostInfoBox>
      </PostBox>
      {cookies.certification == false ? (
                <Link to={"/certification"}>
                   <Logout>학생증 인증하기</Logout>
                </Link>
              ) : null}
     <Logout onClick={removeCookies}>로그아웃</Logout>
    </div>
  );
};

export default User;
