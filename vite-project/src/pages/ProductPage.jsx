import React from 'react'
import { useParams } from 'react-router-dom'
import ProductBanner from '../components/banners/ProductBanner'
import QuantityCard from '../components/cards/QuantityCard'
import ColorSelector from '../components/ColorSelector'
import styled from 'styled-components'
import { fontSizes, colors } from '../constants/style'
import ShippingCard from '../components/cards/ShippingCard'

const ContentContainer = styled.div`
  min-height: 50vh;
  padding: 3.5rem;
  background-color: #f8f8f8;
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6rem;
`;

const ProductImage = styled.img`
  width: 70vh;
  height: 60vh;
  object-fit: cover;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

const ProductName = styled.h1`
  font-size: ${fontSizes.xlarge};
  font-weight: 400;
`;

const ProductPrice = styled.h2`
  font-size: ${fontSizes.large};
  font-weight: 300;
  font-family: 'DM Mono', monospace;
  color: ${colors.gray};
  letter-spacing: 0.05em;
`;

const ProductDescription = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
`;

function ProductPage({name = "Nom du produit", price = "100€", description = "Ceci est une description du produit", image = "src/assets/images/banc2.jpg"}) {
  const { id } = useParams()

  return (
    <>
      <ProductBanner />
      <ContentContainer>
        <ProductDetails>
            <ProductImage src={`${new URL('../assets/images/banc2.jpg', import.meta.url).href}`} />
            <ProductInfo>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
                <ProductDescription>{description}</ProductDescription>
                <ColorSelector />
                <QuantityCard />
                <ShippingCard />
            </ProductInfo>
        </ProductDetails>
      </ContentContainer>
    </>
  )
}

export default ProductPage