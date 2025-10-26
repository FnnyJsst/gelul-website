import React, { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
`

const HeartIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${props => props.$isFavorite ? 'black' : 'transparent'};
  stroke: black;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: fill 0.3s ease;
`

function FavouriteButton() {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Button onClick={handleClick}>
            <HeartIcon 
                $isFavorite={isFavorite}
                viewBox="0 0 24 24"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </HeartIcon>
        </Button>
    )
}

export default FavouriteButton

