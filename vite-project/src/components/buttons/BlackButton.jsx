import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 1em;
  border-radius: 15px;
  border: none;
  background-color: black;
  color: white;
`

function BlackButton() {
    return (
        <Button>
            <ButtonText>Ajouter au panier</ButtonText>
        </Button>
    )
}

export default BlackButton