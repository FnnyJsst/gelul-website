import React, { useState } from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`

const QuantityTitle = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`

const QuantityInput = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  text-align: center;
  font-size: ${fontSizes.large};
  
  
  /* Enlever les flèches du input number */
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const QuantityButton = styled.button`
  width: 20px;
  height: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: ${fontSizes.large};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${colors.gray}20;
  }
  
  &:active {
    background-color: ${colors.gray}40;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

function QuantityCard() {
    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < 100) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <Container>
            <QuantityTitle>Quantité</QuantityTitle>
            <ButtonContainer>
                <InputContainer>
                    <QuantityButton onClick={handleDecrease}>-</QuantityButton>
                    <QuantityInput 
                        type="number" 
                        min="1" 
                        max="100" 
                        value={quantity}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= 100) {
                                setQuantity(value);
                            }
                        }}
                    />
                    <QuantityButton onClick={handleIncrease}>+</QuantityButton>
                </InputContainer>
            </ButtonContainer>
        </Container>
    )
}

export default QuantityCard