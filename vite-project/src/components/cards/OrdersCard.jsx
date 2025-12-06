import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;
  min-width: 500px;
  max-width: 700px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
`

const CardTitle = styled.h1`
  font-size: ${fontSizes.large};
  font-weight: 500;
`

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OrderItem = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OrderHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const OrderNumber = styled.span`
  font-size: ${fontSizes.medium};
  font-weight: 500;
`

const OrderDate = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.gray};
`

const OrderStatus = styled.span`
  font-size: ${fontSizes.small};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background-color: ${props => {
    switch(props.status) {
      case 'delivered': return colors.green;
      case 'processing': return '#FFA500';
      case 'pending': return colors.lightGray;
      default: return colors.lightGray;
    }
  }};
  color: ${props => props.status === 'delivered' ? colors.white : colors.black};
`

const OrderTotal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${colors.lightGray};
`

const TotalLabel = styled.span`
  font-size: ${fontSizes.small};
  font-weight: 500;
`

const TotalAmount = styled.span`
  font-size: ${fontSizes.medium};
  font-weight: 500;
  font-family: 'DM Mono', monospace;
  letter-spacing: 0.05em;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${colors.gray};
  font-size: ${fontSizes.medium};
`

function OrdersCard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Remplacer par un appel API réel
    // Simuler un chargement
    setTimeout(() => {
      // Données d'exemple
      setOrders([
        {
          id: 1,
          orderNumber: 'CMD-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 89.99
        },
        {
          id: 2,
          orderNumber: 'CMD-2024-002',
          date: '2024-01-20',
          status: 'processing',
          total: 124.50
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusLabel = (status) => {
    switch(status) {
      case 'delivered': return 'Livrée';
      case 'processing': return 'En cours';
      case 'pending': return 'En attente';
      default: return 'Inconnu';
    }
  };

  if (loading) {
    return (
      <CardContainer>
        <CardTitle>Mes commandes</CardTitle>
        <EmptyState>Chargement...</EmptyState>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <CardTitle>Mes commandes</CardTitle>
      {orders.length === 0 ? (
        <EmptyState>Vous n'avez pas encore passé de commande.</EmptyState>
      ) : (
        <OrdersList>
          {orders.map((order) => (
            <OrderItem key={order.id}>
              <OrderHeader>
                <OrderNumber>Commande {order.orderNumber}</OrderNumber>
                <OrderDate>{new Date(order.date).toLocaleDateString('fr-FR')}</OrderDate>
              </OrderHeader>
              <OrderHeader>
                <OrderStatus status={order.status}>
                  {getStatusLabel(order.status)}
                </OrderStatus>
              </OrderHeader>
              <OrderTotal>
                <TotalLabel>Total</TotalLabel>
                <TotalAmount>{order.total.toFixed(2)}€</TotalAmount>
              </OrderTotal>
            </OrderItem>
          ))}
        </OrdersList>
      )}
    </CardContainer>
  )
}

export default OrdersCard

