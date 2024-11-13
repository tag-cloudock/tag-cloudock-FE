import styled from "styled-components";

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

const BackGround = styled.img`
`;

const TextCloud = () => {
    return (
        <div>
            <Container>
            <BackGround src="/image/cloud.svg"/>
            </Container>
        </div>
    )
}

export default TextCloud