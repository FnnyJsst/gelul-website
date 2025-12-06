import React from 'react'
import styled from 'styled-components'
import { fontSizes } from '../../constants/style'
import { colors } from '../../constants/style'
import ActionCardButton from '../buttons/ActionCardButton'
import shoppingBagOutline from '../../assets/images/icons/shopping-bag-outline.png'
import heartOutline from '../../assets/images/icons/heart-outline.png'
import infoOutline from '../../assets/images/icons/information-outline.png'
import paymentOutline from '../../assets/images/icons/payment-outline.png'


const ActionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  width: 100%;
`

function ActionCard({ onSectionChange }) {
    return (
        <ActionCardContainer>   
            <ActionCardButton 
                icon={infoOutline} 
                text="Informations personnelles" 
                onClick={() => onSectionChange && onSectionChange('personal-info')}
            />
            <ActionCardButton 
                icon={shoppingBagOutline} 
                text="Mes commandes" 
                onClick={() => onSectionChange && onSectionChange('orders')}
            />
            <ActionCardButton 
                icon={heartOutline} 
                text="Mes favoris" 
                onClick={() => onSectionChange && onSectionChange('wishlist')}
            />
            <ActionCardButton 
                icon={paymentOutline} 
                text="Mes paiements" 
                onClick={() => onSectionChange && onSectionChange('payments')}
            />
        </ActionCardContainer>
    )
}

export default ActionCard