import styled from "styled-components";
import HomePageBanner from "../components/home/HomePageBanner";
import HomeCard from "../components/cards/HomeCard";

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  gap: 20vh;
  justify-content: center;
  margin-top: 5vh;
`;

function HomePage () {
  return (
    <>
      <HomePageBanner />
      <CardDiv>
        <HomeCard cardTitle={"Mobilier"}/>
        <HomeCard cardTitle={"Décoration"}/>
        <HomeCard cardTitle={"Peintures"}/>
      </CardDiv>
    </>
  )
}

export default HomePage;