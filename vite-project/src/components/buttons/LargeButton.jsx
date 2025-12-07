import styled from "styled-components";
import { fontSizes } from "../../constants/style";

const Button = styled.button `
  padding: 1.6em;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  background: ${(props) => props.$backgroundColor || "white"};
  color: ${(props) => props.$color || "#333"};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  font-size: ${fontSizes.small};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #ccc;
    
    &::before {
      left: 100%;
    }
    
    svg {
      transform: scale(1.1) rotate(10deg);
    }
  }
  
  &:active {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    width: ${(props) => props.$iconWidth || "20px"};
    height: ${(props) => props.$iconHeight || "20px"};
    transition: all 0.3s ease;
  }
`;

function LargeButton ({Icon, onClick, iconWidth, iconHeight, text, backgroundColor = "ffffff", color = "#black" }) {
  return (
    <>
      <Button onClick={onClick} $iconWidth={iconWidth} $iconHeight={iconHeight} $backgroundColor={backgroundColor} $color={color}>
        {text}
        {Icon && <Icon />}
      </Button>
    </>
  )
}

export default LargeButton;