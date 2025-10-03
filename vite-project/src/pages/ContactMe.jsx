import LargeButton from "../components/buttons/LargeButton";
import styled from "styled-components";
import { fontSizes } from "../constants/style";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #efe9e9;
`;

const Title = styled.p`
  font-size: ${fontSizes.mediumTitle};
  font-weight: normal;
  margin-top: 8vh;
  margin-bottom: 5vh;
  margin-left: 10vh;
`;

const ButtonWrapper = styled.div`
  display: flex;
  // justify-content: flex-start;
  margin-left: 10vh;
`;

function ContactMe() {
  return (
    <PageContainer>
      <ButtonWrapper>
        <Title>Un projet ? Une question ?</Title>
        <LargeButton text="Contactez-moi" backgroundColor="#3B3A3A" color="#ffffff" />
      </ButtonWrapper>
    </PageContainer>
  )
}

export default ContactMe;