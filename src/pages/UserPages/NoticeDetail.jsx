import styled from "styled-components";
import Header from "../../components/layout/Header";
import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
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
`;

const Titlebox = styled.div`
  border-bottom: 1px solid #eaeaea;
  margin: 0px;
  padding: 20px 20px 5px 20px;
  height: 30px;
`;

const NoticeTitle = styled.div`
  color: #000000;
  font-size: 15px;
  font-weight: 700;
  float: left;
`;

const NoticeDate = styled.div`
  width: auto;
  color: #636363;
  font-size: 12px;
  font-weight: 500;
  float: right;
  margin-top: 2px;
`;

const NoticeContent = styled.div`
  color: #000000;
  font-size: 13px;
  font-weight: 400;
  line-height: 180%;
  padding: 20px 20px 80px;
  white-space:pre;
`;

const NoticeDetail = () => {
  const [notice, setNotice] = useState({title: "", createdAt: []});
  const { id } = useParams();

  useEffect(() => {
    // 최신 글 업로드
    const fetchAnno = async () => {
      try {
        const response = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/anno/"+id
        );
        setNotice(response.data);
        console.log(response.data);

      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchAnno();
  }, []);
  return (
    <Container>
      <Header headerType={"close"} headerText={"공지사항"}></Header>
      <ContentBox>
        <BoardBox>
          <Titlebox>
            <NoticeTitle>[공지] {notice.title}</NoticeTitle>
            <NoticeDate>{notice.createdAt[0]+"-"+notice.createdAt[1]+"-"+notice.createdAt[2]}</NoticeDate>
          </Titlebox>
            <NoticeContent>
              {notice.content}
            </NoticeContent>
        </BoardBox>
      </ContentBox>
    </Container>
  );
};

export default NoticeDetail;
