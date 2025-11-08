import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import BlackButton from '../buttons/BlackButton'
import FavouriteButton from '../buttons/FavouriteButton'
import { CartContext } from '../../context/CartContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  
`

const QuantityTitle = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 0.4rem;
`

const QuantityInput = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  text-align: center;
  font-size: ${fontSizes.large};
  
  
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const CartFeedback = styled.p`
  font-size: ${fontSizes.small};
  color: ${colors.green};
`

const PriceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const MetaLine = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.gray};
`

function QuantityCard({ productId, name, price, selectedColor }) {
  const { addToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
  const [showFeedback, setShowFeedback] = useState(false)
  const feedbackTimeoutRef = useRef(null)

  const safeProductId = productId ?? 'produit-inconnu'

  const variantKey = useMemo(() => {
    const colorKey = selectedColor?.value ?? 'unicouleur'
    return `${safeProductId}-${colorKey}`
  }, [safeProductId, selectedColor])

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1))
  }

  const handleIncrease = () => {
    setQuantity((current) => Math.min(100, current + 1))
  }

  const handleQuantityChange = (event) => {
    const value = Number.parseInt(event.target.value, 10)
    if (Number.isNaN(value)) {
      return
    }

    const clampedValue = Math.min(100, Math.max(1, value))
    setQuantity(clampedValue)
  }

  const handleAddToCart = () => {
    addToCart({
      id: safeProductId,
      name,
      price,
      quantity,
      color: selectedColor,
      variantKey
    })

    setShowFeedback(true)
    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current)
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setShowFeedback(false)
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Container>
      <QuantityTitle>Quantité</QuantityTitle>
      <PriceDetails>
        <MetaLine>{`Prix unitaire : ${price}`}</MetaLine>
        {selectedColor?.label && <MetaLine>{`Couleur sélectionnée : ${selectedColor.label}`}</MetaLine>}
      </PriceDetails>
      <ButtonContainer>
        <InputContainer>
          <QuantityButton onClick={handleDecrease} aria-label="Diminuer la quantité">
            -
          </QuantityButton>
          <QuantityInput
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={handleQuantityChange}
            aria-label="Quantité souhaitée"
          />
          <QuantityButton onClick={handleIncrease} aria-label="Augmenter la quantité">
            +
          </QuantityButton>
        </InputContainer>
        <BlackButton onClick={handleAddToCart}>Ajouter au panier</BlackButton>
        <FavouriteButton />
      </ButtonContainer>
      {showFeedback && <CartFeedback>Produit ajouté au panier</CartFeedback>}
    </Container>
  )
}

QuantityCard.propTypes = {
  productId: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedColor: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    hex: PropTypes.string
  })
}

QuantityCard.defaultProps = {
  productId: 'produit-inconnu',
  name: 'Produit',
  price: 'Prix non disponible',
  selectedColor: null
}

export default QuantityCard