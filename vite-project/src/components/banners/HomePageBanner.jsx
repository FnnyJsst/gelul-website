import styled from "styled-components";
import { colors, fontSizes } from "../../constants/style";
import LargeButton from "../buttons/LargeButton";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BannerDiv = styled.div`
  height: 30vh;
  width: 100%;
  padding: 4vh;
  padding-left: 10vh;
  background-image: url("${new URL('../../assets/images/table-plants.jpg', import.meta.url).href}");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  color: ${colors.white};
  font-weight: normal;
  font-size: ${fontSizes.xlargeTitle};
  margin-bottom: 5vh;
  margin-top: 2vh;
  position: relative;
  z-index: 2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const ButtonWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

function HomePageBanner() {
  const navigate = useNavigate()

  return (
    <BannerDiv>
      <Overlay />
      <Title>Découvrez la nouvelle collection</Title>
      <ButtonWrapper>
        <LargeButton Icon={BsArrowRight} text="Trouvez votre pièce unique ici" href="/boutique" onClick={() => navigate('/boutique')} />
      </ButtonWrapper>
    </BannerDiv>
  );
}

export default HomePageBanner;