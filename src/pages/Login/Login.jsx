import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUserService } from "../../services/user.service";
import { useLoginError } from "../../hooks/useLoginError";

export const Login = () => {

  //! ---- Destructuring ----
  const { register, handleSubmit } = useForm(); //? nos los da react-router-dom
  const { login, setUser} = useAuth() //? viene del context

  //! ---- Estados ----
  const [res, setRes] = useState({}); //? --------------------- respuesta
  const [send, setSend] = useState(false); //? ---------------- se está enviando (cargando)
  const [okLogin, setOkLogin] = useState(false); //? ---------- ha salido bien o no?


  //! 1. ---- Función que gestiona datos del formulario (login)
  const formSubmit = async (formData) => {
    for (let clave in formData) {
      console.log("soy el customformdata " + clave + ":" + formData[clave])
    }
    setSend(true);
    setRes(await loginUserService(formData)) //? servicio con todas las rutas, donde posteo formData en /users/login
    setSend(false) 
  }

  //! 2. ---- useEffects que manejan errores
  useEffect(() => {
    useLoginError(res, setRes, login, setOkLogin)
  }, [res])

  useEffect(() => { //? estamos inicializando los valores para el login
    setUser(() => null); //? seteamos el user a vacío
    localStorage.removeItem("user") //? eiminamos el user del localstorage
  }, []) //? como no hay nada en el array de dependencias, creo que es cada vez que se renderiza la pagina  o se monta el componente login

  //! 3. ---- Condicional que controla el estado de navegación
  if (okLogin) {
    if (res.data.user.check == false) { //? -------- si no tenemos el check que se nos pone a true con el codigo de confirmación:
      return <Navigate to = "/verifyCode"/> //? ---- le llevamos a la pagina de verifycode
    } else { //? ----------------------------------- si sí que tiene el check en true
      return <Navigate to = "/dashboard"/> //? ----- al dashboard
    }
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Sign In</h1>
        <p>We are happy to see you again 💌</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>

            <div className="password_container form-group">
              <input
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register("password", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                password
              </label>
            </div>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#49c1a2" }}
            >
              LOGIN
            </button>
          </div>
          <p className="bottom-text">
            <small>
              Have you forgotten the password?
              <Link to="/forgotpassword" className="anchorCustom">
                Change password
              </Link>
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Are you not registered? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </>
  )
}
