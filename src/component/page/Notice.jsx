/*
용도 : 공지사항 페이지
담당자: 박여넛
사용법: 
기타: 
*/
import Header from "../layout/Header";
import styled from "styled-components";
import MenuBar from "../layout/MenuBar";
import { Link, useNavigate } from "react-router-dom";

const BoardBox = styled.div`
  border-radius: 10px;
  border: 1px solid #eaeaea;
  background: #fff;
  padding: 10px 20px;
  width: auto;
  height: auto;
  flex-shrink: 0;
  margin: 0 auto;
  @media screen and (max-width: 700px) positon :relative;
`;

const Listbox = styled.div`
  border-bottom: 1px solid #d5d5d5;
  background: #fff;
  width: auto;
  height: 56px;
  flex-shrink: 0;
  display: opacity;
  padding: 5px;
`;

const NoticeTitle = styled.div`
  display: flex;
  width: 237px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #636363;
  font-family: Lexend;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const NoticeDate = styled.div`
  display: flex;
  width: auto;
  height: 13px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #636363;
  font-family: Lexend;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 2px;
`;

const ImageIcon = styled.img`
  width: 25px;
  height: 30px;
  flex-shrink: 0;
  background: url(<path-to-image>) / contain no-repeat;
  float: right;
  display: inline-block;
  vertical-align: middle;
  margin-left: auto;
  margin-bottom: 5px;
`;

const Notice = () => {
  return (
    <div>
      <Header headerType={"home"}></Header>
      <Link to={"/"}>
        <Header headerType={"admin"} headerText={"공지사항"}></Header>
      </Link>
      <BoardBox>
        <Link to={"/"}>
          <Listbox>
            <NoticeTitle>
              [공지] 말걸지마 ㅇㅋ
              <ImageIcon src={"/image/arrow.svg"} alt="" />
            </NoticeTitle>
            <NoticeDate>2023-12-07</NoticeDate>
          </Listbox>
        </Link>
        <Link to={"/"}>
          <Listbox>
            <NoticeTitle>말걸지마 ㅇㅋ</NoticeTitle>
            <NoticeDate>2023-12-07</NoticeDate>
          </Listbox>
        </Link>
        <Link to={"/"}>
          <Listbox>
            <NoticeTitle>말걸지마 ㅇㅋ</NoticeTitle>
            <NoticeDate>2023-12-07</NoticeDate>
          </Listbox>
        </Link>
        <Link to={"/"}>
          <Listbox>
            <NoticeTitle>말걸지마 ㅇㅋ</NoticeTitle>
            <NoticeDate>2023-12-07</NoticeDate>
          </Listbox>
        </Link>
      </BoardBox>
      <MenuBar></MenuBar>
    </div>
  );
};

export default Notice;
