import styled, { keyframes } from "styled-components";
import { useState, useEffect } from 'react';
import axios from "axios";

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
  color: #F44D5E;
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

const TextCloud = () => {
  const [tags, setTags] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACK_URL + "/tags/테슬라");
        setTags(response.data.data.tags);
        console.log(response.data.data.tags);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    fetchData();
  }, []);

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

  // Function to generate random start and end positions for animation
  const generateRandomPosition = (position) => {
    const xStart = position ? position.xEnd : Math.random() * 400 + 50;
    const yStart = position ? position.yEnd : Math.random() * 300 + 50;
    const xEnd = Math.random() * 400 + 50; // Random end X position
    const yEnd = Math.random() * 300 + 50; // Random end Y position
    return { xStart, yStart, xEnd, yEnd };
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prevPositions) =>
        prevPositions.map((position) => {
          return generateRandomPosition(position); // Update each tag's position correctly
        })
      );
    }, 31000); // Update positions every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    // Initialize the positions when tags are loaded
    setPositions(tags.map(() => generateRandomPosition())); // Initialize positions with random values
  }, [tags]);

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
                key={tag.text}
                size={fontSize}
                opacity={opacity}
                zIndex={index + 1}
                xStart={xStart}
                yStart={yStart}
                xEnd={xEnd}
                yEnd={yEnd}
                left={`${xStart}px`}
                top={`${yStart}px`}
                href="#"
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
