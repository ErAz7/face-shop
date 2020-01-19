import { createGlobalStyle } from "styled-components";

// defines global font styles

export default createGlobalStyle`
    *{
    	font-family: ${({ theme }) => theme.fontFamily.primary}
    }
`;
