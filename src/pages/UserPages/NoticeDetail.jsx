/*
용도: 공지사항 상세 페이지
담당자: qkrdustj
사용법: 
기타: 
*/

import Header from "../../components/layout/Header";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuBar from "../../components/layout/MenuBar";

const Container = styled.div`
  position: absolute;
  /* padding: 0px 20px; */
  /* border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee; */
  /* margin-left: -1px; */
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const NoticeBox = styled.div`
  /* width: 100%; */
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
  padding: 20px 20px 15px;
`;

const Contentbox = styled.div`
  margin: 0px;
  padding: 20px 20px 80px;
`;

const NoticeTitle = styled.div`
  color: #636363;
  font-size: 15px;
  font-weight: 700;
  padding-bottom: 2px;
`;

const NoticeDate = styled.div`
  width: auto;
  padding: 5px 0px;
  color: #636363;
  font-size: 12px;
  font-weight: 500;
  padding-top: 10px;
`;

const NoticeContent = styled.div`
  color: #636363;
  font-size: 13px;
  font-weight: 700;
  line-height: 180%;
`;

const NoticeDetail = () => {
  return (
    <Container>
      <Header headerType={"admin"} headerText={"공지사항"}></Header>
      <NoticeBox>
        <BoardBox>
          <Titlebox>
            <NoticeTitle>[공지] 말걸지마 ㅇㅋ</NoticeTitle>
            <NoticeDate>2023-12-07</NoticeDate>
          </Titlebox>
          <Contentbox>
            <NoticeContent>
              하나 둘 we are egging 안녕하세요~ 애기쓰입니다. <br></br>
              어쩌구저쩌구 <br></br>
              말걸지 마세요 냠냠
            </NoticeContent>
          </Contentbox>
        </BoardBox>
      </NoticeBox>
      <MenuBar></MenuBar>
    </Container>
  );
};

export default NoticeDetail;
