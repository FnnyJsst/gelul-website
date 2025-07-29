import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &.open {
    cursor: default;
    border-radius: 8px;
    transition-delay: 0s;
    box-shadow: 0 10px 36px -2px rgba(0, 0, 0, 0.12);
    
    svg {
      opacity: 0.4;
      transform: rotate(0deg);
      transition-delay: 0s;
    }
  }
`;

const SearchIcon = styled.svg`
  cursor: pointer;
  margin: 20px;
  width: 20px;
  height: 20px;
  display: block;
  color: #000;
  stroke-width: 2;
  transform: rotate(90deg);
  transition: all 0.3s ease 0.6s;
`;

const InputContainer = styled.div`
  position: relative;
  width: ${props => props.isOpen ? '200px' : '0'};
  transition: all 0.5s cubic-bezier(0.51, 0.92, 0.24, 1.15) 0.5s;
  ${props => props.isOpen && 'transition-delay: 0s;'}
`;

const SearchInput = styled.input`
  font-size: inherit;
  line-height: inherit;
  padding: 0 24px 0 0;
  border: 0;
  display: block;
  outline: none;
  font-family: inherit;
  position: absolute;
  line-height: 20px;
  font-size: 16px;
  background: #fff;
  top: 0;
  width: 100%;
  opacity: ${props => props.isOpen ? '1' : '0'};
  z-index: 1;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: ${props => props.isOpen ? 'all 0s ease 0.75s' : 'all 0s ease 0s'};
  
  &::placeholder {
    color: #000;
  }
`;

const PlaceholderContainer = styled.div`
  white-space: nowrap;
  color: #000;
  display: flex;
`;

const PlaceholderSpan = styled.span`
  line-height: 20px;
  font-size: 16px;
  opacity: ${props => props.isOpen ? '1' : '0'};
  display: block;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translate(0, 0)' : 'translate(0, 12px)'};
  transition: all 0.4s ease;
  transition-delay: ${props => props.isOpen ? `${0.4 + props.index * 0.05}s` : `${0.4 - props.index * 0.2}s`};
`;

function InputSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const placeholder = "Rechercher...";
  const placeholderWords = placeholder.split(' ');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 750);
  };

  return (
    <SearchContainer 
      ref={containerRef}
      className={isOpen ? 'open' : ''}
      onClick={handleClick}
    >
      <SearchIcon viewBox="0 0 24 24">
        <g strokeLinecap="square" strokeLinejoin="miter" stroke="currentColor">
          <line fill="none" strokeMiterlimit="10" x1="22" y1="22" x2="16.4" y2="16.4"/>
          <circle fill="none" stroke="currentColor" strokeMiterlimit="10" cx="10" cy="10" r="9"/>
        </g>
      </SearchIcon>
      
      <InputContainer isOpen={isOpen}>
        <SearchInput 
          ref={inputRef}
          type="text" 
          placeholder={placeholder}
          isOpen={isOpen}
        />
        <PlaceholderContainer>
          {placeholderWords.map((word, index) => (
            <PlaceholderSpan 
              key={index} 
              isOpen={isOpen}
              index={index}
            >
              {word}&nbsp;
            </PlaceholderSpan>
          ))}
        </PlaceholderContainer>
      </InputContainer>
    </SearchContainer>
  );
}

export default InputSearch;