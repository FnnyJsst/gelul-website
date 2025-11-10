import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'

const PaymentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  min-width: 680px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  transition: opacity 0.2s ease;
`

const PaymentCardTitle = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
  padding-left: 1rem;
`

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`

const PaymentOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PaymentOptionItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  list-style: none;
  background-color: ${colors.white};
  border-radius: 16px;
  padding: 1rem;
  padding-left: 2rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  align-items: center;
`

const PaymentOptionTitle = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
`

const PaymentOptionRadio = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${colors.gray};
`

const PaymentOptionIcon = styled.img`
  width: 25px;
  height: 25px;
`

const PaymentOptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

function PaymentCard({ disabled }) {
    return (
        <PaymentCardContainer $disabled={disabled} aria-disabled={disabled}>
            <PaymentCardTitle>Paiement</PaymentCardTitle>
            <PaymentOptions>
                <PaymentOptionList>
                    <PaymentOptionItem>
                        <PaymentOptionRadio />
                        <PaymentOptionIcon  />
                        <PaymentOptionContent>
                            <PaymentOptionTitle>Credit Card</PaymentOptionTitle>
                        </PaymentOptionContent>
                    </PaymentOptionItem>
                    <PaymentOptionItem>
                        <PaymentOptionRadio />
                        <PaymentOptionIcon  />
                        <PaymentOptionContent>
                            <PaymentOptionTitle>Virement bancaire</PaymentOptionTitle>
                        </PaymentOptionContent>
                    </PaymentOptionItem>
                    <PaymentOptionItem>
                        <PaymentOptionRadio />
                        <PaymentOptionIcon  />
                        <PaymentOptionContent>
                            <PaymentOptionTitle>Paypal</PaymentOptionTitle>
                        </PaymentOptionContent>
                    </PaymentOptionItem>
                </PaymentOptionList>
            </PaymentOptions>
        </PaymentCardContainer>
    )
}

PaymentCard.propTypes = {
    disabled: PropTypes.bool
}

PaymentCard.defaultProps = {
    disabled: false
}

export default PaymentCard