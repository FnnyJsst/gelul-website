import React, { useState, useEffect } from 'react'
import HomeBoutiqueRowCard from '../components/cards/HomeBoutiqueRowCard'
import CategoryFilter from '../components/CategoryFilter'
import Breadcrumb from '../components/Breadcrumb'
import styled from 'styled-components'
import { productAPI, categoryAPI } from '../services/api'

const Container = styled.div`
  margin: 0 auto;
`

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  padding: 3rem;
`

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #e74c3c;
  padding: 2rem;
  background: #fadbd8;
  border-radius: 8px;
`

const NoProductsMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #7f8c8d;
  padding: 3rem;
`

function HomeBoutique() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProducts()
    if (selectedCategory) {
      loadCategoryName()
    } else {
      setSelectedCategoryName(null)
    }
  }, [selectedCategory])

  const loadCategoryName = async () => {
    if (!selectedCategory) return
    
    try {
      const category = await categoryAPI.getBySlug(selectedCategory)
      setSelectedCategoryName(category.name)
    } catch (err) {
      console.error('Erreur lors du chargement de la catégorie:', err)
    }
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productAPI.getAll({
        category: selectedCategory,
        limit: 50 // Augmentez selon vos besoins
      })
      
      // Si l'API retourne un objet avec items, sinon utiliser directement data
      const productList = data.items || data['hydra:member'] || data
      setProducts(productList)
      setError(null)
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err)
      setError('Impossible de charger les produits')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug)
  }

  // Construire les éléments du breadcrumb
  const breadcrumbItems = [
    {
      label: 'Boutique',
      onClick: () => handleCategoryChange(null)
    }
  ]

  if (selectedCategoryName) {
    breadcrumbItems.push({
      label: selectedCategoryName
    })
  } else {
    breadcrumbItems.push({
      label: 'Tous les produits'
    })
  }

  return (
    <Container>
        <Breadcrumb items={breadcrumbItems}/>
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          showProductCount={true}
        />

        {loading && <LoadingMessage>Chargement des produits...</LoadingMessage>}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {!loading && !error && products.length === 0 && (
          <NoProductsMessage>
            Aucun produit trouvé{selectedCategory ? ' dans cette catégorie' : ''}.
          </NoProductsMessage>
        )}
        
        {!loading && !error && products.length > 0 && (
          <HomeBoutiqueRowCard products={products} />
        )}
    </Container>
  )
}

export default HomeBoutique