import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 250px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`

const CategoryName = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`

const CategoryDescription = styled.p`
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
  line-height: 1.4;
`

const ProductCount = styled.span`
  display: inline-block;
  background: #e8f4f8;
  color: #2980b9;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`

function CategoryCard({ category, onClick }) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (onClick) {
      onClick(category)
    } else {
      // Navigation par défaut vers la boutique filtrée par catégorie
      navigate(`/boutique?category=${category.slug}`)
    }
  }

  return (
    <CategoryCard onClick={handleClick}>
      <CategoryName>{category.name}</CategoryName>
      {category.description && (
        <CategoryDescription>{category.description}</CategoryDescription>
      )}
      <ProductCount>
        {category.productCount || 0} {category.productCount > 1 ? 'produits' : 'produit'}
      </ProductCount>
    </CategoryCard>
  )
}

export default CategoryCard

