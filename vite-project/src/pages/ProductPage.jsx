import React from 'react'
import { useParams } from 'react-router-dom'
import ProductBanner from '../components/banners/ProductBanner'
import styled from 'styled-components'

const ContentContainer = styled.div`
  min-height: 50vh;
  padding: 5rem;
`

function ProductPage() {
  const { id } = useParams()

  return (
    <>
      <ProductBanner />
      <ContentContainer>
        <img src={product.image} alt={product.name} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button>Ajouter au panier</button>
        <button>Ajouter aux favoris</button>
        <button>Ajouter à la liste de souhaits</button>
        <button>Ajouter à la liste de souhaits</button>
      </ContentContainer>
    </>
  )
}

export default ProductPage