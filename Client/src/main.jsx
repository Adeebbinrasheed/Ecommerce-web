import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <UserContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </UserContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
