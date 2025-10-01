import { useState } from "react";
import styled from "styled-components";
import { IoMenuOutline, IoPersonOutline, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { PiBasket } from "react-icons/pi";
import logo from "../../assets/images/logo.png"
import IconHeader from "../buttons/IconHeader"
import InputSearch from "../InputSearch";
import Sidebar from "./Sidebar";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 3rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1rem;`

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`

const Logo = styled.img`
  height: 3rem;
`;


function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <IconHeader 
            Icon={IoMenuOutline} 
            iconWidth={'2rem'} 
            iconHeight={'2rem'}
            onClick={toggleSidebar}
          />
          <Logo src={logo} />
        </LeftSection>
      <RightSection>
        <InputSearch />
        <IconHeader Icon={IoPersonOutline} />
        <IconHeader Icon={IoHeartOutline} />
        <IconHeader Icon={PiBasket} />
      </RightSection>
      </HeaderContainer>
      
      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
    </>
  )
}

export default Header