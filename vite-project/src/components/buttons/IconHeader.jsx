import colors from "../../constants/style";
import styled from "styled-components";

const IconButton = styled.button`
  border: none;
  background-color: ${colors.white};
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: ${(props) => props.$iconWidth || "25px"};
    height: ${(props) => props.$iconHeight || "25px"};
  }
`;

function IconHeader({ Icon, onClick, iconWidth = "25px", iconHeight = "25px" }) {
  return (
    <IconButton onClick={onClick} $iconWidth={iconWidth} $iconHeight={iconHeight}>
      {Icon && <Icon />}
    </IconButton>
  );
}

export default IconHeader;
