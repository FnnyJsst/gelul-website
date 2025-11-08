import React from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import truckOutline from '../../assets/images/truck-outline.png'
const ShippingContainer = styled.div`
  margin-top: 1rem;
`

const Container = styled.div`
  background-color: white;
  width: 22.5rem;
  height: 4rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 10px;
`

const StockStatus = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
  color: ${colors.green};
  margin-bottom: 0.5rem;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ShippingTitle = styled.h1`
  font-size: ${fontSizes.small};
  font-weight: 500;
`
const ShippingIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`
const ShippingDescription = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
`
const ShippingStatus = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
  color: ${colors.green};
`
const ShippingStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`
function ShippingCard({stockStatus = "En stock, préparation et expédition en 5 jours ouvrés", shippingStatus = " Disponible ",shippingDescription = "à partir de 25€"}) {
    
    return (
        <ShippingContainer>
            <StockStatus>{stockStatus}</StockStatus>
            <Container>
                <TitleContainer>
                  <ShippingIcon src={truckOutline} />
                  <ShippingTitle>Livraison à domicile ou en point relais</ShippingTitle>
                </TitleContainer>
                <ShippingStatusContainer>  
                  <ShippingStatus>{shippingStatus}</ShippingStatus>
                  <ShippingDescription>{shippingDescription}</ShippingDescription>
                </ShippingStatusContainer>
            </Container>
        </ShippingContainer>
    )
}

export default ShippingCard