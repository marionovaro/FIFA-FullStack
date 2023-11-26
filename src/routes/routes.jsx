import { createBrowserRouter } from "react-router-dom"
import { App } from "../App"
import { ChangePassword, CheckCode, Dashboard, ForgotPassword, FormProfile, Home, Login, NotFound, Players, Profile, Register, Setting } from "../pages"
import { Protected, ProtectedCheckChildren } from "../components"

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
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword/>
      },
      {
        path: "/verifyCode",
        element: (
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
        ),
      },
      {
        path: "*",
        element: <NotFound/>
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
        children: [
          {
            path: "/profile/",
            element: (
              <Protected>
                <FormProfile />
              </Protected>
            ),
          },
          {
            path: "/profile/changePassword",
            element: (
              <Protected>
                <ChangePassword />
              </Protected>
            ),
          },
          {
            path: "/profile/appSetting",
            element: (
              <Protected>
                <Setting />
              </Protected>
            ),
          },
        ]
      },
      {
        path: "/players",
        element: <Players/>
      },
    ]
  }
])