import styled from "styled-components";
import AboutMeCard from "../components/cards/AboutMeCard";
import peinture from "../assets/images/peinture.jpg";
import { fontSizes } from "../constants/style";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 12vh;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10vh;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10vh;
`;

const Title = styled.h1`
  font-size: ${fontSizes.mediumTitle};
  font-weight: normal;
  margin-top: 8vh;
  margin-bottom: 5vh;
`;

const Paragraph = styled.p`
  font-size: ${fontSizes.medium};
  font-weight: normal;
  margin-bottom: 5vh;
  width: 75%;
  line-height: 1.5;
`;

function AboutMe () {
  return (
    <>
      <PageContainer>
          <LeftSection>
            <AboutMeCard />
          </LeftSection>
          <RightSection>
              <Title>Présentation</Title>
              <Paragraph>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</Paragraph>
          </RightSection>
      </PageContainer>
    </>
  )
}   

export default AboutMe;