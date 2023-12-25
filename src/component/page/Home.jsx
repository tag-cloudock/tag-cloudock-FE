/*
용도: 메인 홈 페이지
담당자: 김윤수
사용법: 메인 홈 페이지로 사용
기타: 브랜치 잘 올라가는지 확인합니다
*/
import MenuBar from "../layout/MenuBar";
import Header from "../layout/Header";

const Home = () => {
  return (
    <div>
      <Header headerType={"home"}></Header>
      <MenuBar></MenuBar>
    </div>
  );
};

export default Home;
