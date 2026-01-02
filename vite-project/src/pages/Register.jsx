import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import bluePlate from '../assets/images/blue-plate.jpeg'
import LargeButton from '../components/buttons/LargeButton'
import { colors, fontSizes } from '../constants/style'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  background-image: url(${bluePlate});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  background-color:rgba(226, 217, 217);
  border-radius: 16px;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem 4rem;
  }
`

const Title = styled.h1`
  font-size: ${fontSizes.smallTitle};
  font-weight: 500;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: ${fontSizes.large};
  margin-top: -20px;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.1rem;
  border-radius: 14px;
  border: 2px solid ${colors.lightGray};
  background-color: ${colors.white};
  font-size: ${fontSizes.medium};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.black};
  }

  &::placeholder {
    color: ${colors.gray};
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

const PasswordStrength = styled.div`
  font-size: 0.85rem;
  color: ${props => {
    if (props.$strength === 'strong') return '#0a0';
    if (props.$strength === 'medium') return '#fa0';
    return '#c33';
  }};
  margin-top: -0.5rem;
`


const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`

const Checkbox = styled.input`
  margin-top: 0.25rem;
  cursor: pointer;
`

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  
  a {
    color: rgb(107, 107, 77);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: rgb(107, 107, 77);
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`

function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, loading, error } = useContext(AuthContext)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const from = location.state?.from?.pathname || '/profile'

  const getPasswordStrength = (password) => {
    if (!password) return null
    if (password.length < 6) return 'weak'
    if (password.length >= 6 && password.length < 10) return 'medium'
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong'
    return 'medium'
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('Veuillez remplir tous les champs')
      return
    }

    if (!formData.email.includes('@')) {
      setFormError('Veuillez entrer une adresse email valide')
      return
    }

    if (formData.password.length < 6) {
      setFormError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Les mots de passe ne correspondent pas')
      return
    }

    if (!formData.acceptTerms) {
      setFormError('Vous devez accepter les conditions d\'utilisation')
      return
    }

    const result = await register(formData.email, formData.password, formData.name)
    
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setFormError(result.error || 'Une erreur est survenue lors de l\'inscription')
    }
  }

  return (
    <PageWrapper>
      <FormContainer>
        <Title>Inscription</Title>
        <Subtitle>Créez votre compte Gelul</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          {(formError || error) && (
            <ErrorMessage>{formError || error}</ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">Nom complet</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              disabled={loading}
              autoComplete="name"
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
                autoComplete="new-password"
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
            {passwordStrength && (
              <PasswordStrength $strength={passwordStrength}>
                {passwordStrength === 'weak' && 'Mot de passe faible'}
                {passwordStrength === 'medium' && 'Mot de passe moyen'}
                {passwordStrength === 'strong' && 'Mot de passe fort'}
              </PasswordStrength>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <PasswordInputWrapper>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                autoComplete="new-password"
                style={{ paddingRight: '2.5rem' }}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </PasswordToggle>
            </PasswordInputWrapper>
          </FormGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              disabled={loading}
            />
            <CheckboxLabel htmlFor="acceptTerms">
              J'accepte les <a href="/terms" target="_blank">conditions d'utilisation</a> et la{' '}
              <a href="/privacy" target="_blank">politique de confidentialité</a>
            </CheckboxLabel>
          </CheckboxGroup>

          <LargeButton type="submit" disabled={loading} backgroundColor="#000" color="white">
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </LargeButton>
        </Form>

        <LinksContainer>
          <div>
            Vous avez déjà un compte ?{' '}
            <StyledLink to="/login" state={{ from: location.state?.from }}>
              Se connecter
            </StyledLink>
          </div>
        </LinksContainer>
      </FormContainer>
    </PageWrapper>
  )
}

export default Register

