import React from 'react'
import styled from 'styled-components'

const DebugPanel = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  font-size: 0.85rem;
  min-width: 200px;
`

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffd700;
  font-size: 0.9rem;
`

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#00ff00' : '#ff4444'};
  box-shadow: 0 0 10px ${props => props.active ? '#00ff00' : '#ff4444'};
`

const Label = styled.span`
  color: #ccc;
`

const Value = styled.span`
  color: white;
  font-weight: 500;
`

const Message = styled.div`
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.8rem;
  color: #aaa;
  line-height: 1.4;
`

const Code = styled.code`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #ffd700;
`

/**
 * Composant de debug pour afficher le mode de données utilisé
 * À retirer en production !
 */
function DevModeIndicator() {
  // Vérifier si on est en mode développement
  const isDev = import.meta.env.DEV;
  
  // Ne rien afficher en production
  if (!isDev) return null;

  return (
    <DebugPanel>
      <Title>🔧 Mode Développement</Title>
      
      <Status>
        <Indicator active={true} />
        <Label>Données:</Label>
        <Value>Mock (en dur)</Value>
      </Status>
      
      <Status>
        <Label>Backend:</Label>
        <Value>Non requis</Value>
      </Status>

      <Message>
        Les données sont mockées dans<br/>
        <Code>services/api.js</Code><br/>
        <br/>
        Pour utiliser l'API réelle :<br/>
        Changez <Code>USE_MOCK_DATA</Code> à <Code>false</Code>
      </Message>
    </DebugPanel>
  )
}

export default DevModeIndicator

