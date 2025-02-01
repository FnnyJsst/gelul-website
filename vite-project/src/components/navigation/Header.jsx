import styled from "styled-components";
import { IoIosMenu } from "react-icons/io";
import colors from "../../constants/style";

const HeaderContainer = styled.div`
  witdh: 0.1vh;
`;

function Header() {
  return (
    <HeaderContainer>
      <button style={{border:'none', backgroundColor: colors.white}}>
        <IoIosMenu style={{ width: '40px', height: '40px'}} />
      </button>
    </HeaderContainer>
  )
}

export default Header