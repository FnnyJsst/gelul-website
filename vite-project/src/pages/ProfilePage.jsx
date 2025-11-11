import React from 'react'
import Banner from '../components/banners/Banner'
import styled from 'styled-components'

const PageWrapper = styled.div`
  min-height: calc(95vh - 160px);
  padding: 0 0 3rem;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function ProfilePage() {
  return (
    <PageWrapper>
        <Banner title="Profil" />
    </PageWrapper>
  )
}

export default ProfilePage