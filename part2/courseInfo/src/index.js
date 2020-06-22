import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
    // StrictMode currently helps with:

    // Identifying components with unsafe lifecycles
    // Warning about legacy string ref API usage
    // Warning about deprecated findDOMNode usage
    // Detecting unexpected side effects
    // Detecting legacy context API
    // Additional functionality will be added with future releases of React.
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
    // App is injected into the div-element with id of root, defined in the file public/index.html, having the id value 'root'.
);
