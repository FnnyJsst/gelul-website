import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoArrowBackOutline, IoMailOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import authService from '../services/authService'

const PageWrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #fafafa;
`

const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(107, 107, 77);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #000;
  text-align: center;
`

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.5;
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
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: rgb(107, 107, 77);
  }
  
  &::placeholder {
    color: #999;
  }
`

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
`

const SuccessMessage = styled.div`
  background-color: #efe;
  color: #0a0;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.95rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  svg {
    font-size: 3rem;
  }
`

const Button = styled.button`
  background-color: rgb(107, 107, 77);
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgb(90, 90, 65);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const InfoBox = styled.div`
  background-color: #f0f8ff;
  border-left: 4px solid rgb(107, 107, 77);
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
  
  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: rgb(107, 107, 77);
  }
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    font-size: 4rem;
    color: rgb(107, 107, 77);
  }
`

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email) {
      setError('Veuillez entrer votre adresse email')
      return
    }

    if (!email.includes('@')) {
      setError('Veuillez entrer une adresse email valide')
      return
    }

    setLoading(true)

    try {
      await authService.requestPasswordReset(email)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <FormContainer>
        <BackLink to="/login">
          <IoArrowBackOutline />
          Retour à la connexion
        </BackLink>

        {!success ? (
          <>
            <IconWrapper>
              <IoMailOutline />
            </IconWrapper>
            
            <Title>Mot de passe oublié ?</Title>
            <Subtitle>
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </Subtitle>
            
            <Form onSubmit={handleSubmit}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <FormGroup>
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  disabled={loading}
                  autoComplete="email"
                  autoFocus
                />
              </FormGroup>

              <Button type="submit" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
              </Button>
            </Form>

            <InfoBox>
              <strong>📧 Vous ne recevez pas l'email ?</strong>
              Vérifiez votre dossier spam ou contactez-nous à support@gelul.com
            </InfoBox>
          </>
        ) : (
          <>
            <SuccessMessage>
              <IoCheckmarkCircleOutline />
              <div>
                <strong>Email envoyé avec succès !</strong>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                  Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
                </p>
              </div>
            </SuccessMessage>

            <InfoBox style={{ marginTop: '1.5rem' }}>
              <strong>Prochaines étapes :</strong>
              1. Consultez votre boîte email<br/>
              2. Cliquez sur le lien de réinitialisation<br/>
              3. Créez un nouveau mot de passe<br/>
              <br/>
              <em>Le lien expirera dans 1 heure.</em>
            </InfoBox>

            <Button 
              onClick={() => {
                setSuccess(false)
                setEmail('')
              }}
              style={{ marginTop: '1rem' }}
            >
              Envoyer à nouveau
            </Button>
          </>
        )}
      </FormContainer>
    </PageWrapper>
  )
}

export default ForgotPassword

