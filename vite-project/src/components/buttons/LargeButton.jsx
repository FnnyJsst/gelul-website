import styled from "styled-components";

const Button = styled.button `
  padding: 1.5em;
  border-radius: 10px;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  
    svg {
    width: ${(props) => props.$iconWidth || "15px"};
    height: ${(props) => props.$iconHeight || "15px"};
  }`;

function LargeButton ({Icon, onClick, iconWidth, iconHeight }) {
  return (
    <>
      <Button onClick={onClick} $iconWidth={iconWidth} $iconHeight={iconHeight}>
        Découvrez la collection
        {Icon && <Icon />}
      </Button>
    </>
  )
}

export default LargeButton;