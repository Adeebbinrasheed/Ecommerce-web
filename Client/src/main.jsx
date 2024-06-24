import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <UserContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </UserContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
