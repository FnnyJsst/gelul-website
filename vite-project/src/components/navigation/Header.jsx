import { useState } from "react";
import styled from "styled-components";
import { IoMenuOutline, IoSearchOutline, IoPersonOutline, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import colors from "../../constants/style";
import logo from "../../assets/images/logo.png"
import InputSearch from "../InputSearch";

const HeaderContainer = styled.div`
  witdh: 0.1vh;
`;

const LeftSection = styled.div``;

const RightSection = styled.div`
`;



function Header() {
  const [inputSearch, setInputSearch] = useState(false);

  function makesInputSearchAppears() {
    setInputSearch(true);
  }

  return (
    <HeaderContainer style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
      <LeftSection>
        <button style={{border:'none', backgroundColor: colors.white}}>
          <IoMenuOutline style={{ width: '40px', height: '40px'}} />
        </button>
        <img src={logo} style={{width:'40vh', marginLeft:'20px'}} />
      </LeftSection>
      <RightSection>
        {inputSearch == true ? 
        <InputSearch />
        : ""}
        <button onClick={makesInputSearchAppears} style={{border:'none', backgroundColor: colors.white, marginRight: '20px' }}>
          <IoSearchOutline style={{ width: '25px', height: '25px'}} />
        </button>
        <button style={{border:'none', backgroundColor: colors.white, marginRight: '20px'}}>
          <IoPersonOutline style={{ width: '25px', height: '25px'}} />
        </button>
        <button style={{border:'none', backgroundColor: colors.white, marginRight: '20px'}}>
          <IoHeartOutline style={{ width: '25px', height: '25px'}} />
        </button>
        <button style={{border:'none', backgroundColor: colors.white, marginRight: '20px'}}>
          <IoCartOutline style={{ width: '25px', height: '25px'}} />
        </button>
      </RightSection>

    </HeaderContainer>
  )
}

export default Header