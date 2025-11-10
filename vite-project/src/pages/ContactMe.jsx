import LargeButton from "../components/buttons/LargeButton";
import Banner from "../components/banners/Banner";
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
  font-size: ${fontSizes.mediumTitle};
  font-weight: normal;
  margin-top: 8vh;
  margin-bottom: 2vh;
  margin-left: 10vh;
`;

const Paragraph = styled.p`
  font-size: ${fontSizes.large};
  font-weight: normal;
  margin-bottom: 5vh;
  margin-left: 10vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10vh;
`;

const NameInput = styled.input`
  width: 50%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const FirstnameInput = styled.input`
  width: 50%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10vh;
`;

const EmailInput = styled.input`
  width: 50%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const PhoneInput = styled.input`
  width: 50%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const MessageInput = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
`;

function ContactMe() {
  return (
    <>
      <Banner title="Contact" />
      <PageContainer>
          <Title>Un idée de projet ? Une question ?</Title>
          <Paragraph>
            N'hésitez pas à me contacter via le formulaire ci-dessous 😊
          </Paragraph>
          <Form>
            <FirstRow>
              <NameInput />
              <FirstnameInput />
            </FirstRow>
            <SecondRow>
              <EmailInput />
              <PhoneInput />
            </SecondRow>
            <MessageInput />
            <SubmitButton>Envoyer</SubmitButton>
          </Form>
      </PageContainer>
    </>
  )
}

export default ContactMe;