import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
`

const Title = styled.h1`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
`

const ListItem = styled.li`
  font-size: 15px;
  font-weight: normal;
  list-style: none;
`

function FooterCard ({title, elements}) {
  return (
    <Card>
        <Title>{title}</Title>
        <ul>
            {elements.map((element, index) => (
                <ListItem key={index}>{element}</ListItem>
            ))}
        </ul>
    </Card>
  )
}

FooterCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FooterCard;