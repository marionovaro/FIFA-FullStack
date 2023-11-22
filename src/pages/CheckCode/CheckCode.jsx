import { useForm } from "react-hook-form";
import "./CheckCode.css"
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { checkCodeConfirmationUser } from "../../services/user.service";

export const CheckCode = () => {

  //! ---- Destructuring ----
  const { register, handleSubmit } = useForm(); //? nos los da react-router-dom
  const { login, setUser, allUser} = useAuth() //? viene del context

  //! ---- Estados ----
  const [res, setRes] = useState({}); //? --------------------- respuesta
  const [send, setSend] = useState(false); //? ---------------- se está enviando (cargando)
  const [okLogin, setOkLogin] = useState(false); //? ---------- ha salido bien o no?
  const [resResend, setResResend] = useState({}) //? ---------- gestiona reenvío del código de confirmación


  //! 1. ---- Función que gestiona datos del formulario (login)
  const formSubmit = async (formData) => { //? esta funcion la consume en el return el handle submit
    const userLocal = localStorage.getItem("user");
    if (userLocal) { //? LOGIN: si existe userLocal, es que hemos entrado por el login, ya que es el que crea el "user" en el localstorage
      
    } else { //? REGISTER: si no existe, es que hemos entrado por el register, y entonces lo que habrá en el localstorage es "data"
      const customFormData = { //? ---- no podemos sacar los datos del localstorage como hacemos en el caso Login, porque en este los hemos borrado en el bridgeData
        confirmationCode: parseInt(formData.confirmationCode), //? ---- también se podría hacer con el allUser.data.confirmationCode
        email: allUser.data.user.email 
      }
    }


    setSend(true);
    setRes(await checkCodeConfirmationUser(formData)) //? servicio con todas las rutas, donde posteo formData en /users/check
    setSend(false) 
  }


  return 
}
