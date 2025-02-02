import styled from "styled-components";
import HomePageBanner from "../components/home/HomePageBanner";
import HomeCard from "../components/cards/HomeCard";
import peinture from "../assets/images/peinture.jpg";
import banc2 from "../assets/images/banc2.jpg";
import pot from "../assets/images/pot.jpg"

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  gap: 20vh;
  justify-content: center;
  margin-top: 10vh;
`;

function HomePage () {
  return (
    <>
      <HomePageBanner />
      <CardDiv>
        <HomeCard cardTitle={"Mobilier"} backgroundImage={banc2}/>
        <HomeCard cardTitle={"Décoration"}backgroundImage={pot}/>
        <HomeCard cardTitle={"Peintures"} backgroundImage={peinture}/>
      </CardDiv>
    </>
  )
}

export default HomePage;