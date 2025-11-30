import React from 'react'
import styled from 'styled-components'
import { fontSizes } from '../../constants/style'
import { colors } from '../../constants/style'

const ActionCardButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 0.8rem;
`
const ActionCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
`

const ActionCardIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ActionCardButtonText = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
`
function ActionCardButton({ icon, text }) {
    return (
        <>
            <ActionCardButtonContainer>
                <ActionCardIcon>
                    {icon && <ActionCardIconImage src={icon} alt={text || ''} />}
                </ActionCardIcon>
                <ActionCardButtonText>{text}</ActionCardButtonText>
            </ActionCardButtonContainer>
        </>
    )
}

export default ActionCardButton