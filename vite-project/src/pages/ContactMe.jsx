import React, { useEffect, useRef, useState } from 'react'
import Banner from '../components/banners/Banner'
import styled, { css } from 'styled-components'
import { colors, fontSizes } from '../constants/style'

const PageContainer = styled.main`
  // min-height: calc(80vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #efe9e9;
`

const Content = styled.section`
  width: 100%;
  max-width: 960px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem 4rem;
  }
`

const Title = styled.h1`
  font-size: ${fontSizes.largeTitle};
  font-weight: 500;
  text-align: left;
`

const Paragraph = styled.p`
  font-size: ${fontSizes.large};
  max-width: 640px;
  color: ${colors.gray};
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
`

const FormField = styled.div`
  flex: ${({ $fullWidth }) => ($fullWidth ? '1 1 100%' : '1 1 280px')};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: ${({ $fullWidth }) => ($fullWidth ? '100%' : '240px')};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`

const Label = styled.label`
  font-size: ${fontSizes.small};
  font-weight: 500;
  color: ${colors.black};
`

const inputBaseStyles = css`
  width: 100%;
  padding: 0.9rem 1.1rem;
  border-radius: 12px;
  border: 1px solid ${colors.lightGray};
  background-color: ${colors.white};
  font-size: ${fontSizes.medium};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.black};
    box-shadow: 0 0 0 3px rgba(31, 31, 31, 0.12);
  }

  &::placeholder {
    color: ${colors.gray};
  }
`

const Input = styled.input`
  ${inputBaseStyles}
`

const Textarea = styled.textarea`
  ${inputBaseStyles};
  min-height: 180px;
  resize: vertical;
`

const ErrorMessage = styled.span`
  font-size: ${fontSizes.small};
  color: #c2402b;
`

const SuccessMessage = styled.div`
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background-color: rgba(81, 173, 60, 0.12);
  color: ${colors.green};
  font-size: ${fontSizes.medium};
`

const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
`

const Hint = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.gray};
`

const SubmitButton = styled.button`
  padding: 1.5rem;
  border-radius: 14px;
  border: none;
  background-color: ${colors.black};
  color: ${colors.white};
  font-size: ${fontSizes.medium};
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }
`

const initialValues = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  message: ''
}

function ContactMe() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitTimeoutRef = useRef(null)

  useEffect(
    () => () => {
      if (submitTimeoutRef.current) {
        window.clearTimeout(submitTimeoutRef.current)
      }
    },
    []
  )

  const validate = (currentValues) => {
    const validationErrors = {}
    const trimmed = Object.fromEntries(
      Object.entries(currentValues).map(([key, value]) => [key, value.trim()])
    )

    if (!trimmed.lastName) {
      validationErrors.lastName = 'Merci de renseigner votre nom.'
    }

    if (!trimmed.firstName) {
      validationErrors.firstName = 'Merci de renseigner votre prénom.'
    }

    if (!trimmed.email) {
      validationErrors.email = 'Merci de renseigner votre adresse e-mail.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      validationErrors.email = 'Le format de l’adresse e-mail est invalide.'
    }

    if (trimmed.phone && !/^[0-9()+.\s-]{7,}$/.test(trimmed.phone)) {
      validationErrors.phone = 'Le numéro de téléphone est invalide.'
    }

    if (!trimmed.message) {
      validationErrors.message = 'Merci de décrire votre projet ou votre question.'
    } else if (trimmed.message.length < 10) {
      validationErrors.message = 'Votre message doit contenir au moins 10 caractères.'
    }

    return validationErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((previous) => ({
      ...previous,
      [name]: value
    }))

    if (errors[name]) {
      setErrors((previous) => {
        const next = { ...previous }
        delete next[name]
        return next
      })
    }

    if (status !== 'idle') {
      setStatus('idle')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validate(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('pending')

    submitTimeoutRef.current = window.setTimeout(() => {
      setValues(initialValues)
      setErrors({})
      setIsSubmitting(false)
      setStatus('success')
    }, 600)
  }

  return (
    <>
      <Banner title="Contact" />
      <PageContainer>
        <Content>
          <Title>Une idée de projet&nbsp;? Une question&nbsp;? 😊</Title>
          <Paragraph>Contactez-moi via le formulaire ci-dessous et je vous répondrai rapidement.</Paragraph>

          <ContactForm noValidate onSubmit={handleSubmit}>
            {status === 'success' && (
              <SuccessMessage role="status" aria-live="polite">
                Merci pour votre message&nbsp;! Je reviens vers vous au plus vite.
              </SuccessMessage>
            )}

            <FormRow>
              <FormField>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Dupont"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && <ErrorMessage id="lastName-error">{errors.lastName}</ErrorMessage>}
              </FormField>

              <FormField>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Emma"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && (
                  <ErrorMessage id="firstName-error">{errors.firstName}</ErrorMessage>
                )}
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="emma.dupont@email.com"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <ErrorMessage id="email-error">{errors.email}</ErrorMessage>}
              </FormField>

              <FormField>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <ErrorMessage id="phone-error">{errors.phone}</ErrorMessage>}
              </FormField>
            </FormRow>

            <FormRow>
              <FormField $fullWidth>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Présentez votre projet et vos besoins…"
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <ErrorMessage id="message-error">{errors.message}</ErrorMessage>}
              </FormField>
            </FormRow>

            <FormFooter>
              <Hint>Les champs marqués d’un * sont obligatoires.</Hint>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours…' : 'Envoyer'}
              </SubmitButton>
            </FormFooter>
          </ContactForm>
        </Content>
      </PageContainer>
    </>
  )
}

export default ContactMe