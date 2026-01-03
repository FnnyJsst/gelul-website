import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { categoryAPI } from '../services/api'
import { colors, fontSizes } from '../constants/style'

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  align-items: center;
`

const FilterButton = styled.button`
  padding: 0.6rem 1.5rem;
  border: none;
  background: ${props => props.active ? colors.black : colors.white};
  color: ${props => props.active ? colors.white : colors.black};
  border-radius: 50px;
  font-size: ${fontSizes.xsmall};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  border: 1px solid ${props => props.active ? colors.black : colors.lightGray};
  
  &:hover {
    background: ${props => props.active ? colors.black : colors.lightGray};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const ProductCountBadge = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  font-size: ${fontSizes.xsmall};
  font-weight: 600;
`

const LoadingMessage = styled.p`
  font-size: ${fontSizes.small};
  padding: 0.5rem;
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: ${fontSizes.small};
  padding: 0.5rem;
`

function CategoryFilter({ selectedCategory, onCategoryChange, showProductCount = true }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = showProductCount 
        ? await categoryAPI.getAllWithCount() 
        : await categoryAPI.getAll()
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
    // Si la même catégorie est cliquée, on désélectionne
    if (selectedCategory === category.slug) {
      onCategoryChange(null)
    } else {
      onCategoryChange(category.slug)
    }
  }

  const handleShowAll = () => {
    onCategoryChange(null)
  }

  if (loading) {
    return (
      <FilterContainer>
        <LoadingMessage>Chargement des catégories...</LoadingMessage>
      </FilterContainer>
    )
  }

  if (error) {
    return (
      <FilterContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </FilterContainer>
    )
  }

  return (
    <FilterContainer>
      <FilterButton 
        active={!selectedCategory} 
        onClick={handleShowAll}
      >
        Tous les produits
        {showProductCount && categories.length > 0 && (
          <ProductCountBadge active={!selectedCategory}>
            {categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0)}
          </ProductCountBadge>
        )}
      </FilterButton>

      {categories.map(category => (
        <FilterButton
          key={category.id}
          active={selectedCategory === category.slug}
          onClick={() => handleCategoryClick(category)}
        >
          {category.name}
          {showProductCount && (
            <ProductCountBadge active={selectedCategory === category.slug}>
              {category.productCount || 0}
            </ProductCountBadge>
          )}
        </FilterButton>
      ))}
    </FilterContainer>
  )
}

export default CategoryFilter

