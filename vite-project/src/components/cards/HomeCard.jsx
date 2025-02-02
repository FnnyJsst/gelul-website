import styled from "styled-components";
import colors from "../../constants/style";

const Card = styled.div`
  background-color: gray;
  width: 40vh;
  height: 50vh;
  margin-bottom: 20vh;
  border-radius: 20px;
  display: flex;
  flex-direction: colum;
  align-items: center;
  justify-content: center;
`

const CartTitle = styled.p`
  color: ${colors.white};
`;

function HomeCard ({cardTitle}) {
  return (
    <Card>
      <CartTitle>{cardTitle}</CartTitle>
    </Card>
  )
}

export default HomeCard;