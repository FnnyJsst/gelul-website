import React from 'react'
import Banner from '../components/banners/Banner'
import TotalCard from '../components/cards/totalCard'
import CartItemsCard from '../components/cards/CartItemsCard'
import styled from 'styled-components'

const CartItemsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem;
`

function Cart() {
    return (
        <>
            <Banner title="Panier" />
            <CartItemsContainer>
              <CartItemsCard />
              <TotalCard />
            </CartItemsContainer>
        </>
    )
}

export default Cart