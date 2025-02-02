import styled from "styled-components";
import colors from "../../constants/style";
import LargeButton from "../buttons/LargeButton";
import { BsArrowRight } from "react-icons/bs";

const BannerDiv = styled.div`
  background-color: gray;
  height: 50vh;
  width: 100%;
  padding: 6vh;
`;

const Title = styled.h1 `
  color: ${colors.white};
  font-weight: normal;
  font-size: 35px;
  width: 10px;
  margin-bottom: 6vh;
`;

function HomePageBanner () {
  return (
    <>
      <BannerDiv>
        <Title>Créateur d'Orginalités</Title>
        <LargeButton Icon={BsArrowRight} />
      </BannerDiv>
    </>
  )
}

export default HomePageBanner;