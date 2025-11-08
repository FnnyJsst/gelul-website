import React, { useState } from 'react'
import Banner from '../components/banners/Banner'
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
      <Banner Title="Boutique" />
      <Breadcrumb onCategoryChange={handleCategoryChange} />
      <HomeBoutiqueRowCard />
    </>
  )
}

export default HomeBoutique