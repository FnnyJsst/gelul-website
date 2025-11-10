import React, { useContext } from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import { CartContext } from '../../context/CartContext'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color:rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  width: 450px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  margin-right: 2rem;
`

const CardTitle = styled.h1`
  font-size: ${fontSizes.large};
  font-weight: 500;
`

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`

const ItemRow = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
`

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ItemName = styled.span`
  font-size: ${fontSizes.medium};
  font-weight: 500;
`

const ItemColor = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
`

const ItemPrice = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
  color: ${colors.gray};    
`

const ItemQuantity = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
`

const SubtotalCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
`

const SubtotalTitle = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
`

const SubtotalAmount = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
  color: ${colors.gray};
`

const TotalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DeliveryFee = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
`

const DeliveryFeeAmount = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
  color: ${colors.gray};
`

const TotalTitle = styled.span`
  font-size: ${fontSizes.medium};
  font-weight: 500;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
`

const TotalAmount = styled.span`
  font-size: ${fontSizes.medium};
  font-weight: 500;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;

`
function SummaryCard() {
    const { cartItems, cartTotal } = useContext(CartContext)
    console.log(cartTotal)
    return (
        <CardContainer>
            <CardTitle>Résumé</CardTitle>
            {cartItems.map((item) => (  
                <ItemList key={item.id}>
                    <ItemRow>
                        <ItemImage src={item.image} alt={item.name} />
                        <ItemDetails>
                            <ItemName>{item.name}</ItemName>
                            <ItemColor>Couleur : {item.color.label}</ItemColor>
                            <ItemQuantity>Quantité : {item.quantity}</ItemQuantity>
                            <ItemPrice>{(parseFloat(item.price) * item.quantity).toFixed(2)}€</ItemPrice>
                        </ItemDetails>
                    </ItemRow>
                </ItemList>
            ))}
            <SubtotalCard>
                <TotalRow>
                    <SubtotalTitle>Sous-total</SubtotalTitle>
                    <SubtotalAmount>{cartTotal.toFixed(2)}€</SubtotalAmount>
                </TotalRow>
                <TotalRow>
                    <DeliveryFee>Frais de livraison</DeliveryFee>
                    <DeliveryFeeAmount>10€</DeliveryFeeAmount>
                </TotalRow>
                <TotalRow>
                    <TotalTitle>TOTAL</TotalTitle>
                    <TotalAmount>{cartTotal.toFixed(2)}€</TotalAmount>
                </TotalRow>
            </SubtotalCard>
        </CardContainer>
    )
}

export default SummaryCard