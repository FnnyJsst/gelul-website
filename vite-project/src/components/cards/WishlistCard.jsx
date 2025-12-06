import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  width: 85%;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
`

const CardTitle = styled.h1`
  font-size: ${fontSizes.large};
  font-weight: 500;
`

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`

const WishlistItem = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`

const ItemName = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 500;
  text-align: center;
`

const ItemPrice = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
  color: ${colors.gray};
  text-align: center;
  font-family: 'DM Mono', monospace;
`

const RemoveButton = styled.button`
  padding: 0.5rem;
  background-color: transparent;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  font-size: ${fontSizes.small};
  color: ${colors.gray};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.lightGray};
    color: ${colors.black};
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${colors.gray};
  font-size: ${fontSizes.medium};
`

function WishlistCard() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Remplacer par un appel API réel
    // Simuler un chargement
    setTimeout(() => {
      // Données d'exemple
      setWishlistItems([
        {
          id: 1,
          name: 'Produit 1',
          price: 29.99,
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          name: 'Produit 2',
          price: 49.99,
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
      <CardContainer>
        <CardTitle>Mes favoris</CardTitle>
        <EmptyState>Chargement...</EmptyState>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <CardTitle>Mes favoris</CardTitle>
      {wishlistItems.length === 0 ? (
        <EmptyState>Votre liste de favoris est vide.</EmptyState>
      ) : (
        <WishlistGrid>
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price.toFixed(2)}€</ItemPrice>
              <RemoveButton onClick={() => handleRemove(item.id)}>
                Retirer des favoris
              </RemoveButton>
            </WishlistItem>
          ))}
        </WishlistGrid>
      )}
    </CardContainer>
  )
}

export default WishlistCard

