import React from 'react'
import styled from 'styled-components'
import HomeBoutiqueCard from './HomeBoutiqueCard'

const Container = styled.div`
  display: flex;
  gap: 3rem;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`

function HomeBoutiqueRowCard({ products = [] }) {
    // Si aucun produit n'est fourni, utiliser des exemples par défaut
    const defaultProducts = [
        { id: 1, title: "Banc Boiban", price: "390€", image: "src/assets/images/banc2.jpg" },
        { id: 2, title: "Pot de fleur Vinyle", price: "39€", image: "src/assets/images/pot.jpg" },
        { id: 3, title: "Tabouret Sertium", price: "190€", image: "src/assets/images/wooden-stool.jpg" },
    ]
    
    const displayProducts = products.length > 0 ? products : defaultProducts
    
    return (
        <Container>
            {displayProducts.map(product => (
                <HomeBoutiqueCard 
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.name || product.title}
                    price={typeof product.price === 'string' ? product.price : `${product.price}€`}
                />
            ))}
        </Container>
    )
}

export default HomeBoutiqueRowCard