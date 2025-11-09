import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import BlackButton from '../buttons/BlackButton'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color:rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  width: 450px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  margin-right: 2rem;
`

const Header = styled.h2`
  font-size: ${fontSizes.large};
  font-weight: 500;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Label = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

const Amount = styled.span`
  font-size: ${fontSizes.medium};
  font-family: 'DM Mono', monospace;    
  font-weight: 400;
  letter-spacing: 0.05em;
  color: ${colors.gray};
`

const InfoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${colors.lightGray};
  color: ${colors.gray};
  font-size: 12px;
  font-weight: 600;
`

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid ${colors.lightGray};
  background-color: ${colors.white};
  font-size: ${fontSizes.small};
  color: ${colors.black};
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, ${colors.gray} 50%),
    linear-gradient(135deg, ${colors.gray} 50%, transparent 50%);
  background-position: calc(100% - 24px) calc(50% - 2px), calc(100% - 16px) calc(50% - 2px);
  background-size: 8px 8px, 8px 8px;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border-color: ${colors.gray};
  }
`

const PaymentButton = styled(BlackButton)`
  width: 100%;
  justify-content: center;
  border-radius: 16px;
  padding: 2.5rem;
  height: 4rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`

function TotalCard({ subtotal, currency, deliveryOptions, defaultDelivery, onDeliveryChange, onCheckout }) {
  const [selectedDelivery, setSelectedDelivery] = useState(defaultDelivery)

  const options = useMemo(() => deliveryOptions ?? [], [deliveryOptions])

  const handleSelectChange = (event) => {
    const value = event.target.value
    setSelectedDelivery(value)
    onDeliveryChange(value)
  }

  return (
    <CardContainer>
      <Header>Résumé</Header>
      <Row>
        <Label>Sous-total</Label>
        <Amount>
          {subtotal}
          {currency}
        </Amount>
      </Row>
      <Row>
        <Label>
          Livraison <InfoBadge>i</InfoBadge>
        </Label>
      </Row>
      <Select value={selectedDelivery} onChange={handleSelectChange} aria-label="Mode de livraison">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <PaymentButton onClick={() => onCheckout({ deliveryMethod: selectedDelivery })}>Paiement</PaymentButton>
    </CardContainer>
  )
}

TotalCard.propTypes = {
  subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  deliveryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  defaultDelivery: PropTypes.string,
  onDeliveryChange: PropTypes.func,
  onCheckout: PropTypes.func
}

TotalCard.defaultProps = {
  subtotal: '0',
  currency: '€',
  deliveryOptions: [
    { label: 'Livraison standard Colissimo', value: 'colissimo-standard' },
    { label: 'Retrait atelier', value: 'atelier' }
  ],
  defaultDelivery: 'colissimo-standard',
  onDeliveryChange: () => {},
  onCheckout: () => {}
}

export default TotalCard