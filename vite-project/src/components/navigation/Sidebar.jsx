
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const GlobalSidebarStyle = createGlobalStyle`
  .custom-sidebar .p-sidebar-header {
    position: absolute;
    top: 0;
    left: 1rem;
    z-index: 1000;
    background: transparent;
  }
  
  .custom-sidebar .p-sidebar-content {
    padding: 0;
    height: 100vh;
  }
  
  .custom-sidebar .p-sidebar-close {
    display: none !important;
  }
  
  .p-sidebar-mask {
    background-color: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(1px);
  }
  
  @media (min-width: 768px) {
    .custom-sidebar,
    .p-sidebar-mask {
      display: none !important;
    }
  }
`;

const SidebarContent = styled.div`
  background-color: #f0f0f0;
  height: 100vh;
  padding: 1rem;
  padding-top: 5rem;
  margin-left: -1rem;
  margin-right: -1rem;
  font-size: 1.5rem;

  a {
    text-decoration: none;
    color: #000;
  }
  
  .menu-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: color 0.2s;
  
    &:hover {
      color:rgb(107, 107, 77);
    }
  }
`;

const Sidebar = ({ visible, onHide }) => {
    return (
        <>
            <GlobalSidebarStyle />
            <PrimeSidebar 
                visible={visible} 
                onHide={onHide}
                position="left"
                style={{ width: '300px', height: '100vh' }}
                className="custom-sidebar"
                header={
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '5px',
                        padding: '1rem',
                        paddingLeft: '0'
                    }}>
                        <button 
                            onClick={onHide}
                            style={{
                                border: 'none',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                fontSize: '1.2rem'
                            }}
                        >
                            ✕
                        </button>
                        <img 
                            src={logo} 
                            alt="Logo Gelul" 
                            style={{ 
                                height: '40px',
                                width: 'auto'
                            }} 
                        />
                    </div>
                }
            >
                <SidebarContent>
                    <Link to="/"><div className="menu-item" onClick={onHide}>Accueil</div></Link>
                    <Link to="/boutique"><div className="menu-item" onClick={onHide}>Boutique</div></Link>
                    <Link to="/events"><div className="menu-item" onClick={onHide}>Évènements</div></Link>
                    <Link to="/contact"><div className="menu-item" onClick={onHide}>Contact</div></Link>
                </SidebarContent>
            </PrimeSidebar>
        </>
    )
}

export default Sidebar;