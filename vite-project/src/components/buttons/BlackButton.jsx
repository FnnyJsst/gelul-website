import React from 'react'
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



const ButtonText = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
`
function BlackButton() {
    return (
        <Button>
            <ButtonText>Ajouter au panier</ButtonText>
        </Button>
    )
}

export default BlackButton