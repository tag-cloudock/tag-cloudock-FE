/*
용도: 메인 홈 페이지
담당자: 김윤수
사용법: 
기타: 
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