import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CategoryProvider } from "./Components/context/CategoryContext";
import { NewsProvider } from "./Components/context/NewContext.jsx";
import { UserProvider } from "./Components/context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CategoryProvider>
      <NewsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NewsProvider>
    </CategoryProvider>
  </StrictMode>
);
