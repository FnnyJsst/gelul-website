import React, { useState } from 'react'
import styled from 'styled-components'
import heartOutline from '../../assets/images/icons/heart-outline.png'

const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  border: none;

  &:hover {
    transform: scale(1.05);
  }
`

const IconWrapper = styled.span`
  position: relative;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const HeartFill = styled.span`
  position: absolute;
  inset: 0;
  background-color: ${({ $isFavorite }) => ($isFavorite ? '#000000' : 'transparent')};
  mask-image: url(${heartOutline});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-image: url(${heartOutline});
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  transition: background-color 0.3s ease;
`

const HeartIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  filter: ${({ $isFavorite }) => ($isFavorite ? 'invert(10%) sepia(78%) saturate(4563%) hue-rotate(335deg) brightness(80%) contrast(104%)' : 'none')};
  transition: filter 0.3s ease;
`

function FavouriteButton() {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleClick = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Button onClick={handleClick} aria-pressed={isFavorite}>
          <IconWrapper>
            <HeartFill $isFavorite={isFavorite} />
            <HeartIcon src={heartOutline} alt="Ajouter aux favoris" $isFavorite={isFavorite} />
          </IconWrapper>
        </Button>
    )
}

export default FavouriteButton

