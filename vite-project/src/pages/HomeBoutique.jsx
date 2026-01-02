import React from 'react'
import HomeBoutiqueRowCard from '../components/cards/HomeBoutiqueRowCard'
import LargeButton from '../components/buttons/LargeButton'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4vh;
`

function HomeBoutique() {
  return (
    <>
      <HomeBoutiqueRowCard />
      <ButtonWrapper>
        <LargeButton text="Découvrir tous les produits" href="/boutique" backgroundColor="#000" color="white" />
      </ButtonWrapper>
    </>
  )
}

export default HomeBoutique