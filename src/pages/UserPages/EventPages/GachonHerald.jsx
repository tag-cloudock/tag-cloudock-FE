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

const Image = styled.img`
  border-top:1px solid #eeeeee;
  display: block;
  width: 100%;
  background-color: #eeeeee;
  margin: 0px;
  padding: 0px;
`;

const PageHeader = styled.div`
  padding: 30px 0px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 900;
  font-family: "Crimson Text";
  /* background-color: #eeeeee; */
  border-top: 1px solid #eeeeee;
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
  background: #f6f6f6;

  
  @media screen and (min-width: 701px) {
    border-radius: 15px;
  }

`;

const EventTitle = styled.div`
 text-align: center;
 font-size: 30px;
 font-weight: 700;
 color: #000000;
 border-bottom : 3px solid #e2e2e2;
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

const Truncate = styled.div`
  border-top: 1px solid #eeeeee;
  font-size: 15px;
  font-weight: 500;
  padding: 10px;
  color: #aaaaaa;
`;

const GachonHerald = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([
    {
      section : "Cover Story",
      title : "South Korea's Environmental Policy in Retreat",
      imgName : "cover_story.jpg",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1219"
    },
    {
      section : "Brief",
      title : "Gachon University Establishes the First AI College in South Korea",
      imgName : "brief1.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1214"
    },
    {
      section : "Brief",
      title : "Shining College Life with English, a New Beginning",
      imgName : "",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1217",
      truncate: "Seeking meaningful activities for the new semester or being concerned about English proficiency is common among students. As a new student, one may seek enjoyable campus activities while studying English, while current students may pursue opportunities for TOEIC preparation and studying abroad. "
    },
    {
      section : "Brief",
      title : "Increasing Early and Regular Admission Applications of Gachon University in 2024",
      imgName : "",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1207",
      truncate: "Gachon University's early and regular admission applicants continue to show an increasing trend. As of early admission in 2024, Gachon University had the second most applicants in Korea with 76,264 applicants, which is 28.9% more than last year. "
    },
    {
      section : "Feature",
      title : "Seoul's Spring - The Intersection of History and Desire in 1979",
      imgName : "feature1.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1215"
    },
    {
      section : "Feature",
      title : "Continued Deficit Prompts Carrot Market to Adopt a New Name",
      imgName : "feature2.jpg",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1222"
    },
    {
      section : "Gachonian",
      title : "We are Students and Entrepreneurs; Stories of Cocone School Entrepreneurs",
      imgName : "",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1218",
      truncate: "If you are a student at Gachon University, you may have heard of ‘Gachon Cocone School,’ a student entrepreneurship curriculum. But do you know more about Cocone School? Cocone School, which opened in 2022, is relatively new, so there are inevitably only a few students who know the information. "
    },
    {
      section : "Photo Essay",
      title : "Flowers that bloom once a year",
      imgName : "photo_essay.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1216"
    },
    {
      section : "World Wide",
      title : "What Will the Russia-Ukraine War Look Like in 2024?",
      imgName : "",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1209",
      truncate: "On February 24th, 2022, Vladimir Putin declared war against Ukraine under the guise of \"a special military operation,\" purportedly aimed at restoring order and combating alleged Neo-Nazis. "
    },
    {
      section : "World Wide",
      title : "Bedbugs Invade France",
      imgName : "world_wide1.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1212"
    },
    {
      section : "Campus Talk",
      title : "Would You Participate in Dating Reality Shows like 'Exchange'?",
      imgName : "campus_talk.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1205"
    },
    {
      section : "Experience",
      title : "Seeing Beyond Sight, 'Dialogue in the Dark'",
      imgName : "experience.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1211"
    },
    {
      section : "Movie",
      title : "The Tragic Life of Alan Turing",
      imgName : "movie.jpg",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1221"
    },
    {
      section : "Book",
      title : "How People Conform to an Unjust Society",
      imgName : "book.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1208"
    },
    {
      section : "Drama",
      title : "Different Cultures, Different Dramas",
      imgName : "drama.png",
      url: "http://www.gachonherald.com/news/articleView.html?idxno=1210"
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

      // setIsDoneModalOn(true);
      // removeCookie("opinion", { path: "/" });
      // setOpinion("");

      try {
          const signUpResponse = await axios.post( process.env.REACT_APP_BACK_URL + "/gachon-herald",
              {
                  opinion
              },
              {
                  headers: {
                      Authorization: `Bearer ${cookies.token}`,
                  },
              }

          );
          if (signUpResponse.data.code === 200) {
              setIsDoneModalOn(true);
              removeCookie("opinion", { path: "/" });
              setOpinion("");
          }
      } catch (error) {
          console.error("오류 발생:", error);

      }
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
            no.160 Spring 2024
          </div>
        </PageHeader>
        <Event>
          <EventTitle>
          Publication Event
          </EventTitle>
          <EventDesc>
          Read our articles and share your opinion! We will choose two people to receive Starbucks coupons on May 31st. Have a great campus life!
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
                { article.imgName == "" 
                ? <Truncate>{"\u00A0" + article.truncate.slice(0,150) + "..."}</Truncate>

                : <Image src={"image/gachonherald/"+article.imgName}></Image>
          }
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
