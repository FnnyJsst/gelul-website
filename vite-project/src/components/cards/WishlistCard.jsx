import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import HomeBoutiqueCard from './HomeBoutiqueCard'

const Container = styled.div`
  display: flex;
  gap: 3rem;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${colors.gray};
  font-size: ${fontSizes.medium};
  width: 100%;
`

function WishlistCard() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Remplacer par un appel API réel
    // Simuler un chargement
    setTimeout(() => {
      // Données d'exemple - format adapté pour HomeBoutiqueCard
      setWishlistItems([
        {
          id: 1,
          title: 'Produit 1',
          price: '29.99€',
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          title: 'Produit 2',
          price: '49.99€',
          image: 'https://via.placeholder.com/150'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleRemove = (itemId) => {
    // TODO: Implémenter la suppression via API
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  if (loading) {
    return (
      <Container>
        <EmptyState>Chargement...</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      {wishlistItems.length === 0 ? (
        <EmptyState>Votre liste de favoris est vide.</EmptyState>
      ) : (
        wishlistItems.map(product => (
          <HomeBoutiqueCard 
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            onRemove={handleRemove}
          />
        ))
      )}
    </Container>
  )
}

export default WishlistCard

