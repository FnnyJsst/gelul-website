import styled from "styled-components";
import AboutMeCard from "../components/cards/AboutMeCard";
import { fontSizes } from "../constants/style";
import logo from "../assets/images/logo.png";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 12vh;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 6vh;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10vh;
`;

const Title = styled.h1`
  font-size: ${fontSizes.mediumTitle};
  font-weight: 500;
  margin-top: 4vh;
  margin-bottom: 3vh;
  line-height: 1.4;
`;

const TitleLine = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
`;

const LogoImage = styled.img`
  height: 1.5em;
  display: inline-block;
  vertical-align: middle;
  transform: translateY(8px);
  object-fit: contain;
`;

const Paragraph = styled.p`
  font-size: ${fontSizes.large};
  font-weight: normal;
  margin-bottom: 5vh;
  width: 60%;
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
              <Title>
                <TitleLine>La philosophie <LogoImage src={logo} alt="GELUL" /> :</TitleLine>
                <br /> Donner une seconde vie à la matière
              </Title>
              <Paragraph>Fabriquée dans mon atelier situé à Bayeux, chaque pièce raconte une histoire unique. <br /><br />
                         Ma démarche s'articule autour du réemploi : je crée des œuvres esthétiques 
                         et fonctionnelles en transformant des matériaux destinés à être jetés. 
                         Que ce soit de vieilles chaises, des tabourets délaissés ou des tables oubliées, 
                         je récupère ce bois pour lui offrir une seconde vie sous forme de mobilier vivant 
                         et coloré, en alliant le savoir-faire de la peinture à la main.
              </Paragraph>
          </RightSection>
      </PageContainer>
    </>
  )
}   

export default AboutMe;