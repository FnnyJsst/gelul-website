import React, { useState } from 'react'
import Banner from '../components/banners/Banner'
import styled from 'styled-components'
import ProfileCard from '../components/cards/ProfileCard'
import PersonalInfoCard from '../components/cards/PersonalInfoCard'
import OrdersCard from '../components/cards/OrdersCard'
import WishlistCard from '../components/cards/WishlistCard'
import PaymentsCard from '../components/cards/PaymentsCard'

const PageWrapper = styled.div`
  min-height: calc(95vh - 160px);
  padding: 0 0 3rem;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  gap: 2rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

function ProfilePage() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderRightColumnContent = () => {
    switch (activeSection) {
      case 'personal-info':
        return <PersonalInfoCard />;
      case 'orders':
        return <OrdersCard />;
      case 'wishlist':
        return <WishlistCard />;
      case 'payments':
        return <PaymentsCard />;
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
        <Banner title="Profil" />
        <Content>
            <LeftColumn>
                <ProfileCard onSectionChange={handleSectionChange} />
            </LeftColumn>
            <RightColumn>
                {renderRightColumnContent()}
            </RightColumn>
        </Content>
    </PageWrapper>
  )
}

export default ProfilePage