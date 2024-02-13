import Header from "../../components/layout/Header";
import styled from "styled-components";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
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
  border-radius: 20px;
  border: 1px solid #eaeaea;
  background: #fff;
  padding: 5px 0px;
  & a:last-child div {
    border-bottom: none;
  }
`;

const NoticeListbox = styled.div`
  border-bottom: 1px solid #eaeaea;
  margin: 0px;
  padding: 20px 20px 15px;
`;

const NoticeTitle = styled.div`
  color: #000000;
  font-size: 15px;
  font-weight: 700;
`;

const NoticeDate = styled.div`
  width: auto;
  padding: 5px 0px;
  color: #636363;
  font-size: 12px;
  font-weight: 500;
  padding-bottom: 2px;
`;

const ImageIcon = styled.img`
  width: 25px;
  height: 35px;
  float: right;
  vertical-align: middle;
  margin-left: auto;
`;

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // 최신 글 업로드
    const fetchAnnos = async () => {
      try {
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/anno/all"
        );
        setNotices(response.data);
        console.log(response.data);

      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchAnnos();
  }, []);

  return (
    <Container>
      <Header headerType={"close"} headerText={"공지사항"}></Header>
      <ContentBox>
        <BoardBox>
          {notices.map((notice, index) => (
            <Link to={"/notice/"+notice.annoId} key={index}>
              <NoticeListbox>
                <NoticeTitle>
                  [공지] {notice.title}
                  <ImageIcon src={"/image/arrow.svg"} alt="" />
                </NoticeTitle>
                <NoticeDate>{notice.createdAt[0]+"-"+notice.createdAt[1]+"-"+notice.createdAt[2]}</NoticeDate>
              </NoticeListbox>
            </Link>
          ))}
        </BoardBox>
      </ContentBox>
    </Container>
  );
};

export default NoticeList;
