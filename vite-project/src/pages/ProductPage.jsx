import React, { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductBanner from '../components/banners/ProductBanner'
import QuantityCard from '../components/cards/QuantityCard'
import ColorSelector from '../components/ColorSelector'
import Breadcrumb from '../components/Breadcrumb'
import styled from 'styled-components'
import { fontSizes, colors } from '../constants/style'
import ShippingCard from '../components/cards/ShippingCard'
import defaultImage from '../assets/images/banc2.jpg'
import { productAPI } from '../services/api'


const ContentContainer = styled.div`
  min-height: 50vh;
  padding: 3.5rem;
  background-color: #f8f8f8;
`

const BreadcrumbWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3.5rem;
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

function ProductPage({
  name: propName,
  price: propPrice,
  description: propDescription,
  image: propImage
}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const productId = useMemo(() => id ?? 'produit-demo', [id])

  useEffect(() => {
    if (id) {
      loadProduct()
    } else {
      setLoading(false)
    }
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await productAPI.getById(id)
      setProduct(data)
      setError(null)
    } catch (err) {
      console.error('Erreur lors du chargement du produit:', err)
      setError('Produit non trouvé')
    } finally {
      setLoading(false)
    }
  }

  // Utiliser les données du produit chargé ou les props par défaut
  const name = product?.name || propName || 'Nom du produit'
  const price = product?.price || propPrice || '100€'
  const description = product?.description || propDescription || 'Ceci est une description du produit'
  const image = product?.image || propImage || defaultImage

  // Construire le breadcrumb
  const breadcrumbItems = [
    {
      label: 'Boutique',
      onClick: () => navigate('/boutique')
    }
  ]

  if (product?.category) {
    breadcrumbItems.push({
      label: product.category.name,
      onClick: () => navigate(`/boutique?category=${product.category.slug}`)
    })
  }

  breadcrumbItems.push({
    label: name
  })

  if (loading) {
    return (
      <>
        <ProductBanner />
        <ContentContainer>
          <p style={{ textAlign: 'center', padding: '3rem' }}>Chargement du produit...</p>
        </ContentContainer>
      </>
    )
  }

  if (error) {
    return (
      <>
        <ProductBanner />
        <ContentContainer>
          <p style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>{error}</p>
        </ContentContainer>
      </>
    )
  }

  return (
    <>
      <ProductBanner />
      <ContentContainer>
        <BreadcrumbWrapper>
          <Breadcrumb items={breadcrumbItems} showHome={true} />
        </BreadcrumbWrapper>
        
        <ProductDetails>
          <ProductImage src={image} alt={name} />
          <ProductInfo>
            <ProductName>{name}</ProductName>
            <ProductPrice>{typeof price === 'string' ? price : `${price}€`}</ProductPrice>
            <ProductDescription>{description}</ProductDescription>
            <ColorSelector onChange={setSelectedColor} />
            <QuantityCard
              productId={productId}
              name={name}
              price={price}
              selectedColor={selectedColor}
              image={image}
            />
            <ShippingCard />
          </ProductInfo>
        </ProductDetails>
      </ContentContainer>
    </>
  )
}

export default ProductPage