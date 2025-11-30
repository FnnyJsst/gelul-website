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

const Subtitle = styled.h2`
  font-size: ${fontSizes.largeTitle};
  font-weight: 400;
  color: ${colors.gray};
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    font-size: ${fontSizes.mediumTitle};
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

const FooterText = styled.p`
  font-size: ${fontSizes.medium};
  color: ${colors.gray};
  margin-top: auto;
  padding-top: 3rem;
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
      <Subtitle>Arrive bientôt</Subtitle>
      
      <Message>
        Nous travaillons dur pour vous offrir une expérience exceptionnelle. 
        Notre site sera bientôt disponible avec tous nos produits et services.
      </Message>
      
      <FooterText>
        Revenez bientôt pour découvrir ce qui arrive !
      </FooterText>
    </ComingSoonContainer>
  );
}

export default ComingSoon;
