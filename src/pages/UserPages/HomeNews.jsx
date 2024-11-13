import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import Stocks from "./Stocks";
import Dates from "./Dates";
import StockTitle from "./StockTitle";
import KeyWord from "./KeyWord";
import NewsList from "./NewsList";

const HomeContainer = styled.div`
  position: relative;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const CenterContainer = styled.div`
  flex: 1;
  display: flex;
  margin-top: 70px;
  justify-content: center;
`;


const HomeNews = () => {
    return (
        <HomeContainer>
            <Header />
            <ContentWrapper>
                    <Stocks />
                <StockTitle/>
                <KeyWord/>
                <CenterContainer><NewsList/></CenterContainer>
            </ContentWrapper>
        </HomeContainer>
    );
};

export default HomeNews;