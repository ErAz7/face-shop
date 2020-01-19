import React from "react";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core";
import theme from "./theme";
import GlobalStyles from "./styles";
import Catalogue from "./containers/Catalogue";

// exports layout, wrapped in theme provider
// app theme merged with MUI theme
// wrapped in StyleProvider with injectFirst
// prop to make styled-component styles
// override MUI styles

const MUIMergedTheme = createMuiTheme(theme);

const Layout = props => {
	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={MUIMergedTheme}>
				<GlobalStyles />
				<Catalogue />
			</ThemeProvider>
		</StylesProvider>
	);
};

export default Layout;
