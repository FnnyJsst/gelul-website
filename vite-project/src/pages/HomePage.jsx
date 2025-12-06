import styled from "styled-components";
import HomePageBanner from "../components/banners/HomePageBanner";
import HomeCard from "../components/cards/HomeCard";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import peinture from "../assets/images/peinture.jpg";
import banc2 from "../assets/images/banc2.jpg";
import pot from "../assets/images/pot.jpg"
import { fontSizes } from "../constants/style";

const CategoryText = styled.p`
  font-size: ${fontSizes.mediumTitle};
  font-weight: normal;
  margin-bottom: 5vh;
  margin-top: 2vh;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  gap: 20vh;
  justify-content: center;
  padding-top: 7vh;
  padding-bottom: 7vh;
  background-color: #f2eaea;
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
      {/* <AboutMe /> */}
      {/* <ContactMe /> */}
    </>
  )
}

export default HomePage;