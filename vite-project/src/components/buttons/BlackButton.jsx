import React from 'react'
import styled from 'styled-components'
import { fontSizes } from '../../constants/style'

const Button = styled.button`
  padding: 1em;
  border-radius: 10px;
  border: none;
  background-color: black;
  color: white;
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