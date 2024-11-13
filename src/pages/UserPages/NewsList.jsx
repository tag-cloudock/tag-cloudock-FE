import styled from "styled-components";
import NewsItem from "./NewsItem";

const Items = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const NewsList = () => {
    return (
        <div>
            <NewsItem/>
            <NewsItem/>
            <NewsItem/>
            <NewsItem/>
            <NewsItem/>
        </div>
    )
}
export default NewsList;