import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 14px 22px 0 0 ;
  position: absolute; top: 100px; right: 0;
`;
const Title =styled.div`
  color: #828282;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
`;

const MoreImg=styled.img`
  width: 20px;
`;

const StockTitle = () => {
    return (
        <div>
            <Container>
                <Title>삼성전자</Title>
                <MoreImg src="image/moreimg.svg"/>
            </Container>
        </div>
    )
}
export default StockTitle