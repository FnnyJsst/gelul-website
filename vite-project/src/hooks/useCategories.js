import { useState, useEffect, useCallback } from 'react'
import { categoryAPI } from '../services/api'

/**
 * Hook personnalisé pour gérer les catégories
 * 
 * @param {boolean} withCount - Inclure le nombre de produits
 * @returns {Object} { categories, loading, error, refetch }
 * 
 * Exemple d'utilisation :
 * 
 * const { categories, loading, error } = useCategories(true)
 * 
 * if (loading) return <div>Chargement...</div>
 * if (error) return <div>Erreur: {error}</div>
 * 
 * return categories.map(cat => <div key={cat.id}>{cat.name}</div>)
 */
export function useCategories(withCount = false) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = withCount 
        ? await categoryAPI.getAllWithCount() 
        : await categoryAPI.getAll()
      
      setCategories(data)
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err)
      setError(err.message || 'Impossible de charger les catégories')
    } finally {
      setLoading(false)
    }
  }, [withCount])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  }
}

/**
 * Hook personnalisé pour récupérer une catégorie par son slug
 * 
 * @param {string} slug - Slug de la catégorie
 * @returns {Object} { category, loading, error, refetch }
 * 
 * Exemple d'utilisation :
 * 
 * const { category, loading, error } = useCategory('mobilier')
 */
export function useCategory(slug) {
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategory = useCallback(async () => {
    if (!slug) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const data = await categoryAPI.getBySlug(slug)
      setCategory(data)
    } catch (err) {
      console.error('Erreur lors du chargement de la catégorie:', err)
      setError(err.message || 'Impossible de charger la catégorie')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchCategory()
  }, [fetchCategory])

  return {
    category,
    loading,
    error,
    refetch: fetchCategory
  }
}

export default {
  useCategories,
  useCategory
}

