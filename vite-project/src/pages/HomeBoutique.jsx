import React, { useState } from 'react'
import BoutiqueBanner from '../components/banners/BoutiqueBanner'
import Breadcrumb from '../components/navigation/Breadcrumb'
import HomeBoutiqueRowCard from '../components/cards/HomeBoutiqueRowCard'


function HomeBoutique() {
  const [selectedCategory, setSelectedCategory] = useState('tout')
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    console.log('Catégorie sélectionnée:', categoryId)
    // Ici vous pourrez filtrer vos produits selon la catégorie
  }
  
  return (
    <>
      <BoutiqueBanner />
      <Breadcrumb onCategoryChange={handleCategoryChange} />
      <HomeBoutiqueRowCard />
    </>
  )
}

export default HomeBoutique