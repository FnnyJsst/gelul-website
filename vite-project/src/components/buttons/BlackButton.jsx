import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSizes } from '../../constants/style'

const Button = styled.button`
  padding: 1em;
  border-radius: 10px;
  border: none;
  background-color: black;
  color: white;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;


  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`



const ButtonText = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
`
function BlackButton({ children, onClick, disabled }) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </Button>
  )
}

BlackButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

BlackButton.defaultProps = {
  children: 'Ajouter au panier',
  onClick: undefined,
  disabled: false
}

export default BlackButton