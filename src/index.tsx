import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store"


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
  
  <Provider store={store}>
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  </Provider>
);