import { colors } from "../../constants/style";
import styled from "styled-components";

const IconButton = styled.button`
  border: none;
  background: ${colors.white};
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  border-radius: 25%;
  width: 40px;
  height: 40px;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }
  
  svg {
    width: ${(props) => props.$iconWidth || "25px"};
    height: ${(props) => props.$iconHeight || "25px"};
    color: #333;
    transition: color 0.3s ease;
  }
  
  &:hover svg {
    color: #667eea;
  }
`;

function IconFooter({ Icon, onClick, iconWidth = "25px", iconHeight = "25px" }) {
  return (
    <>
    <IconButton onClick={onClick} $iconWidth={iconWidth} $iconHeight={iconHeight}>
      {Icon && <Icon />}
    </IconButton>
    </>
  );
}

export default IconFooter;
