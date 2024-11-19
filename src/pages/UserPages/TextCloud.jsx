import styled, { keyframes } from "styled-components";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackGround = styled.img`
  width: 1000px;
  height: 600px;
`;

const TextContainer = styled.div`
  width: 1000px;
  height: 600px;
  position: relative;
`;

const moveAnimation = (xStart, yStart, xEnd, yEnd) => keyframes`
  0% {
    left: ${xStart}px;
    top: ${yStart}px;
  }
  100% {
    left: ${xEnd}px;
    top: ${yEnd}px;
  }
`;

const Text = styled.a`
  position: absolute;
  font-weight: bold;
  font-size: ${(props) => props.size}px;
  color: #4D9EFD;
  text-decoration: none;
  padding: 5px;
  border-radius: 3px;
  opacity: ${(props) => props.opacity};
  z-index: ${(props) => props.zIndex};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  white-space: nowrap;
  animation: ${(props) =>
    moveAnimation(props.xStart, props.yStart, props.xEnd, props.yEnd)} 30s ease forwards;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const Texts = styled.div`
  position: absolute;
  padding: 20px 30px;
  box-sizing: border-box;
  width: 600px;
  height: 400px;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TextCloud = ({ stock, setTag, setIsNewsView }) => {
  const [tags, setTags] = useState([]);
  const [positions, setPositions] = useState([]);

  // Function to generate random start and end positions for animation
  const generateRandomPosition = () => {
    const xStart = Math.random() * 800 + 50;
    const yStart = Math.random() * 400 + 100;
    const xEnd = Math.random() * 800 + 50;
    const yEnd = Math.random() * 400 + 100;
    return { xStart, yStart, xEnd, yEnd };
  };

  useEffect(() => {
    setTags([]);
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACK_URL + "/tags/" + stock.name);

        const fetchedTags = response.data.data.tags;
        setTags(fetchedTags);
        // Initialize positions with random values for each tag
        const initialPositions = fetchedTags.map(() => generateRandomPosition());
        setPositions(initialPositions);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, [stock]);

  // Define the maximum and minimum font size range
  const minFontSize = 20; // Minimum font size (for the smallest value)
  const maxFontSize = 80; // Maximum font size (for the largest value)

  // Find the maximum and minimum tag values to map the font size proportionally
  const maxTagValue = Math.max(...tags.map(tag => tag.value));
  const minTagValue = Math.min(...tags.map(tag => tag.value));

  // Function to calculate the font size based on tag value
  const calculateFontSize = (value) => {
    return minFontSize + (value - minTagValue) * (maxFontSize - minFontSize) / (maxTagValue - minTagValue);
  };

  // Function to calculate opacity based on tag value
  const calculateOpacity = (value) => {
    return Math.min(0.5 + (value / maxTagValue) * 0.5, 1); // Max opacity of 1
  };

  // Use interval to update positions randomly every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prevPositions) =>
        prevPositions.map(() => generateRandomPosition()) // Update each tag's position randomly
      );
    }, 31000); // Update positions every 31 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const goToNews = (tag) => {
      setTag(tag);
      setIsNewsView(true);
  };

  return (
    <Container>
      <TextContainer>
        <BackGround src="/image/cloud.svg" />
        <Texts>
          {tags.map((tag, index) => {
            const fontSize = calculateFontSize(tag.value);
            const opacity = calculateOpacity(tag.value);
            const { xStart, yStart, xEnd, yEnd } = positions[index] || generateRandomPosition(); // Default to random position if not yet set

            return (
                <Text
                  size={fontSize}
                  opacity={opacity}
                  zIndex={index + 1}
                  xStart={xStart}
                  yStart={yStart}
                  xEnd={xEnd}
                  yEnd={yEnd}
                  left={`${xStart}px`}
                  top={`${yStart}px`}
                  onClick={() => goToNews(tag.text)}
                >
                  {tag.text}
                </Text>
            );
          })}
        </Texts>
      </TextContainer>
    </Container>
  );
};

export default TextCloud;
