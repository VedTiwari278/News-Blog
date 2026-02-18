import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./route.jsx";

import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="font-[cursive]">
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
