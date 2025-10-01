import styled from "styled-components";
import AboutMeCard from "../components/cards/AboutMeCard";
import { fontSizes } from "../constants/style";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 12vh;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10vh;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10vh;
`;

const Title = styled.h1`
  font-size: ${fontSizes.mediumTitle};
  font-weight: normal;
  margin-top: 8vh;
  margin-bottom: 5vh;
`;

const Paragraph = styled.p`
  font-size: ${fontSizes.large};
  font-weight: normal;
  margin-bottom: 5vh;
  width: 58%;
  line-height: 1.5;
`;

function AboutMe () {
  return (
    <>
      <PageContainer>
          <LeftSection>
            <AboutMeCard />
          </LeftSection>
          <RightSection>
              <Title>Présentation</Title>
              <Paragraph>Dans mon atelier, chaque pièce raconte 
                une histoire unique. Je crée des œuvres 
                qui allient esthétique et fonctionnalité, 
                en m'inspirant de la beauté qui nous entoure pour donner vie à des créations 
                personnalisées qui enrichiront votre intérieur.
              </Paragraph>
          </RightSection>
      </PageContainer>
    </>
  )
}   

export default AboutMe;