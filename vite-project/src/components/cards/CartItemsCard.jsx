import React, { useContext } from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import { CartContext } from '../../context/CartContext'
import RedBin from '../../assets/images/bin-red.png'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  min-width: 680px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
`

const ItemsList = styled.ul`
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
  justify-content: space-between;
  align-items: center;
`

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  justify-content: space-between;
`

const ItemName = styled.span`
  font-size: ${fontSizes.medium};
  font-weight: 500;
`

const Meta = styled.span`
  font-size: ${fontSizes.small};
`

const ItemTotal = styled.span`
  font-size: ${fontSizes.medium};
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
  color: ${colors.gray};
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

const EmptyState = styled.div`
  text-align: center;
  font-size: ${fontSizes.small};
  color: ${colors.gray};
  padding: 2rem 0;
`

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`

const ItemPrice = styled.span`
  font-size: ${fontSizes.medium};
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
  color: ${colors.gray};
`

const QuantityInput = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  text-align: center;
  font-size: ${fontSizes.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  /* Enlever les flèches du input number */
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const QuantityButton = styled.button`
  width: 20px;
  height: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: ${fontSizes.large};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${colors.gray}20;
  }
  
  &:active {
    background-color: ${colors.gray}40;
  }
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 0.1rem;
  height: 30px;
  width: 60px;
`

function CartItemsCard() {
  const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext)

  const handleRemove = (variantKey) => {
    removeFromCart(variantKey)
  }

  const clampQuantity = (value) => Math.min(100, Math.max(1, value))

  const handleDecrease = (item) => {
    updateCartQuantity(item.variantKey, clampQuantity(item.quantity - 1))
  }

  const handleIncrease = (item) => {
    updateCartQuantity(item.variantKey, clampQuantity(item.quantity + 1))
  }

  const handleQuantityChange = (variantKey, event) => {
    const value = Number.parseInt(event.target.value, 10)
    if (Number.isNaN(value)) {
      return
    }

    updateCartQuantity(variantKey, clampQuantity(value))
  }

  const formatSubtotal = (price, quantity) => {
    if (typeof price === 'number') {
      return `${(price * quantity).toFixed(2)}€`
    }

    const normalized = price.replace(/[^\d,-.]/g, '').replace(',', '.')
    const parsed = Number.parseFloat(normalized)

    if (Number.isNaN(parsed)) {
      return price
    }

    return `${(parsed * quantity).toFixed(2)}€`
  }

  if (!cartItems.length) {
    return (
      <CardContainer>
        <EmptyState>Votre panier est vide pour le moment.</EmptyState>
      </CardContainer>
    )
  }
  
  
  return (
    <CardContainer>
      <ItemsList>
        {cartItems.map((item) => (
          <ItemRow key={item.variantKey}>
            <ItemImage src={item.image} alt={item.name} />

            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              {item.color?.label && <Meta>Couleur : {item.color.label}</Meta>}
              <ItemPrice>{item.price}</ItemPrice>
            </ItemDetails>
            <InputContainer>
              <QuantityButton
                onClick={() => handleDecrease(item)}
                aria-label={`Diminuer la quantité pour ${item.name}`}
              >
                -
              </QuantityButton>
              <QuantityInput
                type="number"
                min="1"
                max="100"
                value={item.quantity}
                onChange={(event) => handleQuantityChange(item.variantKey, event)}
                aria-label={`Quantité souhaitée pour ${item.name}`}
              />
              <QuantityButton
                onClick={() => handleIncrease(item)}
                aria-label={`Augmenter la quantité pour ${item.name}`}
              >
                +
              </QuantityButton>
            </InputContainer>
            <ItemTotal>{formatSubtotal(item.price, item.quantity)}</ItemTotal>
            <RemoveButton type="button" onClick={() => handleRemove(item.variantKey)}>
              <img src={RedBin} alt="Retirer" width={25} height={25} />
            </RemoveButton>
          </ItemRow>
        ))}
      </ItemsList>
    </CardContainer>
  )
}

export default CartItemsCard