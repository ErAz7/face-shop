import React from "react";
import { render } from "react-dom";
import Layout from "./layout";

// the entire app
// could use redux to manage state but for
// tiny apps like this, global state is
// over doing

const App = props => {
	return <Layout />;
};

render(<App />, document.getElementById("root"));
