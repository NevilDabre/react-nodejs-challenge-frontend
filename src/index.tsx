import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/register";
import { ChakraProvider } from "@chakra-ui/react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Erro</h1>,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <h1>Erro</h1>,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <h1>Erro</h1>,
  },
]);


ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);