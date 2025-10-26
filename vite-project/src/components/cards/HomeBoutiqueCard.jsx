import React from 'react'
import styled from 'styled-components'
import { colors, fontSizes } from '../../constants/style'

const Card = styled.div`
  width: 50vh;
  height: 60vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
`

const Image = styled.img`
  width: 80%;
  height: 60vh;
  object-fit: cover;
  border-radius: 20px;
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
  return (
    <Card>
      <Image src={image} alt={title || "Boutique"} />
      <Title>{title || "Titre"}</Title>
      <Price>{price || "Prix"}</Price>
    </Card>
  )
}

export default HomeBoutiqueCard