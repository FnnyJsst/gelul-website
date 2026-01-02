import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

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

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  
  &:hover {
    color: rgb(107, 107, 77);
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

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`

const StyledLink = styled(Link)`
  color: rgb(107, 107, 77);
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const Divider = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ddd;
  line-height: 0.1em;
  margin: 1.5rem 0;
  
  span {
    background: white;
    padding: 0 1rem;
    color: #666;
    font-size: 0.9rem;
  }
`

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading, error } = useContext(AuthContext)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const from = location.state?.from?.pathname || '/profile'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    // Validation
    if (!formData.email || !formData.password) {
      setFormError('Veuillez remplir tous les champs')
      return
    }

    if (!formData.email.includes('@')) {
      setFormError('Veuillez entrer une adresse email valide')
      return
    }

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setFormError(result.error || 'Email ou mot de passe incorrect')
    }
  }

  return (
    <PageWrapper>
      <FormContainer>
        <Title>Connexion</Title>
        <Subtitle>Connectez-vous à votre compte Gelul</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          {(formError || error) && (
            <ErrorMessage>{formError || error}</ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              disabled={loading}
              autoComplete="email"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Mot de passe</Label>
            <PasswordInputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                autoComplete="current-password"
                style={{ paddingRight: '2.5rem' }}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </PasswordToggle>
            </PasswordInputWrapper>
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </Form>

        <LinksContainer>
          <StyledLink to="/forgot-password">Mot de passe oublié ?</StyledLink>
          
          <Divider>
            <span>ou</span>
          </Divider>
          
          <div>
            Pas encore de compte ?{' '}
            <StyledLink to="/register" state={{ from: location.state?.from }}>
              Créer un compte
            </StyledLink>
          </div>
        </LinksContainer>
      </FormContainer>
    </PageWrapper>
  )
}

export default Login

