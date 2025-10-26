import React, { useState } from 'react'
import styled from 'styled-components'
import { colors, fontSizes } from '../../constants/style'
import { FaHeart } from 'react-icons/fa'

const Card = styled.div`
  width: 50vh;
  height: 60vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  position: relative;
  cursor: pointer;

  &:hover .add-to-cart-button {
    opacity: 1;
  }
`

const ImageContainer = styled.div`
  width: 80%;
  height: 60vh;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const AddToCartButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: white;
  color: black;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: ${fontSizes.small};
  font-weight: 400;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
  white-space: nowrap;

  &:hover {
    background-color: #f0f0f0;
  }
`

const Title = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 600;
  align-self: flex-start;
`

const Price = styled.p`
  font-size: ${fontSizes.medium};
  font-weight: normal;
  color: ${colors.gray};
  font-family: 'DM Mono', monospace;
`

function HomeBoutiqueCard({ image, title, price }) {
  const handleAddToCart = () => {
    console.log('Ajout au panier:', title)
    // Ici vous pourrez implémenter la logique d'ajout au panier
  }

  return (
    <Card>
      <ImageContainer>
        <Image src={image} alt={title || "Boutique"} />
        <AddToCartButton 
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </AddToCartButton>
      </ImageContainer>
      <Title>{title || "Titre"}</Title>
      <Price>{price || "Prix"}</Price>
    </Card>
  )
}

export default HomeBoutiqueCard