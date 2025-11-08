import React, { useEffect, useMemo, useState } from 'react'

const CartContext = React.createContext()

const LOCAL_STORAGE_KEY = 'gelul-cart-items'

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Vérifier si le navigateur est défini
    if (typeof window === 'undefined') {
      return []
    }

    try {
      // Récupérer le panier depuis le stockage local
      const savedCart = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.warn('Impossible de récupérer le panier depuis le stockage local', error)
      return []
    }
  })

  const addToCart = (item) => {
    setCartItems((previous) => {
      // Vérifier si l'item existe déjà dans le panier
      const existing = previous.find(
        (cartItem) => cartItem.id === item.id && cartItem.variantKey === item.variantKey
      )

      // Si l'item existe déjà, mettre à jour la quantité
      if (existing) {
        return previous.map((cartItem) =>
          cartItem.id === item.id && cartItem.variantKey === item.variantKey
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      }

      return [...previous, item]
    })
  }

  const removeFromCart = (variantKey) => {
    setCartItems((previous) => previous.filter((cartItem) => cartItem.variantKey !== variantKey))
  }

  const updateCartQuantity = (variantKey, quantity) => {
    setCartItems((previous) =>
      previous.map((cartItem) =>
        cartItem.variantKey === variantKey
          ? { ...cartItem, quantity: Math.max(1, quantity) }
          : cartItem
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(
    () => cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0),
    [cartItems]
  )

  const cartTotal = useMemo(() => {
    const parsePrice = (value) => {
      if (typeof value === 'number') {
        return Number.isNaN(value) ? 0 : value
      }

      if (typeof value === 'string') {
        const normalized = value.replace(/[^\d,-.]/g, '').replace(',', '.')
        const parsed = Number.parseFloat(normalized)
        return Number.isNaN(parsed) ? 0 : parsed
      }

      return 0
    }

    return cartItems.reduce(
      (accumulator, cartItem) => accumulator + parsePrice(cartItem.price) * cartItem.quantity,
      0
    )
  }, [cartItems])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.warn('Impossible de sauvegarder le panier', error)
    }
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }