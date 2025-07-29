import FooterCard from "../cards/FooterCard";
import styled from "styled-components";
import IconFooter from "../buttons/IconFooter";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const FooterContainer = styled.div`
  background-color: #efe9e9;
  display: flex;
  flex-direction: row;
  min-height: 20vh;
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
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
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
        <IconFooter Icon={FaFacebook} />
        <IconFooter Icon={FaInstagram} />
      </RightContainer>
    </FooterContainer>
  )
}

export default Footer;