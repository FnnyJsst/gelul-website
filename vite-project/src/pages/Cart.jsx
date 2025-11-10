import React from 'react'
import Banner from '../components/banners/Banner'
import TotalCard from '../components/cards/totalCard'
import CartItemsCard from '../components/cards/CartItemsCard'
import styled from 'styled-components'
import { fontSizes, colors } from '../constants/style'

const PageWrapper = styled.main`
  min-height: calc(95vh - 160px);
  padding: 0 0 3rem;
  display: flex;
  flex-direction: column;
`

const CartItemsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding: 4rem;
`

const Meta = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.gray};
`
function Cart() {
    return (
        <PageWrapper>
            <Banner title="Panier" />
            <CartItemsContainer>
              <CartItemsCard />
              <TotalCard />
            </CartItemsContainer>
        </PageWrapper>
    )
}

export default Cart