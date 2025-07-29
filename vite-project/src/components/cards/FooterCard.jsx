import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 10px;
  margin-top: 15px;
  padding-bottom: 10px;
`

const Title = styled.h1`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
  align-self: flex-start;
`

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  width: 100%;
`

const ListItem = styled.li`
  font-size: 15px;
  font-weight: normal;
  list-style: none;
  text-align: left;
  margin-bottom: 5px;
`

function FooterCard ({title, elements}) {
  return (
    <Card>
        <Title>{title}</Title>
        <StyledList>
            {elements.map((element, index) => (
                <ListItem key={index}>{element}</ListItem>
            ))}
        </StyledList>
    </Card>
  )
}

FooterCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FooterCard;