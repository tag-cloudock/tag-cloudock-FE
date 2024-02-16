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
  max-width: 170px;
  max-height: 170px;
  min-width: 90px;
  min-height: 90px;
  width: 24vw;
  height: 24vw;
`;
const ProfilImg = styled.div`
  max-width: 170px;
  max-height: 170px;
  min-width: 90px;
  min-height: 90px;
  width: 24vw;
  height: 24vw;
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
const ProveBox = styled.span`
  display: inline-block;
  border-radius: 30px;
  font-weight: 1000;
  color: white;
  margin: 5px 15px 0px 15px;
  padding: min(2vw, 8px);
  background: #379dff;
  width: 12vw;
  max-width: 70px;
  min-width: 50px;
  text-align: center;
  font-size: min(3vw, 17px);
`;

const BorrowCheckBox = styled.div`
  display: inline-block;
  border-radius: 30px;
  font-weight: 800;
  font-size: 13px;
  color: white;
  padding: 7px 13px 7px 13px;
  margin-right: 10px;

  background: #76bcff;
`;
const LendCheckBox = styled.div`
  display: inline-block;
  border-radius: 30px;
  font-weight: 800;
  font-size: 13px;
  color: white;
  padding: 7px;
  margin-right: 10px;
  background: #379dff;
`;
const UserInfoContentBox = styled.span`
  width: 60vw;
  max-width: 460px;
  min-width: 230px;
  float: right;

`;
const Nickname = styled.span`
  display: inline-block;
  font-weight: 800;
  color: #333333;
  margin-left: 5px;
  font-size: min(7vw, 48px);
`;
const RateBox = styled.div`
  display: flex;
  @media screen and (max-width: 700px) {
  }
`;
const RateInfoBox1 = styled.span`
  line-height: 2.5;
  text-align: center;
  font-weight: 800;
  font-size: 18px;
  display: inline-block;
  background: #ffffff;
  padding: 10px 40px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px 0px;
  border-radius: 10px 0px 0px 10px;
  width: 160px;
`;
const RateInfoBox2 = styled.span`
  line-height: 2.5;
  text-align: center;
  font-weight: 800;
  font-size: 18px;
  display: inline-block;
  background: #ffffff;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
  padding: 10px 40px;
  border-left: thin solid #d5d5d5;
  width: 160px;
`;
const RateInfoBox3 = styled.span`
  line-height: 2.5;
  text-align: center;
  font-weight: 800;
  font-size: 18px;
  display: inline-block;
  background: #ffffff;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
  padding: 10px 40px;
  border-radius: 0px 10px 10px 0px;
  border-left: thin solid #d5d5d5;
  width: 160px;
`;
const CountBox = styled.div`
  display: flex;
  margin-top: 10px;
  @media screen and (max-width: 700px) {
    margin-top: 0vw;
  }
`;
const CountInfoBox1 = styled.span`
  line-height: 1.5;
  text-align: center;
  font-weight: 400;
  font-size: min(3.5vw, 20px);
  color: #d5d5d5;
  display: inline-block;
  margin-top: 14px;
  padding: min(2vw, 14px) min(2vw, 22px);
  background: #f6f6f6;
  border-radius: 10px 0px 0px 10px;
  width: 19vw;
  max-width: 137px;
  min-width: 105px;
  
`;
const CountInfoBox2 = styled.span`
  line-height: 1.5;
  text-align: center;
  font-weight: 400;
  font-size: min(3.5vw, 20px);
  color: #d5d5d5;
  display: inline-block;
  margin-top: 14px;
  padding: min(2vw, 14px) min(2vw, 22px);
  background: #f6f6f6;
  border-radius: 0px 10px 10px 0px;
  width: 19vw;
  max-width: 137px;
  min-width: 105px;
  border-left: thin solid #d5d5d5;
`;

const UserBox = styled.div`
  padding: 50px 10px 20px;
`;

const UserInfoBox = styled.div`
  padding: 10px;
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
const ImageIcon2 = styled.img`
  width: 6vw;
  min-width: 30px;
  max-width: 44px;
  vertical-align: middle;
`;
const Option = styled.div`
  float: right;
`;
const RecentRateBox = styled.div`
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-bottom: thin solid #d5d5d5;
`;
const RateDateBox = styled.div`
  float: right;
  padding: 7px;
`;
const Location = styled.span`
  font-weight: 800;
  padding: 0px 17px 0px 7px;
`;
//옵션
const OptionBox = styled.div`
  display: block;
  margin-top: min(2vw, 14px);
  margin-right: -10px;
  border-radius: 30px;
  font-weight: 400;
  font-size: 14px;
  color: #d8d8d8;
  &:hover {
  }
`;

const User = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies, , removeCookie] = useCookies(); // 쿠키 가져오기, 쿠기 삭제를 위한 함수
  const [userInfo, setUserInfo] = useState({ imgPath: "default.png" }); // 유저 정보 상태

  const [img, setImg] = useState({}); // 유저 정보 상태
  const [isVertical, setIsVertical] = useState(true); // 유저 정보 상태
  // const { id } = useParams(); // 파라미터 값 가져오기

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
          "http://" +
            process.env.REACT_APP_BACK_URL +
            "/account?id=" +
            cookies.id,
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
  }, [cookies.token, navigate]);

  // 쿠키 지우기
  const removeCookies = async (e) => {
    removeCookie("token", { path: "/" });
    removeCookie("certification", { path: "/" });
    removeCookie("roles", { path: "/" });
    removeCookie("nickname", { path: "/" });
    removeCookie("userId", { path: "/" });
    removeCookie("id", { path: "/" });
    navigate("/");
  };

  return (
    <div>
      <Header></Header>
      <UserBox>
        <UserInfoBox>
          <ProfilImgBox>
            <ProfilImg>
              <img
                src={
                  "http://" +
                  process.env.REACT_APP_BACK_URL +
                  "/image/" +
                  userInfo.imgPath
                }
              ></img>
            </ProfilImg>
          </ProfilImgBox>
          <UserInfoContentBox>
            <Link to={"/"}>
              <Option>
                <OptionBox>
                  <ImageIcon2 src={"/image/settingbutton.svg"} alt="" />
                </OptionBox>
              </Option>
            </Link>
            <Nickname>{userInfo.nickname}</Nickname>

            <Link to={"/"}>
              <ProveBox>인증하기</ProveBox>
            </Link>

            <CountBox>
              <CountInfoBox1>
                빌린 횟수 <br></br>
                {userInfo.borrowCount}
              </CountInfoBox1>
              <CountInfoBox2>
                빌려준 횟수
                <br></br>
                {userInfo.lendCount}
              </CountInfoBox2>
            </CountBox>
          </UserInfoContentBox>
        </UserInfoBox>
      </UserBox>
      <PostBox>
        <RateBox>
          <RateInfoBox1>
            <ImageIcon2 src={"/image/smilingface.svg"} alt="" />
            <br></br>7
          </RateInfoBox1>
          <RateInfoBox2>
            <ImageIcon2 src={"/image/face.svg"} alt="" />
            <br></br>7
          </RateInfoBox2>
          <RateInfoBox3>
            <ImageIcon2 src={"/image/upsetface.svg"} alt="" />
            <br></br>7
          </RateInfoBox3>
        </RateBox>
      </PostBox>
      <PostBox>
        <BoxTitle>
          최근 후기
          <ImageIcon src={"/image/text.svg"} alt="" />
          <Link to={"/"}>
            <ImageIcon src={"/image/moreinfo.svg"} alt="" />
          </Link>
        </BoxTitle>
        <PostInfoBox>
          <RecentRateBox>
            <LendCheckBox>빌려줬어요</LendCheckBox>깨끗하게 쓰고 돌려주심
            <RateDateBox>1일전</RateDateBox>
          </RecentRateBox>
          <RecentRateBox>
            <BorrowCheckBox>빌렸어요</BorrowCheckBox>빨리 빌려주심
            <RateDateBox>1일전</RateDateBox>
          </RecentRateBox>
        </PostInfoBox>
      </PostBox>
      <PostBox>
        <BoxTitle>
          {userInfo.nickname}님이 작성한 글이에요
          <Link to={"/"}>
            <ImageIcon src={"/image/moreinfo.svg"} alt="" />
          </Link>
        </BoxTitle>
        <PostInfoBox>
          <RecentRateBox>
            <Location>AI 공학관</Location>보조 배터리 빌려요
            <RateDateBox>1일전</RateDateBox>
          </RecentRateBox>
        </PostInfoBox>
      </PostBox>

      <Logout onClick={removeCookies}>로그아웃</Logout>
    </div>
  );
};

export default User;
