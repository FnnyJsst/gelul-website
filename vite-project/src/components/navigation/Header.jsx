import { useState } from "react";
import styled from "styled-components";
import { IoMenuOutline, IoSearchOutline, IoPersonOutline, IoHeartOutline, IoCartOutline } from "react-icons/io5";
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
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;`

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Logo = styled.img`
  height: 3.5rem;
`;


function Header() {
  const [inputSearch, setInputSearch] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function makesInputSearchAppears() {
    setInputSearch(true);
  }

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <IconHeader 
            Icon={IoMenuOutline} 
            iconWidth={'2.5rem'} 
            iconHeight={'2.5rem'}
            onClick={toggleSidebar}
          />
          <Logo src={logo} />
        </LeftSection>
      <RightSection>
        {inputSearch == true ? 
        <InputSearch />
        : ""}
        <IconHeader Icon={IoSearchOutline} onClick={makesInputSearchAppears} />
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