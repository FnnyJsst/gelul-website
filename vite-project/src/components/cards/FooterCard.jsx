import styled from "styled-components";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`

function FooterCard ({title, elements}) {
  return (
    <Card>
        <Title>{title}</Title>
        <StyledList>
            {elements.map((element, index) => {
              // Si l'élément est un objet avec text et to, créer un lien
              if (typeof element === 'object' && element.text && element.to) {
                return (
                  <ListItem key={index}>
                    <StyledLink to={element.to}>{element.text}</StyledLink>
                  </ListItem>
                );
              }
              // Sinon, afficher le texte simple (compatibilité avec l'ancien format)
              return (
                <ListItem key={index}>{typeof element === 'string' ? element : element.text || element}</ListItem>
              );
            })}
        </StyledList>
    </Card>
  )
}

FooterCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FooterCard;