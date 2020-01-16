import React from "react";
import { render } from "react-dom";
import Layout from "./layout";

const App = props => {
	return <Layout />;
};

render(<App />, document.getElementById("root"));
