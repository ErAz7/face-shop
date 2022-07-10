import { createGlobalStyle } from "styled-components";

// sets global coloring styles

export default createGlobalStyle`
    body{
        background-color: ${({ theme }) => theme.palette.light.main};
    }
`;
