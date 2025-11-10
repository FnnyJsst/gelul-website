import React, { useMemo, useState } from 'react'
import Banner from '../components/banners/Banner'
import DeliveryCard from '../components/cards/DeliveryCard'
import SummaryCard from '../components/cards/SummaryCard'
import PaymentCard from '../components/cards/PaymentCard'
import styled from 'styled-components'


const PageWrapper = styled.main`
  min-height: calc(95vh - 160px);
  padding: 0 0 3rem;
  display: flex;
  flex-direction: column;
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  const [selectedDelivery, setSelectedDelivery] = useState(null)

  const deliveryOptions = useMemo(
    () => [
      {
        value: 'colissimo-standard',
        label: 'Livraison standard Colissimo',
        description: '3-5 jours ouvrés'
      },
      {
        value: 'point-relais',
        label: 'Livraison en point relais',
        description: '3-5 jours ouvrés'
      },
      {
        value: 'atelier',
        label: "Retrait à l'atelier",
        description: '1-2 jours ouvrés'
      }
    ],
    []
  )

  return (
    <PageWrapper>
      <Banner title="Paiement" />
      <CardContainer>
        <LeftColumn>
          <DeliveryCard
            options={deliveryOptions}
            selectedDelivery={selectedDelivery}
            onSelectDelivery={setSelectedDelivery}
          />
          <PaymentCard disabled={!selectedDelivery} />
        </LeftColumn>
        <RightColumn>
          <SummaryCard />
        </RightColumn>
      </CardContainer>
    </PageWrapper>
  )
}

export default Payment