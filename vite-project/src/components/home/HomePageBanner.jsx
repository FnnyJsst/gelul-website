import styled from "styled-components";
import { colors, fontSizes } from "../../constants/style";
import LargeButton from "../buttons/LargeButton";
import { BsArrowRight } from "react-icons/bs";
import test from "../../assets/images/test.jpg"

const BannerDiv = styled.div`
  height: 40vh;
  width: 100%;
  padding: 6vh;
  padding-left: 10vh;
  background-image: url(${test});
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
  font-size: ${fontSizes.largeTitle};
  width: 200px;
  margin-bottom: 6vh;
  position: relative;
  z-index: 2;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const ButtonWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

function HomePageBanner() {
  return (
    <BannerDiv>
      <Overlay />
      <Title>Créateur d&apos;Originalités</Title>
      <ButtonWrapper>
        <LargeButton Icon={BsArrowRight} />
      </ButtonWrapper>
    </BannerDiv>
  );
}

export default HomePageBanner;