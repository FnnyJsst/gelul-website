import React from 'react'
import { useParams } from 'react-router-dom'

function ProductPage() {
  const { id } = useParams()

  return (
    <div>
      <h1>Page Produit #{id}</h1>
      {/* Vous pourrez ajouter ici le contenu de la page produit */}
    </div>
  )
}

export default ProductPage