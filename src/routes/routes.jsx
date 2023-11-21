import { createBrowserRouter } from "react-router-dom"
import { App } from "../App"
import { CheckCode, Dashboard, ForgotPassword, Home, Login, NotFound, Profile, Register } from "../pages"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [ //? los children son un array de objetos con todas las rutas de las paginas que tenemos en la web
      {
        path: "/", //? es el mismo url que la app porque es el que va a salir por default en la app sin poner nada
        element: <Home/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword/>
      },
      {
        path: "/verifyCode",
        element: <CheckCode/>
      },
      {
        path: "*",
        element: <NotFound/>
      },
    ]
  }
])