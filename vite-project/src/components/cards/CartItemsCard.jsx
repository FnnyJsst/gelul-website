import React from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'

const CartItemsCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: ${colors.lightGray};
`

function CartItemsCard() {
    return (
        <div>
            <CartItemsCardContainer>
                {/* <CartItemsCardTitle></CartItemsCardTitle> */}
            </CartItemsCardContainer>
        </div>
    )
}

export default CartItemsCard