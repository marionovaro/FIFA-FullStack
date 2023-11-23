import { useForm } from "react-hook-form";
import "./CheckCode.css"
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { checkCodeConfirmationUser } from "../../services/user.service";
import { useAutoLogin, useCheckCodeError } from "../../hooks";

export const CheckCode = () => {

  //! ---- Destructuring ----
  const { register, handleSubmit } = useForm(); //? nos los da react-router-dom
  const { login, setUser, allUser} = useAuth() //? viene del context

  //! ---- Estados ----
  const [res, setRes] = useState({}); //? --------------------- respuesta
  const [send, setSend] = useState(false); //? ---------------- se está enviando (cargando)
  const [okCheck, setOkCheck] = useState(false); //? ---------- ha salido bien o no?
  const [resResend, setResResend] = useState({}) //? ---------- gestiona reenvío del código de confirmación

  const [okDeleteUser, setOkDeleteUser] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);


  //! 1. ---- Función que gestiona datos del formulario (login)
  const formSubmit = async (formData) => { //? esta funcion la consume en el return el handle submit
    const userLocal = localStorage.getItem("user");
    if (userLocal) { //? LOGIN: si existe userLocal, es que hemos entrado por el login, ya que es el que crea el "user" en el localstorage
        const parseUser = JSON.parse(userLocal)
        console.log("soy parseuser " + parseUser)
        const customFormData = {
          confirmationCode: parseInt(parseUser.confirmationCode),
          email: parseUser.email
        }
        setSend(true);
        setRes(await checkCodeConfirmationUser(customFormData)) //? servicio con todas las rutas, donde posteo formData en /users/check
        setSend(false) 
    } else { //? REGISTER: si no existe, es que hemos entrado por el register, y entonces lo que habrá en el localstorage es "data"
      const customFormData = { //? ---- no podemos sacar los datos del localstorage como hacemos en el caso Login, porque en este los hemos borrado en el bridgeData
        confirmationCode: parseInt(formData.confirmationCode), //? ---- también se podría hacer con el allUser.data.confirmationCode
        email: allUser.data.user.email 
      }
      console.log("soy el custom " + customFormData)
      setSend(true);
      setRes(await checkCodeConfirmationUser(customFormData)) //? servicio con todas las rutas, donde posteo formData en /users/check
      setSend(false) 
    }

  }

  //! 2. ---- Reenvío del código de confirmación

  
  //! 3. ---- useEffect manejador de errores
  useEffect(() => {
    useCheckCodeError(
      res,
      setRes,
      setOkCheck,
      setOkDeleteUser,
      login,
      setUserNotFound
    );
  }, [res])

  //! 4. ---- Condicionales que evaluan si está a true para navegar
  if (okCheck) {
    if (!localStorage.getItem("user")) { //? si no hay user, es decir, ha venido del register:
      useAutoLogin(allUser, login);
    } else {
      return <Navigate to = "/dashboard"/> //? si viene del login, ya está logado y solo hace falta llevarlo al dashboard
    }
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Verify your code 👌</h1>
        <p>Write the code sent to your email</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("confirmationCode", { required: false })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Registration code
            </label>
          </div>

          <div className="btn_container">
            <button
              id="btnCheck"
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Verify Code
            </button>
          </div>
          <div className="btn_container">
            <button
              id="btnResend"
              className="btn"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              onClick={() => handleReSend()}
            >
              Resend Code
            </button>
          </div>

          <p className="bottom-text">
            <small>
              If the code is not correct ❌, your user will be deleted from the
              database and you will need to register again.{" "}
            </small>
          </p>
        </form>
      </div>
    </>
  );
}
