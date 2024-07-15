import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import App from "./app";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback="...loading">
    <BrowserRouter basename="/these-are-my-students/">
      <Routes>
        <Route path="/:ds?" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Suspense>,
);
