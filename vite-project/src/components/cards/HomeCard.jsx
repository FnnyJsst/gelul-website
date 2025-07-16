import styled from "styled-components";
import colors from "../../constants/style";
import PropTypes from 'prop-types';

const Card = styled.div`
  width: 40vh;
  height: 50vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  border-radius: 20px;
  z-index: 1;
`

const CartTitle = styled.p`
  color: ${colors.white};
  z-index: 2;
  font-size: 25px;
  font-weight: 500;
`;

function HomeCard ({cardTitle, backgroundImage}) {
  return (
    <Card backgroundImage={backgroundImage}>
      <CartTitle >{cardTitle}</CartTitle>
      <Overlay />
    </Card>
  )
}

HomeCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

export default HomeCard;