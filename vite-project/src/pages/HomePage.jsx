import styled from "styled-components";
import HomePageBanner from "../components/banners/HomePageBanner";
import AboutMe from "./AboutMe";
import HomeBoutiqueRowCard from "../components/cards/HomeBoutiqueRowCard";
import LargeButton from "../components/buttons/LargeButton";
import { colors } from "../constants/style";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
`

function HomePage () {
  return (
    <>
      <HomePageBanner />
      <AboutMe />
      <HomeBoutiqueRowCard />
      <ButtonWrapper>
        <LargeButton text="Découvrir tous les produits" href="/boutique" backgroundColor={colors.black} color="white" />
      </ButtonWrapper>
    </>
  )
}

export default HomePage;