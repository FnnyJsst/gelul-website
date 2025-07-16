
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalSidebarStyle = createGlobalStyle`
  .custom-sidebar .p-sidebar-header {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    background: transparent;
  }
  
  .custom-sidebar .p-sidebar-content {
    padding: 0;
    height: 100vh;
  }
  
  .custom-sidebar .p-sidebar-close {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarContent = styled.div`
  background-color: #f0f0f0;
  height: 100vh;
  padding: 1rem;
  margin-top: -1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  
  h2 {
    margin-bottom: 1rem;
    color: #333;
    padding-top: 3rem;
  }
  
  p {
    line-height: 1.6;
    color: #666;
  }
  
  .menu-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: color 0.2s;
    border-bottom: 1px solid #ddd;
    
    &:hover {
      color: #007bff;
      background-color: #e8e8e8;
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
            >
                <SidebarContent>
                    <h2>Menu</h2>
                    <div className="menu-item">Accueil</div>
                    <div className="menu-item">Boutique</div>
                    <div className="menu-item">Décoration</div>
                    <div className="menu-item">Peinture</div>
                </SidebarContent>
            </PrimeSidebar>
        </>
    )
}

export default Sidebar;