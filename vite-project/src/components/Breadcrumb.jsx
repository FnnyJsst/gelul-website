import React from 'react'
import styled from 'styled-components'
import { colors, fontSizes } from '../constants/style'
import bluePlate from '../assets/images/blue-plate.jpeg'

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  flex-wrap: wrap;
  position: relative;
  height: 10vh;
  width: 100%;
  padding-left: 10vh;
  background-image: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'none'};
  background-color: ${props => props.$backgroundColor || 'transparent'};
  background-size: cover;
  background-position: center;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: ${props => props.$show ? 'block' : 'none'};
  z-index: 1;
`;

const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.$textColor || colors.white};
  position: relative;
  z-index: 2;
`

const BreadcrumbLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.medium};
  font-weight: 500;
  padding: 0;
  transition: color 0.2s ease;
  font-family: inherit;
  color: ${props => props.$textColor || colors.white};
  
  &:hover {
    text-decoration: underline;
  }
  
  &:focus {
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const BreadcrumbCurrent = styled.span`
  font-weight: 600;
`

const Separator = styled.span`
  font-weight: bold;
  user-select: none;
  position: relative;
  z-index: 2;
  color: ${colors.white};
`

function Breadcrumb({ items = [], backgroundImage = bluePlate, backgroundColor, textColor, showOverlay = true }) {

  if (items.length === 0) {
    return null
  }


  return (
    <BreadcrumbContainer 
      aria-label="Fil d'Ariane"
      $backgroundImage={backgroundImage}
      $backgroundColor={backgroundColor}
    >
      <Overlay $show={showOverlay} />

      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <React.Fragment key={index}>
            <BreadcrumbItem $textColor={textColor}>
              {isLast ? (
                <BreadcrumbCurrent aria-current="page">
                  {item.label}
                </BreadcrumbCurrent>
              ) : (
                <BreadcrumbLink
                  onClick={item.onClick}
                  disabled={!item.onClick}
                  $textColor={textColor}
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <Separator>›</Separator>}
          </React.Fragment>
        )
      })}
    </BreadcrumbContainer>
  )
}

export default Breadcrumb

