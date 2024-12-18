import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 14px 22px 0 0 ;
  position: absolute; top: 100px; left: 220px;
`;
const Title =styled.div`
  color: #828282;
  font-size: 20px;
  font-weight: bold;
`;

const BackImg=styled.img`
  width: 28px;
`;

const KeyWord = ({ tag }) => {
    return (
        <div>
            <Container>
                {/* <BackImg src="image/backicon2.svg"/> */}
                <Title>{tag}</Title>
            </Container>
        </div>
    )
}
export default KeyWord;