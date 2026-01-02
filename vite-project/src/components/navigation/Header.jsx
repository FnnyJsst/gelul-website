import { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { IoMenuOutline, IoPersonOutline, IoHeartOutline, IoCartOutline, IoLogOutOutline } from "react-icons/io5";
import { PiBasket } from "react-icons/pi";
import logo from "../../assets/images/logo.png"
import IconHeader from "../buttons/IconHeader"
import Sidebar from "./Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 3rem;
  padding: 0 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const UserMenuContainer = styled.div`
  position: relative;
`

const UserMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: #ffffff;
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
  opacity: ${props => props.$isVisible ? '1' : '0'};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(-10px)'};
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  z-index: 1000;
`

const UserMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #000;
  font-size: 0.95rem;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: rgb(107, 107, 77);
  }

  svg {
    font-size: 1.2rem;
  }
`

const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: #000;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: rgb(107, 107, 77);
  }

  svg {
    font-size: 1.2rem;
  }
`

const UserMenuDivider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0;
`

const UserInfo = styled.div`
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`

const UserName = styled.div`
  font-weight: 600;
  color: #000;
  font-size: 0.95rem;
`

const UserEmail = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
`

function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [boutiqueDropdownVisible, setBoutiqueDropdownVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const userMenuRef = useRef(null);

  // Fermer le menu utilisateur si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuVisible(false);
      }
    }

    if (userMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [userMenuVisible]);

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  function toggleUserMenu() {
    setUserMenuVisible(!userMenuVisible);
  }

  function handleLogout() {
    logout();
    setUserMenuVisible(false);
    navigate('/');
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
          {/* <NavigationLink to="/portfolio" $active={isActive('/portfolio')}>
            Portfolio
          </NavigationLink> */}
          {/* <NavigationLink to="/events" $active={isActive('/events')}>
            Évènements
          </NavigationLink> */}
          <NavigationLink to="/contact" $active={isActive('/contact')}>
            Contact
          </NavigationLink>
        </MiddleSection>
        <RightSection>
          {isAuthenticated ? (
            <UserMenuContainer ref={userMenuRef}>
              <div onClick={toggleUserMenu} style={{ cursor: 'pointer' }}>
                <IconHeader Icon={IoPersonOutline} />
              </div>
              <UserMenu $isVisible={userMenuVisible}>
                <UserInfo>
                  <UserName>{user?.name}</UserName>
                  <UserEmail>{user?.email}</UserEmail>
                </UserInfo>
                <UserMenuItem 
                  to="/profile" 
                  onClick={() => setUserMenuVisible(false)}
                >
                  <IoPersonOutline />
                  Mon profil
                </UserMenuItem>
                <UserMenuItem 
                  to="/favourites" 
                  onClick={() => setUserMenuVisible(false)}
                >
                  <IoHeartOutline />
                  Mes favoris
                </UserMenuItem>
                <UserMenuDivider />
                <UserMenuButton onClick={handleLogout}>
                  <IoLogOutOutline />
                  Déconnexion
                </UserMenuButton>
              </UserMenu>
            </UserMenuContainer>
          ) : (
            <Link to="/login">
              <IconHeader Icon={IoPersonOutline} />
            </Link>
          )}
          <Link to="/favourites">
            <IconHeader Icon={IoHeartOutline} />
          </Link>
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