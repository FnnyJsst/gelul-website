import styled from "styled-components";
import { fontSizes } from "../constants/style";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #efe9e9;
`;

const Title = styled.p`
  font-size: ${fontSizes.largeTitle};
  font-weight: 300;
  margin-top: 8vh;
  margin-bottom: 5vh;
`;

function ContactMe() {
  return (
    <PageContainer>
      <Title>Un projet ? Une question ?</Title>
    </PageContainer>
  )
}

export default ContactMe;