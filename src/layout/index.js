import React from "react";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core";
import theme from "./theme";
import GlobalStyles from "./styles";
import Catalogue from "./containers/Catalogue";

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
