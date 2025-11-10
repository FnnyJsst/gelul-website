import React from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import homedelivery from '../../assets/images/home-outline.png'
import relais from '../../assets/images/truck-outline.png'
import atelier from '../../assets/images/shopping-bag-outline.png'

const DeliveryTitle = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
  padding-left: 1rem;
`

const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`
const DeliveryOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const DeliveryOptionItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  list-style: none;
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 1rem;
  padding-left: 2rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  align-items: center;
`
const DeliveryOptionRadio = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${colors.gray};
`
const DeliveryIcon = styled.img`
  width: 25px;
  height: 25px;
`

const DeliveryOptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
const DeliveryOptionTitle = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
`

const DeliveryOptionDescription = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
  color: ${colors.gray};
`

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



function DeliveryCard() {
  return (
    <CardContainer>
        <DeliveryTitle>Mode de livraison</DeliveryTitle>
        <DeliveryOptions>
            <DeliveryOptionList>
                <DeliveryOptionItem>
                    <DeliveryOptionRadio />
                    <DeliveryIcon src={homedelivery} />
                    <DeliveryOptionContent>
                        <DeliveryOptionTitle>Livraison standard Colissimo</DeliveryOptionTitle>
                        <DeliveryOptionDescription>3-5 jours ouvrés</DeliveryOptionDescription>
                    </DeliveryOptionContent>
                </DeliveryOptionItem>
                <DeliveryOptionItem>
                    <DeliveryOptionRadio />
                    <DeliveryIcon src={relais} />
                    <DeliveryOptionContent>
                        <DeliveryOptionTitle>Livraison en point relais</DeliveryOptionTitle>
                        <DeliveryOptionDescription>3-5 jours ouvrés</DeliveryOptionDescription>
                    </DeliveryOptionContent>
                </DeliveryOptionItem>
                <DeliveryOptionItem>
                    <DeliveryOptionRadio />
                    <DeliveryIcon src={atelier} />
                    <DeliveryOptionContent>
                        <DeliveryOptionTitle>Retrait à l'atelier</DeliveryOptionTitle>
                        <DeliveryOptionDescription>1-2 jours ouvrés</DeliveryOptionDescription>
                    </DeliveryOptionContent>
                </DeliveryOptionItem>
            </DeliveryOptionList>
        </DeliveryOptions>
    </CardContainer>
  )
}

export default DeliveryCard