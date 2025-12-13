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

function HomeBoutiqueRowCard() {
    // Exemple de données 
    const products = [
        { id: 1, title: "Banc Boiban", price: "390€", image: "src/assets/images/banc2.jpg" },
        { id: 2, title: "Pot de fleur Vinyle", price: "39€", image: "src/assets/images/pot.jpg" },
        { id: 3, title: "Tabouret Sertium", price: "190€", image: "src/assets/images/wooden-stool.jpg" },
    ]
    
    return (
        <Container>
            {products.map(product => (
                <HomeBoutiqueCard 
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                />
            ))}
        </Container>
    )
}

export default HomeBoutiqueRowCard