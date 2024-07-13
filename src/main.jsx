import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback="...loading">
    <App />
  </Suspense>,
);
