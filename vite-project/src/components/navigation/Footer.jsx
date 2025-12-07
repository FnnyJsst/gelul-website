import FooterCard from "../cards/FooterCard";
import styled from "styled-components";
import IconFooter from "../buttons/IconFooter";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { fontSizes } from "../../constants/style";

const FooterContainer = styled.div`
  background-color: #3B3A3A;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  min-height: 20vh;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 20vh;
  margin-left: 10vh;
`;

const RightContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const Copyright = styled.p`
  font-size: ${fontSizes.small};
  font-weight: normal;
`;


function Footer () {
  return (
    <FooterContainer>
      <LeftContainer>
        <FooterCard 
          title="Navigation" 
          elements={[
            { text: "Accueil", to: "/" },
            { text: "Boutique", to: "/boutique" },
            { text: "À propos", to: "/about" },
            { text: "Évènements", to: "/events" }
          ]} 
        />
        <FooterCard 
          title="Boutique" 
          elements={[
            { text: "Mobilier", to: "/boutique?category=mobilier" },
            { text: "Décoration", to: "/boutique?category=decoration" },
            { text: "Peintures", to: "/boutique?category=peintures" }
          ]} 
        />
        <FooterCard 
          title="Contact" 
          elements={[
            { text: "Formulaire de contact", to: "/contact" },
            "contact@gelul.com"
          ]}
        />
        <FooterCard 
          title="Informations" 
          elements={[
            "Politique de retour",
            "Livraison",
            { text: "Mentions légales", to: "/mentions-legales" },
            "Conditions générales de vente"
          ]}
        />
      </LeftContainer>
      <RightContainer>
        <IconWrapper>
          <IconFooter Icon={FaFacebook} />
          <IconFooter Icon={FaInstagram} />
        </IconWrapper>
        <Copyright>© Gelul 2025 | Créateur d'Originalités</Copyright>
      </RightContainer>
    </FooterContainer>
  )
}

export default Footer; 