import styled from "styled-components";
import { colors } from "../../constants/style";
import PropTypes from 'prop-types';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  border-radius: 20px;
  transition: all 0.3s ease;
`

const Card = styled.div`
  width: 32vh;
  height: 38vh;
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
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    
    ${Overlay} {
      background: rgba(0, 0, 0, 0.4);
    }
  }
  
  &:active {
    transform: translateY(-5px) scale(1.01);
  }
`

const CartTitle = styled.p`
  color: ${colors.white};
  z-index: 2;
  font-size: 25px;
  font-weight: 400;
  transition: all 0.3s ease;
  text-align: center;
  
  ${Card}:hover & {
    transform: translateY(-5px);
    font-size: 27px;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
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