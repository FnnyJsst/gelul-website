import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'
import homedelivery from '../../assets/images/icons/home-outline.png'
import relais from '../../assets/images/icons/truck-outline.png'
import atelier from '../../assets/images/icons/shopping-bag-outline.png'

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
  border: 2px solid ${({ $selected }) => ($selected ? colors.black : 'transparent')};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${colors.gray};
  }
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


function DeliveryCard({ options, selectedDelivery, onSelectDelivery }) {
  const iconByValue = {
    'colissimo-standard': homedelivery,
    'point-relais': relais,
    atelier
  }

  const handleSelect = (value) => {
    if (value !== selectedDelivery) {
      onSelectDelivery?.(value)
    }
  }

  return (
    <CardContainer>
        <DeliveryTitle>Mode de livraison</DeliveryTitle>
        <DeliveryOptions>
            <DeliveryOptionList>
                {options.map(({ value, label, description, icon }) => {
                  const isSelected = value === selectedDelivery
                  const resolvedIcon = icon ?? iconByValue[value]

                  return (
                    <DeliveryOptionItem
                      key={value}
                      $selected={isSelected}
                      onClick={() => handleSelect(value)}
                    >
                      <DeliveryOptionRadio
                        type="radio"
                        name="delivery-option"
                        value={value}
                        checked={isSelected}
                        onChange={() => handleSelect(value)}
                        aria-label={label}
                      />
                      {resolvedIcon && <DeliveryIcon src={resolvedIcon} alt="" aria-hidden="true" />}
                      <DeliveryOptionContent>
                        <DeliveryOptionTitle>{label}</DeliveryOptionTitle>
                        {description && (
                          <DeliveryOptionDescription>{description}</DeliveryOptionDescription>
                        )}
                      </DeliveryOptionContent>
                    </DeliveryOptionItem>
                  )
                })}
            </DeliveryOptionList>
        </DeliveryOptions>
    </CardContainer>
  )
}

DeliveryCard.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      icon: PropTypes.string
    })
  ),
  selectedDelivery: PropTypes.string,
  onSelectDelivery: PropTypes.func
}

DeliveryCard.defaultProps = {
  options: [],
  selectedDelivery: null,
  onSelectDelivery: undefined
}

export default DeliveryCard