import React from 'react'
import styled from 'styled-components'
import { fontSizes } from '../../constants/style'

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  min-width: 500px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
`
const ProfileName = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
`
const ProfileEmail = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
`
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`
function ProfileCard() {
    return (
        <ProfileCardContainer>
            <ProfileImage />
            <ProfileName>Mounette</ProfileName>
            <ProfileEmail>mounette@lapin.com</ProfileEmail>
        </ProfileCardContainer>
    )
}

export default ProfileCard