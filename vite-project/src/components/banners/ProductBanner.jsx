import React from 'react'
import { useNavigate } from 'react-router-dom'
import { fontSizes } from '../../constants/style'
import { colors } from '../../constants/style'
import styled from 'styled-components'

const BannerDiv = styled.div`
  position: relative;
  height: 10vh;
  width: 100%;
  padding-left: 10vh;
  background-image: url("${new URL('../../assets/images/blue-plate.jpeg', import.meta.url).href}");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 2;
`;

const BreadcrumbLink = styled.button`
  background: none;
  border: none;
  color: ${colors.white};
  font-size: ${fontSizes.large};
  text-decoration: none;
  transition: opacity 0.3s ease;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }
`;

const Separator = styled.span`
  color: ${colors.white};
  font-size: ${fontSizes.large};
`;

function ProductBanner() {
  const navigate = useNavigate()

  const handleBoutiqueClick = () => {
    navigate('/boutique')
  }

  return (
    <BannerDiv>
      <BreadcrumbContainer>
        <BreadcrumbLink onClick={handleBoutiqueClick}>Boutique</BreadcrumbLink>
        <Separator>/</Separator>
        <BreadcrumbLink>Produit</BreadcrumbLink>
      </BreadcrumbContainer>
      <Overlay />
    </BannerDiv>
  )
}

export default ProductBanner