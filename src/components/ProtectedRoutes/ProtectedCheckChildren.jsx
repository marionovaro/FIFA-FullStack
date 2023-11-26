import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext"

export const ProtectedCheckChildren = ({ children }) => {
  const { allUser, user } = useAuth();
  if (allUser?.data?.user?.check == true || user?.check == true) {//? miramos los dos metodos (register y login) y sus respectivos indicadores de que estan autorizados (check = true)
    return <Navigate to = "/dashboard"/>
  }
  if (allUser.data.confirmationCode == "" && user == null) { //? si no se ha registrado (tiene el valor inicial que le hemos dado al instanciar con useState) y no se ha logeado (mira el useState de user en contexto): 
    console.log("soy user " + user)
    console.log("soy alluser" + allUser.data.confirmationCode)
    return <Navigate to = "/login"/> //? pal lobby crack (login)
  }
  return children
}
