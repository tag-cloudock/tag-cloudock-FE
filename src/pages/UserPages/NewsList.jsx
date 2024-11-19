import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled-components for layout
const Items = styled.div``;

const Item = styled.div`
  width: 100%;
  height: 88px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  margin-bottom: 10px;
  & a{
    color: #333333;
  }
`;

const Date = styled.div`
  color: #bcbcbc;
  font-weight: 500;
  font-size: 18px;
  margin-left: auto;
  padding: 20px;
`;

const NewsTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding: 0 10px 0 20px;
  display: -webkit-box; /* 텍스트가 넘칠 경우 자를 수 있도록 설정 */
  -webkit-line-clamp: 2; /* 최대 두 줄로 자르기 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 넘칠 경우 "..." 표시 */
`;

const Percent = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #f44d52;
`;

const NewsList = ({ name, tag }) => {
  const [newsData, setNewsData] = useState([]); // 뉴스 데이터를 저장할 상태 변수
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/news/search/${name + " " + tag}`
        );
        console.log(response.data.data);
        setNewsData(response.data.data.items); // API 응답에서 뉴스 데이터를 저장
        setLoading(false); // 데이터 로딩이 끝났음을 표시
      } catch (error) {
        console.error("뉴스 데이터 로딩 중 오류 발생", error);
        setLoading(false); // 오류가 발생해도 로딩 종료
      }
    };

    fetchNews(); // 컴포넌트 마운트 시 뉴스 데이터 가져오기
  }, [name, tag]); // name 또는 tag가 변경될 때마다 다시 호출

  if (loading) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때는 로딩 메시지 표시
  }

  return (
    <Items>
      {newsData.map((news, index) => (
 <Item key={index}>
 <a href={news.originallink}>
          {/* 뉴스 제목은 HTML을 포함할 수 있으므로 dangerouslySetInnerHTML 사용 */}
          <NewsTitle dangerouslySetInnerHTML={{ __html: news.title }} />
          </a>
          {/* <Percent>{news.percentChange}%</Percent> */}
          <Date>{news.pubDate.slice(0,16)}</Date>
        </Item>
      
       
      ))}
    </Items>
  );
};

export default NewsList;
