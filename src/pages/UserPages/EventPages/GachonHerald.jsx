import Header from "../../../components/layout/Header";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const ContentBox = styled.div`
  padding: 20px;
`;
const BoardBox = styled.div`
  padding: 5px 0px;
  & a{
    color: #000000;
  }
`;

const ArticleBox = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 15px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const Section = styled.div`
  padding: 10px 10px;
  font-size: 12px;
  font-weight: 700;
  color : #808EBF;
`;

const Title = styled.div`
  padding: 5px 10px;
  font-family: "Crimson Text";
  font-size: 20px;
  font-weight: 700;
`;

const Image = styled.div`
  width: 100%;
  height: 200px;
  background-color: #eeeeee;
`;

const PageHeader = styled.div`
  padding: 30px 0px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 900;
  font-family: "Crimson Text";
  /* background-color: #eeeeee; */
  border: 1px solid #eeeeee;
  color:#3B4D8C;
  & div{
    font-size: 16px;
    color:#9d9d9d;
    font-weight: 500;
    font-family: "Crimson Text";
  }
`;

const Event = styled.div`
  padding: 20px 20px;
  background: #eeeeee;
`;

const EventTitle = styled.div`
 text-align: center;
 font-size: 30px;
 font-weight: 700;
`;
const EventDesc = styled.div`
padding: 15px 0px;
text-align: left;
font-size: 15px;
 
`;
const OpinionInput = styled.textarea`
box-sizing: border-box;
padding: 10px;
font-size: 15px;
width: 100%;
resize: none;
border: none;
height: 100px;
border-radius: 15px;
&::placeholder {
      color: #b1b1b1; 
        font-weight:5600;
        font-size: 15px;
    }
   outline: none;
`;

const Summit = styled.button`
width: 100%;
background:#3B4D8C;
border-radius: 15px;
text-align: center;
padding: 10px 0px;
font-size: 20px;
color: #ffffff;
font-weight: 700;
margin-top: 10px;
border: none;
 
`;

const Alert = styled.div`
  font-size: 13px;
  text-align: center;
  color: #c2c2c2;
  margin-top: 5px;
`;

const ModalContainer = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000077;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 220px;
  max-width: 400px;
  border-radius: 30px;
  background: #ffffff;
  position: relative;
`;
const ModalBox2 = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 250px;
  max-width: 400px;
  border-radius: 30px;
  background: #ffffff;
  position: relative;
`;

const ModalBtnBox = styled.div`
  position: absolute;
  width: 100%;
  bottom: 22px;
  display: flex;
  justify-content: space-evenly;
`;

const ModalBtn = styled.button`
  border: none;
  width: 40%;
  background: ${({ isLeft }) => (isLeft ? '#f5f5f5' : '#6093FF')};
  padding: 15px;
  text-align: center;
  border-radius: 15px;

  font-size: 15px;
  color:${({ isLeft }) => (isLeft ? '#aaaaaa' : '#FFFFFF')};
`;

const ModalBtn2 = styled.button`
  border: none;
  width: 100%;
  margin: 0px 20px;
  background: ${({ isLeft }) => (isLeft ? '#f5f5f5' : '#6093FF')};
  padding: 15px;
  text-align: center;
  border-radius: 15px;
  font-weight: 500;
  font-size: 18px;
  color:${({ isLeft }) => (isLeft ? '#aaaaaa' : '#FFFFFF')};
`;

const ModalText = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  padding: 0px 35px;
  color: #000000;

  & span{
    font-weight: 700;
    color: #f7d724;
  }

`;

const ModalText2 = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  /* line-height: 20px; */
  padding: 0px 35px;
  color: #c0c0c0;
`;

const ModalText3 = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  /* line-height: 20px; */
  padding: 0px 35px;
  color: #c0c0c0;
`;


const GachonHerald = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([
    {
      section : "Cover Story",
      title : "Animal Diplomacy Is Like A Double-Edged Sword.",
      imgName : "cover1.jpg",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1205"
    },
    {
      section : "Brief",
      title : "European Scenes on the Subway",
      imgName : "cover1.jpg",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1205"
    },
    {
      section : "Brief",
      title : "European Scenes on the Subway",
      imgName : "cover1.jpg",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1205"
    },
    {
      section : "Brief",
      title : "European Scenes on the Subway",
      imgName : "cover1.jpg",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1205"
    }
  ]);

  const [opinion, setOpinion] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);
  const [isDoneModalOn, setIsDoneModalOn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(); // 쿠키 사용하기 위해

  const GoToSignIn = async (e) => {
    navigate("/signin");
  }

  const ChangeOpinion = async (e) => {
    setOpinion(e.target.value);
  }

  const handleAdd = async (e) => {
    if (!cookies.token) {
      const expires = moment().add(48, "hours").toDate();
      setCookie("opinion", opinion, {
        path: "/",
        expires: expires,
      });
      setIsModalOn(true);
      return;
    }

      e.preventDefault();

      if (opinion.length < 1) {
          window.alert("의견을 입력해주세요.");
          setOpinion('');
          return;
      }

      setIsDoneModalOn(true);
      removeCookie("opinion", { path: "/" });
      setOpinion("");

      // try {
      //     const signUpResponse = await axios.post( process.env.REACT_APP_BACK_URL + "/gachonherald",
      //         {
      //             opinion
      //         },
      //         {
      //             headers: {
      //                 Authorization: `Bearer ${cookies.token}`,
      //             },
      //         }

      //     );
      //     if (signUpResponse.data.code === 200) {
      //         setIsDoneModalOn(true);
      //         removeCookie("opinion", { path: "/" });
      //     }
      // } catch (error) {
      //     console.error("오류 발생:", error);

      // }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAnnos = async () => {
      setOpinion( !cookies.opinion ? "" : cookies.opinion );
    };
    fetchAnnos();
  }, []);

  return (
    <Container>
      <Header headerType={"goHome"} headerText={"교내 인터렉티브 광고"}></Header>
      <PageHeader>
          THE GACHON HERALD
          <div>
            No.160 APRIL 2024
          </div>
        </PageHeader>
        <Event>
          <EventTitle>
          Publication Event
          </EventTitle>
          <EventDesc>
          Read our articles and share your opinion! We will choose two people to receive Starbucks coupons on April 30th. Have a great campus life!
          </EventDesc>
          <OpinionInput 
          value={opinion}
          placeholder={"What's your opinion? (It's okay to use either Korean or English.)"}
          onChange={ChangeOpinion}
          >
        
          </OpinionInput>
          <Summit onClick={handleAdd}>
          Send
          </Summit>
        </Event>
      <ContentBox>
        <BoardBox>
          {articles.map((article, index) => (
            <a href={article.url}>
              <ArticleBox>
                <Section>{article.section}</Section>
                <Title>{article.title}</Title>
                <Image></Image>
              </ArticleBox>
            </a>
          ))}
        </BoardBox>
        <Alert>
          이 페이지는 바람의 지원을 받아 제작되었습니다.
        </Alert>
        <Alert>
          광고문의 : @baram_official_
        </Alert>
      </ContentBox>
      {isModalOn ?
      <ModalContainer>
        <ModalBox>
          <ModalText> 로그인 후 응모 가능해요! </ModalText>
          <ModalText3> *작성한 내용은 임시저장되었습니다 </ModalText3>
          <ModalBtnBox>
            <ModalBtn onClick={() => {
              setIsModalOn(false);
            }} isLeft={true}>
              취소
            </ModalBtn>
            <ModalBtn onClick={GoToSignIn}>
              로그인
            </ModalBtn>
          </ModalBtnBox>
        </ModalBox>
      </ModalContainer>
      : null}

{isDoneModalOn ?
      <ModalContainer>
        <ModalBox2>
          <ModalText> 응모 완료 </ModalText>
          <ModalText3> *30일에 개별 연락 드립니다 </ModalText3>
          <ModalText2> *중복 응모를 하더라도 추첨 확률은 동일합니다. </ModalText2>
          <ModalBtnBox>
            <ModalBtn2 onClick={() => {
                setIsDoneModalOn(false);
              }}>
            확인
            </ModalBtn2>
          </ModalBtnBox>
        </ModalBox2>
      </ModalContainer>
      : null} 
    </Container>
  );
};

export default GachonHerald;
