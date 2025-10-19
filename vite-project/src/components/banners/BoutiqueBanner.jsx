import React from 'react'
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

const Title = styled.h1`
  color: ${colors.white};
  font-weight: normal;
  font-size: ${fontSizes.largeTitle};
  width: 200px;
  z-index: 2;
`;

function BoutiqueBanner() {
  return (
    <BannerDiv>
      <Title>Boutique</Title>

      <Overlay />
    </BannerDiv>
  )
}

export default BoutiqueBanner