import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`

const Title = styled.h1`
  font-size: 15px;
  font-weight: normal;
`

function FooterCard ({title}) {
  return (
    <Card>
        <Title>{title}</Title>
        <ul>
            <li></li>
        </ul>
    </Card>
  )
}

FooterCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FooterCard;