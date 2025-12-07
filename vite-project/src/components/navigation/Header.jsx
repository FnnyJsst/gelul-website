import { useState } from "react";
import styled from "styled-components";
import { IoMenuOutline, IoPersonOutline, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { PiBasket } from "react-icons/pi";
import logo from "../../assets/images/logo.png"
import IconHeader from "../buttons/IconHeader"
import Sidebar from "./Sidebar";
import { Link, useLocation } from "react-router-dom";

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
  padding: 0 1rem;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`

const MiddleSection = styled.nav`
  display: none;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: 768px) {
    display: flex;
  }
`

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 1rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: color 0.2s;
  position: relative;
  
  &:hover {
    color: rgb(107, 107, 77);
  }
  
  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgb(107, 107, 77);
    }
  `}
`

const DropdownContainer = styled.div`
  position: relative;
`

const DropdownLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 1rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: color 0.2s;
  position: relative;
  cursor: pointer;
  
  &:hover {
    color: rgb(107, 107, 77);
  }
  
  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgb(107, 107, 77);
    }
  `}
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  min-width: 180px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  opacity: ${props => props.$isVisible ? '1' : '0'};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(-10px)'};
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  z-index: 1000;
`

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #000;
  font-size: 0.95rem;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: rgb(107, 107, 77);
  }
`

const MenuButton = styled.div`
  display: flex;
  
  @media (min-width: 768px) {
    display: none;
  }
`

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
  const [boutiqueDropdownVisible, setBoutiqueDropdownVisible] = useState(false);
  const location = useLocation();

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const boutiqueCategories = [
    { id: 'tout', label: 'Voir tout', path: '/boutique' },
    { id: 'mobilier', label: 'Mobilier', path: '/boutique?category=mobilier' },
    { id: 'decoration', label: 'Décoration', path: '/boutique?category=decoration' },
    { id: 'peintures', label: 'Peintures', path: '/boutique?category=peintures' }
  ];

  return (
    <>
      <HeaderContainer>
        <LeftSection>
          <MenuButton>
            <IconHeader 
              Icon={IoMenuOutline} 
              iconWidth={'2rem'} 
              iconHeight={'2rem'}
              onClick={toggleSidebar}
            />
          </MenuButton>
          <Logo src={logo} />
        </LeftSection>
        <MiddleSection>
          <NavigationLink to="/" $active={isActive('/')}>
            Accueil
          </NavigationLink>
          <DropdownContainer
            onMouseEnter={() => setBoutiqueDropdownVisible(true)}
            onMouseLeave={() => setBoutiqueDropdownVisible(false)}
          >
            <DropdownLink to="/boutique" $active={isActive('/boutique')}>
              Boutique
            </DropdownLink>
            <DropdownMenu $isVisible={boutiqueDropdownVisible}>
              {boutiqueCategories.map((category) => (
                <DropdownItem
                  key={category.id}
                  to={category.path}
                  onClick={() => setBoutiqueDropdownVisible(false)}
                >
                  {category.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>
          <NavigationLink to="/events" $active={isActive('/events')}>
            Évènements
          </NavigationLink>
          <NavigationLink to="/contact" $active={isActive('/contact')}>
            Contact
          </NavigationLink>
        </MiddleSection>
        <RightSection>
          <Link to="/profile">
            <IconHeader Icon={IoPersonOutline} />
          </Link>
          <IconHeader Icon={IoHeartOutline} />
          <Link to="/cart">
            <IconHeader Icon={PiBasket} />
          </Link>
        </RightSection>
      </HeaderContainer>
      
      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
    </>
  )
}

export default Header