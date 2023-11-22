import { Navigate } from "react-router-dom";
import { autologinUser } from "../services/user.service";

export const useAutoLogin = async (allUser, login) => {
  try {
    const { password, email } = allUser?.data?.user
    const customFormData = {
      email,
      password
    };

    const sendData = await autologinUser(customFormData) //?(customFormData): data del register ==(bridgeData)=> allUser(estado) ==> aquí. Le envíamos el email y password
    if (sendData?.status == 200) {
      const { name, email, image, check, _id } = sendData?.data?.user; //? porque data devuelve la response (res) entera. podemos acceder a claves individuales
      const userCustom = {
        token: sendData.data.token, //? no la hemos metido en el destructuring porque esta fuera de user. son hermanos user y token
        user: name,
        email,
        image,
        check,
        _id //! pedro lo ha hecho así => _id: sendData.data.user._id,
      }
      const stringUser = JSON.stringify(userCustom); //? lo pasamos a string pq ahora lo mandamos a la funcion login del contexto que lo tiene que meter en el localstorage
      login(stringUser) //? hace el login y setea user como el usuario que le hemos pasado aquí
      return <Navigate to = "/dashboard"/>
    }
  } catch (error) {
    console.log(error)
  }
}