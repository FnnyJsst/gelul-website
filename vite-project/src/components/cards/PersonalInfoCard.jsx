import React, { useState } from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../constants/style'

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: rgb(233, 231, 231);
  border-radius: 16px;
  padding: 2rem;

  width: 85%;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
`

const CardTitle = styled.h1`
  font-size: ${fontSizes.large};
  font-weight: 500;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: ${fontSizes.small};
  font-weight: 400;
  color: ${colors.black};
`

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  font-size: ${fontSizes.small};
  background-color: ${colors.white};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.black};
  }
`

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  font-size: ${fontSizes.small};
  background-color: ${colors.white};
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${colors.black};
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: ${colors.black};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  font-size: ${fontSizes.small};
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background-color: ${colors.gray};
  }
`

function PersonalInfoCard() {
  const [formData, setFormData] = useState({
    firstName: 'Mounette',
    lastName: '',
    email: 'mounette@lapin.com',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter la sauvegarde des données
    console.log('Données sauvegardées:', formData);
    alert('Informations personnelles mises à jour !');
  };

  return (
    <CardContainer>
      <CardTitle>Informations personnelles</CardTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Nom</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address">Adresse</Label>
          <TextArea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">Ville</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="zipCode">Code postal</Label>
          <Input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Enregistrer les modifications</Button>
      </Form>
    </CardContainer>
  )
}

export default PersonalInfoCard

