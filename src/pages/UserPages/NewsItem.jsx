import styled from "styled-components";

const BackContainer = styled.div`
  width: 900px;
  height: 88px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  margin-bottom: 10px;
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
`;
const Percent=styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #f44d52;
  
`;

const NewsItem = () => {
    return (
        <div>
            <BackContainer>
                <NewsTitle>"외인이 돌아왔다"…삼성전자, 반등 흐름 이어가나</NewsTitle>
                <Percent>+5%</Percent>
                <Date>2024.10.12</Date>
            </BackContainer>
        </div>
    )
}
export default NewsItem;