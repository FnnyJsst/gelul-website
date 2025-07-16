import FooterCard from "../cards/FooterCard";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #e5e5d5;
  display: flex;
  flex-direction: row;
  height: 20vh
  `;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 20vh;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


function Footer () {
  return (
    <FooterContainer>
      <LeftContainer>
        <FooterCard title="Navigation" elements={["Accueil", "Boutique", "À propos", "Évènements"]} />
        <FooterCard title="Boutique" elements={["Mobilier", "Décoration", "Peintures"]} />
        <FooterCard title="Contact" elements={["contact@gelul.com"]} />
      </LeftContainer>
      <RightContainer>
      </RightContainer>
    </FooterContainer>
  )
}

export default Footer;