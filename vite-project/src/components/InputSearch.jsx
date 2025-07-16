import styled from "styled-components";

const SearchInput = styled.input`
border-width: 2px;
border-color: black;
border-radius: 10px;
height: 1.25rem;
margin-right: 1.5rem`;


function InputSearch () {
  return (
    <>
      <SearchInput type="text" />
    </>
  )
}

export default InputSearch;