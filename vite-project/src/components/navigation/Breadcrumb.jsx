import React, { useState } from 'react'
import styled from 'styled-components'
import { fontSizes } from '../../constants/style'

const CategoryContainer = styled.nav`
  padding: 2rem;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
`

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  gap: 3rem;
  margin: 0;
  padding: 0;
`

const CategoryItem = styled.li`
  cursor: pointer;
  font-size: ${fontSizes.medium};
  color: #000000;
  font-weight: ${props => props.$active ? '600' : 'normal'};
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3B3A3A;
    transform: scaleX(${props => props.$active ? '1' : '0'});
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #3B3A3A;
    
    &::after {
      transform: scaleX(1);
    }
  }
`

function Breadcrumb({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState('tout')
  
  const categories = [
    { id: 'tout', label: 'Tout' },
    { id: 'mobilier', label: 'Mobilier' },
    { id: 'decoration', label: 'Décoration' },
    { id: 'peintures', label: 'Peintures' }
  ]
  
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }
  }
  
  return (
    <CategoryContainer>
      <CategoryList>
        {categories.map(category => (
          <CategoryItem 
            key={category.id}
            $active={activeCategory === category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.label}
          </CategoryItem>
        ))}
      </CategoryList>
    </CategoryContainer>
  )
}

export default Breadcrumb