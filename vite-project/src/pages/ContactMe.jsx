import React, { useEffect, useRef, useState } from 'react'
import Banner from '../components/banners/Banner'
import styled, { css } from 'styled-components'
import { colors, fontSizes } from '../constants/style'
import bluePlate from '../assets/images/blue-plate.jpeg'

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
  background-color: #f2eaea;
`

const CardWrapper = styled.div`
  width: 80%;
  padding: 1rem;
  background-image: url(${bluePlate});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 18px;
`

const Content = styled.section`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  background-color:rgba(226, 217, 217, 0.96);
  border-radius: 16px;

  @media (max-width: 768px) {
    padding: 3.5rem 1.5rem 4rem;
  }
`

const Title = styled.h1`
  font-size: ${fontSizes.smallTitle};
  font-weight: 500;
  text-align: left;
`

const Paragraph = styled.p`
  font-size: ${fontSizes.large};
  margin-top: -20px;
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-weight: 600;
  color: ${colors.black};
`

const inputBaseStyles = css`
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

const Input = styled.input`
  ${inputBaseStyles}
`

const Textarea = styled.textarea`
  ${inputBaseStyles};
  min-height: 130px;
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
  width: 100%;
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

const FileInputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.1rem;
  border-radius: 14px;
  border: 2px dashed ${colors.lightGray};
  background-color: ${colors.white};
  font-size: ${fontSizes.medium};
  color: ${colors.black};
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: ${colors.black};
    background-color: ${colors.lightGray};
  }
`

const HiddenFileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
`

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  font-size: ${fontSizes.small};
`

const FileName = styled.span`
  flex: 1;
  color: ${colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const FileSize = styled.span`
  color: ${colors.gray};
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #c2402b;
  cursor: pointer;
  font-size: ${fontSizes.medium};
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(194, 64, 43, 0.1);
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
  const [files, setFiles] = useState([])
  const submitTimeoutRef = useRef(null)
  const fileInputRef = useRef(null)

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

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
    
    // Limite de 10 Mo par fichier
    const maxSize = 10 * 1024 * 1024 // 10 MB
    const validFiles = selectedFiles.filter(file => {
      if (file.size > maxSize) {
        alert(`Le fichier "${file.name}" est trop volumineux (max 10 Mo)`)
        return false
      }
      return true
    })

    setFiles((previous) => [...previous, ...validFiles])
    
    // Réinitialiser l'input pour permettre de sélectionner le même fichier à nouveau
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveFile = (index) => {
    setFiles((previous) => previous.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
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

    // Ici, vous pouvez ajouter la logique pour envoyer les fichiers avec le formulaire
    // Par exemple, créer un FormData et inclure les fichiers
    console.log('Fichiers sélectionnés:', files)

    submitTimeoutRef.current = window.setTimeout(() => {
      setValues(initialValues)
      setErrors({})
      setFiles([])
      setIsSubmitting(false)
      setStatus('success')
    }, 600)
  }

  return (
    <>
      <PageContainer>
        <CardWrapper>
          <Content>
            <Title>Un projet sur mesure&nbsp;? Une question&nbsp;? 😊</Title>
            <Paragraph>Contactez-moi via le formulaire ci-dessous et je vous répondrai sous 24 heures.</Paragraph>

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

            <FormRow>
              <FormField $fullWidth>
                <Label htmlFor="files">Pièces jointes (photos, PDF, etc.)</Label>
                <FileInputWrapper>
                  <FileInputLabel htmlFor="files">
                    📎 Cliquez pour ajouter des fichiers
                  </FileInputLabel>
                  <HiddenFileInput
                    ref={fileInputRef}
                    id="files"
                    name="files"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </FileInputWrapper>
                {files.length > 0 && (
                  <FileList>
                    {files.map((file, index) => (
                      <FileItem key={index}>
                        <FileName>{file.name}</FileName>
                        <FileSize>{formatFileSize(file.size)}</FileSize>
                        <RemoveFileButton
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          aria-label={`Supprimer ${file.name}`}
                        >
                          ✕
                        </RemoveFileButton>
                      </FileItem>
                    ))}
                  </FileList>
                )}
                <Hint style={{ marginTop: '0.5rem' }}>
                  Formats acceptés : jpeg, jpg, png, pdf. Taille maximale : 10 Mo par fichier. Les champs marqués d’un * sont obligatoires.
                </Hint>
              </FormField>
            </FormRow>

            <FormFooter>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours…' : 'Envoyez-moi un message'}
              </SubmitButton>
            </FormFooter>
          </ContactForm>
          </Content>
        </CardWrapper>
      </PageContainer>
    </>
  )
}

export default ContactMe