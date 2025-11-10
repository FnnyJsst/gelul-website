import React from 'react'
import Banner from '../components/banners/Banner'
import DeliveryCard from '../components/cards/DeliveryCard'
import styled from 'styled-components'


const PageWrapper = styled.main`
  min-height: calc(95vh - 160px);
  padding: 0 0 3rem;
  display: flex;
  flex-direction: column;
`

const CardContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding: 4rem;
`
function Payment() {
  return (
    <PageWrapper>
      <Banner title="Paiement" />
      <CardContainer>
        <DeliveryCard />
      </CardContainer>
    </PageWrapper>
  )
}

export default Payment