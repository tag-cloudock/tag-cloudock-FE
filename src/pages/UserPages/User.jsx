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
  font-size: 17px;
  line-height: 30px;
  font-weight: 400;
  width: 200px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
  }
`;

const ProfilImg = styled.div`
  width: 130px;
  height: 130px;
  @media screen and (max-width: 700px) {
    width: 100px;
    height: 100px;
  }
  border-radius: 100px;
  border: none;
  position: relative;
  & img {
    border-radius: 100px;
    border: 1px solid #e9e9e9;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ProfilImgBox = styled.div`
  display: inline-block;
`;

const UserInfoContentBox = styled.div`
  width: calc(100% - 150px);
  @media screen and (max-width: 700px) {
    width: calc(100% - 110px);
  }
  float: right;
`;
const Nickname = styled.div`
  display: inline-block;
  font-size: 22px;
  margin-top: 15px;
  @media screen and (max-width: 700px) {
    margin-top: 3px;
  }
  font-weight: 700;
  color: #333333;
`;
const CountBox = styled.div`
  display: flex;
  padding: 3px;
  margin-top: 5px;
  margin-left: -10px;
`;
const CountInfoBox = styled.span`
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  color: #379dff;
  display: inline-block;
  margin: 5px 0px 5px 8px;
  padding: 15px;
  background: #eef6ff;
  border-radius: 10px;
  width: 100%;
  @media screen and (max-width: 700px) {
    font-size: 15px;
    padding: 10px;
  }
`;

const UserBox = styled.div`
  padding: 30px 20px;
`;

const UserInfoBox = styled.div`
  border-radius: 15px;
  /* box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px; */
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
  padding: 10px 20px;
`;
//
const PostInfoBox = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
  & a:last-child div{
    border-bottom: none;
  }
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
  cursor: pointer;

  background: #ffffff;
  border-radius: 30px;
  font-weight: 400;
  font-size: 14px;
  color: #d8d8d8;
  &:hover {
  }
  @media screen and (max-width: 700px) {
    font-weight: 700;
    font-size: 13px;
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
  padding: 10px 40px;
  border-left: 1.5px solid #ededed;
  width: 160px;
`;
const RateInfoBox3 = styled.span`
  line-height: 2.5;
  text-align: center;
  font-weight: 800;
  font-size: 18px;
  display: inline-block;
  background: #ffffff;
  padding: 10px 40px;
  /* border-radius: 0px 10px 10px 0px; */
  border-left: 1.5px solid #ededed;
  width: 160px;
`;

const ImageIcon2 = styled.img`
  width: 30px;
  vertical-align: middle;
`;

const ImageIcon3 = styled.img`
margin-top: 5px;
  width: 25px;
  /* vertical-align: middle; */
`;

const RateBox = styled.div`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
  @media screen and (max-width: 700px) {
  }
`;

const RecentRateBox = styled.div`
  /* padding: 10px; */
  align-items: center;
  &:last-child{
    border-bottom: none;
  }
  border-bottom: 1px solid #eaeaea;

  display: flex;
  justify-content: space-between;

  padding: 7px 0px;
`;
const RateDateBox = styled.div`
  color: #c3c3c3;
  white-space: nowrap; 
`;

const ReviewText = styled.div`
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  text-align: left;

  width: 100%;
  margin-left: 5px;
`;

const LendCheckBox = styled.div`
  display: inline-block;
  border-radius: 30px;
  font-weight:600;
  font-size: 12px;
  color: white;
  padding: 6px;
  white-space: nowrap; 
  background: #379dff;
`;

const BorrowCheckBox = styled.div`
  display: inline-block;
  border-radius: 30px;
  font-weight:600;
  font-size: 12px;
  color: white;
  padding: 6px 13px;
  background: #76bcff;
  white-space: nowrap; 
`;

const UserPostItemBox = styled.div`
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #eaeaea;
  
`;

const PostTitle = styled.div`
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;  
  text-align: left;
`;


const PostDate = styled.div`
  margin-left: 20px;
  white-space: nowrap; 
  color: #c3c3c3;
`;

const NoData = styled.div`
  margin: 20px 0px;
  text-align: center;
  font-size: 15px;
  /* margin-left: 20px; */
  color: #e4e4e4;
  font-weight: 600;
`;

const User = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies, , removeCookie] = useCookies(); // 쿠키 가져오기, 쿠기 삭제를 위한 함수
  const [userInfo, setUserInfo] = useState({imgPath:"default.png"}); // 유저 정보 상태
  const [reviewData, setReviewData] = useState({reviews:[]});
  const [userPosts, setUserPosts] = useState([]);

  const [img, setImg] = useState({}); // 유저 정보 상태
  const [isVertical, setIsVertical] = useState(true); // 유저 정보 상태
  const { userid } = useParams(); // 파라미터 값 가져오기

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
          "http://" + process.env.REACT_APP_BACK_URL + "/account?id=" + userid,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setUserInfo(response.data);
        console.log(response.data);
        // 유저 상태 등록
      } catch (error) {
        // 없는 유저라면 쿠키 지우고 로그인 페이지로 이동
        if (error.response && error.response.status === 404) {
          removeCookies();
          navigate("/signin");
        } else{
          console.error("오류 발생:", error);
        }
      }
    };
    const fetchReview = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/review/"+userid,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setReviewData(response.data);
        console.log(response.data);
        // 유저 상태 등록
      } catch (error) {
        // 없는 유저라면 쿠키 지우고 로그인 페이지로 이동
        if (error.response && error.response.status === 404) {
          removeCookies();
          navigate("/signin");
        } 
        console.error("오류 발생:", error);
      }
    };
    const fetchUserPosts = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/post/user/"+userid,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setUserPosts(response.data);
        console.log(response.data);
        // 유저 상태 등록
      } catch (error) {
        // 없는 유저라면 쿠키 지우고 로그인 페이지로 이동
        if (error.response && error.response.status === 404) {
          removeCookies();
          navigate("/signin");
        } 
        console.error("오류 발생:", error);
      }
    };
    fetchUserPosts();
    fetchUserInfo();
    fetchReview();
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
            <ProfilImg >
              <img src={"http://" + process.env.REACT_APP_BACK_URL + "/image/" + userInfo.imgPath}></img>
            </ProfilImg>
          </ProfilImgBox>
          <UserInfoContentBox>
            <Nickname>{userInfo.nickname}</Nickname>
            <Option>
                <OptionBox>
                  <ImageIcon3 src={"/image/settingbutton.svg"} alt="" />
                </OptionBox>
              </Option>
            <CountBox>
              <CountInfoBox>
                빌린 횟수 <br></br>{userInfo.borrowCount}
              </CountInfoBox>
              <CountInfoBox>
                빌려준 횟수
                <br></br>{userInfo.lendCount}
              </CountInfoBox>
            </CountBox>
          </UserInfoContentBox>
        </UserInfoBox>
      </UserBox>
      <PostBox>
        <RateBox>
            <RateInfoBox1>
              <ImageIcon2 src={"/image/smilingface.svg"} alt="" />
              <br></br>{reviewData.loveCount}
            </RateInfoBox1>
            <RateInfoBox2>
              <ImageIcon2 src={"/image/face.svg"} alt="" />
              <br></br>{reviewData.goodCount}
            </RateInfoBox2>
            <RateInfoBox3>
              <ImageIcon2 src={"/image/upsetface.svg"} alt="" />
              <br></br>{reviewData.badCount}
            </RateInfoBox3>
          </RateBox>
      </PostBox>
      <PostBox>
        <BoxTitle>
        최근 후기
        </BoxTitle>
        <PostInfoBox>
        {reviewData.reviews.length != 0 ? reviewData.reviews.map((review, index) => (
            <RecentRateBox key={index}>
              {review.writerType == "BORROWER" ?
              <BorrowCheckBox>빌렸어요</BorrowCheckBox>
               : 
               <LendCheckBox>빌려줬어요</LendCheckBox>}
            <ReviewText>{review.text}</ReviewText>
            <RateDateBox>{review.createdAt[1]}/{review.createdAt[2]}</RateDateBox>
          </RecentRateBox>
        )): 
          <NoData>아직 후기가 없습니다</NoData>
        }
        </PostInfoBox>
      </PostBox>
      <PostBox>
        <BoxTitle>
          {userInfo.nickname}님이 작성한 글이에요
        </BoxTitle>
        <PostInfoBox>
        {userPosts.length != 0 ?userPosts.map((post, index) => (
          <Link to={"/posts/"+post.postId}>
            <UserPostItemBox key={index}>
             <PostTitle>{post.title}</PostTitle>
             <PostDate>{post.createdAt[1]}/{post.createdAt[2]}</PostDate>
            </UserPostItemBox>
          </Link>
        )) : 
        <NoData>아직 작성한 글이 없습니다</NoData>}
        </PostInfoBox>
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