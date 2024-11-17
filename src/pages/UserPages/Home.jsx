import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import Stocks from "./Stocks";
import Dates from "./Dates";
import TextCloud from "./TextCloud";
import StockTitle from "./StockTitle";


const HomeContainer = styled.div`
  position: relative;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

// 왜인진 모르겠지만 이걸 해야 가운데로 예쁘게 됨
const LeftContainer = styled.div`
  display: flex;
  width: 200px; /* 좌측 고정 너비 */
`;

const CenterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Home = () => {
    return (
        <HomeContainer>
            <Header />
            <ContentWrapper>
                <LeftContainer>
                    <Stocks />
                    <Dates />
                </LeftContainer>
                <CenterContainer>
                    <TextCloud />
                </CenterContainer>
                <StockTitle/>
            </ContentWrapper>
        </HomeContainer>
    );
};

export default Home;
