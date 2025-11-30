import styled from "styled-components";
import { colors } from "../constants/style";
import { fontSizes } from "../constants/style";
import logo from "../assets/images/logo.png";

const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f2eaea 0%, #ffffff 100%);
  padding: 2rem;
  text-align: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease-out;
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Logo = styled.img`
  height: 120px;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

const Title = styled.h1`
  font-size: ${fontSizes.xxlargeTitle};
  font-weight: 700;
  color: ${colors.black};
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out 0.2s both;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    font-size: ${fontSizes.xlargeTitle};
  }
`;


const Message = styled.p`
  font-size: ${fontSizes.large};
  color: ${colors.black};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  animation: fadeInUp 1s ease-out 0.6s both;
  
  @media (max-width: 768px) {
    font-size: ${fontSizes.medium};
    padding: 0 1rem;
  }
`;

const ConstructionIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  &::before {
    content: "🚧";
    font-size: 60px;
  }
`;

const InstagramLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.large};
  color: ${colors.black};
  text-decoration: none;
  margin: 2rem 0;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${colors.black};
  border-radius: 50px;
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease-out 0.7s both;
  
  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    font-size: ${fontSizes.medium};
    padding: 0.6rem 1.2rem;
  }
`;


const FooterText = styled.p`
  font-size: ${fontSizes.medium};
  color: ${colors.gray};
  margin-top: auto;
  padding-top: 2rem;
  animation: fadeIn 1s ease-out 0.8s both;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function ComingSoon() {
  return (
    <ComingSoonContainer>
      <LogoContainer>
        <Logo src={logo} alt="Gelul Logo" />
      </LogoContainer>
      
      <ConstructionIcon />
      
      <Title>Site en construction</Title>
      
      <InstagramLink 
        href="https://www.instagram.com/gelul.official/?hl=fr" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Suivez-moi sur Instagram
      </InstagramLink>
      
      <FooterText>
        Revenez bientôt pour découvrir ce qui arrive !
      </FooterText>
    </ComingSoonContainer>
  );
}

export default ComingSoon;
