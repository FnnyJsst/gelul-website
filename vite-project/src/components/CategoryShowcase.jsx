import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { categoryAPI } from '../../services/api'
import { fontSizes } from '../constants/style'

const Section = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 3rem;
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const CategoryCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    
    &::before {
      transform: scaleX(1);
    }
  }
`

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const CategoryName = styled.h3`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-weight: 600;
`

const CategoryDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const ProductCount = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
`

const ViewAllButton = styled.button`
  display: block;
  margin: 3rem auto 0;
  padding: 1rem 3rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #34495e;
    transform: scale(1.05);
  }
`

const LoadingMessage = styled.p`
  text-align: center;
  font-size: ${fontSizes.small};
  padding: 2rem;
`

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #e74c3c;
  padding: 1.5rem;
  background: #fadbd8;
  border-radius: 8px;
`

// Icônes pour chaque catégorie (vous pouvez utiliser une librairie d'icônes)
const CATEGORY_ICONS = {
  'mobilier': '🪑',
  'objet-de-decoration': '🎨',
  'default': '✨'
}

function CategoryShowcase() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await categoryAPI.getAllWithCount()
      setCategories(data)
      setError(null)
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err)
      setError('Impossible de charger les catégories')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (category) => {
    navigate(`/boutique?category=${category.slug}`)
  }

  const handleViewAllClick = () => {
    navigate('/boutique')
  }

  if (loading) {
    return (
      <Section>
        <Container>
          <LoadingMessage>Chargement des catégories...</LoadingMessage>
        </Container>
      </Section>
    )
  }

  if (error) {
    return (
      <Section>
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </Section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <Section>
      <Container>
        <Title>Explorez nos Catégories</Title>
        <Subtitle>Découvrez notre sélection de mobilier et objets de décoration</Subtitle>
        
        <CategoriesGrid>
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <CategoryIcon>
                {CATEGORY_ICONS[category.slug] || CATEGORY_ICONS['default']}
              </CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
              {category.description && (
                <CategoryDescription>{category.description}</CategoryDescription>
              )}
              <ProductCount>
                {category.productCount || 0} {category.productCount > 1 ? 'produits' : 'produit'}
              </ProductCount>
            </CategoryCard>
          ))}
        </CategoriesGrid>

        <ViewAllButton onClick={handleViewAllClick}>
          Voir toute la boutique
        </ViewAllButton>
      </Container>
    </Section>
  )
}

export default CategoryShowcase

