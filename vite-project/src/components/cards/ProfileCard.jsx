import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants/style'
import ActionCard from './ActionCard'
import { fontSizes } from '../../constants/style'

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  min-width: 350px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
`
const ProfileCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ProfileName = styled.h1`
  font-size: ${fontSizes.medium};
  font-weight: 400;
`
const ProfileEmail = styled.p`
  font-size: ${fontSizes.small};
  font-weight: 400;
  color: ${colors.gray};
`
const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${fontSizes.large};
  font-weight: 600;
  margin-bottom: 1rem;
`

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 1rem;
  gap: 0.4rem;
`

const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function ProfileCard({ onSectionChange }) {
    const name = 'Mounette';
    const initials = getInitials(name);
    
    return (
        <ProfileCardContainer>
          <ProfileCardHeader>
            <ProfileImage>{initials}</ProfileImage>
            <ProfileInfoContainer>
                <ProfileName>{name}</ProfileName>
                <ProfileEmail>mounette@lapin.com</ProfileEmail>
            </ProfileInfoContainer>
            </ProfileCardHeader>
            <ActionCard onSectionChange={onSectionChange} />
        </ProfileCardContainer>
    )
}

export default ProfileCard