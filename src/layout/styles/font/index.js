import { createGlobalStyle } from "styled-components";

import krabulerWoff from "../../assets/fonts/krabuler.woff";
import krabulerWoff2 from "../../assets/fonts/krabuler.woff2";
import krabulerTtf from "../../assets/fonts/krabuler.ttf";
import krabulerEot from "../../assets/fonts/krabuler.eot";

export default createGlobalStyle`
    @font-face {
        font-family: 'krabuler';
        src: local('RF Krabuler Regular'),
        url(${krabulerTtf}) format('truetype'),
        url(${krabulerEot}) format('embedded-opentype'),
        url(${krabulerWoff2}) format('woff2'),
        url(${krabulerWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    *{
    	font-family: ${({ theme }) => theme.fontFamily.primary}
    }
`;
