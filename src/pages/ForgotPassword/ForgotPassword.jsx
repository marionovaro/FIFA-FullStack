import { useEffect, useState } from "react";
import { forgotPasswordUser } from "../../services/user.service";
import { useForgotPasswordError } from "../../hooks";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const ForgotPassword = () => {

    //! ---- Destructuring ----
    const { register, handleSubmit } = useForm(); //? nos los da react-router-dom
  
    //! ---- Estados ----
    const [res, setRes] = useState({}); //? --------------------- respuesta
    const [send, setSend] = useState(false); //? ---------------- se está enviando (cargando)
    const [okForgot, setOkForgot] = useState(false); //? -------- ha salido bien o no?

  
    //! 1. ---- Función que gestiona datos del formulario (forgotpassword)
    const formSubmit = async (formData) => {
      setSend(true);
      setRes(await forgotPasswordUser(formData))
      setSend(false);
    }
    
    //! 2. ---- useEffect manejador de errores
    useEffect(() => {
      useForgotPasswordError(res, setRes, setOkForgot)
    }, [res]) //? RECUERDA: por cada envío se tiene que checkear errores y enviar una respuesta
  
    //! 3. ---- Condicionales de navegación
    if (okForgot) {
      return <Navigate to = "/login"/>
    }

  return (
    <>
      <div className="form-wrap">
        <h1>Change your password 💱</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              Change password
            </button>
          </div>

          <p className="bottom-text">
            <small>Enter your email to send you the new password 💌</small>
          </p>
        </form>
      </div>
    </>
  );
}
