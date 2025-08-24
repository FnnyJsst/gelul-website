import styled from "styled-components";
import PropTypes from 'prop-types';
const Card = styled.div`
  width: 35vh;
  height: 40vh;
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
  margin-top: 8vh;
  margin-left: 8vh;
  margin-bottom: 8vh;
`

function AboutMeCard ({backgroundImage}) {
  return (
    <Card backgroundImage={backgroundImage}>
    </Card>
  )
}

AboutMeCard.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
};

export default AboutMeCard;