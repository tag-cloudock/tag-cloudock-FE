import styled from "styled-components";
import { React } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackGround = styled.img`
  width: 650px;
  height: 400px;
`;

const TextContainer = styled.div`
  width: 600px;
  height: 400px;
  position: relative;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #F44D5E;
  display: inline-block;
  white-space: nowrap; /* Prevent line breaks within each Text */
`;

const Texts = styled.div`
  position: absolute;
  padding: 0 30px;
  width: 600px;
  height: 400px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center; /* Center wrapped rows vertically */
  flex-wrap: wrap; /* Allow Text elements to wrap onto new lines */
  gap: 10px;
  text-align: center;
`;

const TextCloud = () => {
    return (
        <Container>
            <TextContainer>
                <BackGround src="/image/cloud.svg" />
                <Texts>
                    <Link to={"/news"}>
                        <Text>외국인</Text>
                    </Link>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                    <Text>트럼프</Text>
                </Texts>
            </TextContainer>
        </Container>
    );
};

export default TextCloud;
