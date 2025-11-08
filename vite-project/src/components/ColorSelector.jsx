import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors as themeColors, fontSizes } from '../constants/style'

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.5rem;
`

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 45px;
`

const SwatchButton = styled.button`
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: ${({ $isSelected }) =>
    $isSelected ? `2px solid black` : 'none'};
  background-color: ${({ $hex }) => $hex};
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus-visible {
    outline: 2px solid ${themeColors.gray};
    outline-offset: 2px;
  }
`

const SelectedColorText = styled.span`
  font-size: ${fontSizes.medium};
`

function ColorSelector({ options, label, defaultColor, onChange }) {
  const normalizedOptions = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        hex: option.hex || option.value
      })),
    [options]
  )

  const initialColor = useMemo(() => {
    if (defaultColor && normalizedOptions.some((option) => option.value === defaultColor)) {
      return defaultColor
    }

    return normalizedOptions[0]?.value ?? ''
  }, [defaultColor, normalizedOptions])

  const [selectedColor, setSelectedColor] = useState(initialColor)

  const handleSelect = (option) => {
    setSelectedColor(option.value)
    onChange(option)
  }

  const activeOption = normalizedOptions.find((option) => option.value === selectedColor)

  if (!normalizedOptions.length) {
    return null
  }

  useEffect(() => {
    if (activeOption) {
      onChange(activeOption)
    }
  }, [activeOption, onChange])

  return (
    <SelectorContainer>
      {activeOption && (
        <SelectedColorText>Couleur : {activeOption.label}</SelectedColorText>
      )}
      <OptionsContainer role="radiogroup" aria-label={`Choisir ${label.toLowerCase()}`}>
        {normalizedOptions.map((option) => {
          const isSelected = option.value === selectedColor

          return (
            <OptionWrapper key={option.value}>
              <SwatchButton
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={option.label}
                $hex={option.hex}
                $isSelected={isSelected}
                onClick={() => handleSelect(option)}
              />
            </OptionWrapper>
          )
        })}
      </OptionsContainer>
    </SelectorContainer>
  )
}

const defaultOptions = [
  { label: 'Chêne', value: 'oak', hex: '#C69A6B' },
  { label: 'Gris', value: 'black', hex: 'rgb(141, 132, 132)' },
  { label: 'Lavande', value: 'off-white', hex: 'rgb(69, 44, 111)' },
  { label: 'Bleu nuit', value: 'navy', hex: '#1E3A5F' }
]

ColorSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      hex: PropTypes.string
    })
  ),
  label: PropTypes.string,
  defaultColor: PropTypes.string,
  onChange: PropTypes.func
}

ColorSelector.defaultProps = {
  options: defaultOptions,
  label: 'Couleur',
  defaultColor: defaultOptions[0].value,
  onChange: () => {}
}

export default ColorSelector