import { useForm } from "react-hook-form";
import "./Register.css";
import { useEffect, useState } from "react";

import { Link, Navigate } from "react-router-dom";

import { Uploadfile } from "../../components";
import { useAuth } from "../../context/authContext";
import { registerUser } from "../../services/user.service";

export const Register = () => {
  
  //! ---- Destructuring ----
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm(); //? nos los da react-router-dom

  //! ---- Estados ----
  const [res, setRes] = useState({}); //? --------------------- respuesta
  const [send, setSend] = useState(false); //? ---------------- se está enviando (cargando)
  const [okRegister, setOkRegister] = useState(false); //? ---- ha salido bien o no?

  //! 1. ---- Función que gestiona la asincronía
  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files //? esto lo quiero para evaluar si hay imagen (files) o no
    if (inputFile.length > 0) { //? tenemos una imagen
      const customFormData = {
        ...formData, //? copia del formData (info del register)
        image: inputFile[0] //? creamos una clave que se llame imagen y le metemos la imagen obtenida de la posicion 0 de document.getElementById("file-upload").files
      };

      setSend(true); //? ponemos cargando para que se deshabilite el botón de registro
      setRes(await registerUser(customFormData))
      setSend(false) //? ha acabado de cargar porque ya está registrado y volvemos a habilitar el botón

    } else { //? si no hay foto
      const customFormData = { //? el customFormData es el mismo que formData
        ...formData
      }

      setSend(true);
      setRes(await registerUser(customFormData))
      setSend(false) 
    }
  }

  //! 2. ---- Función que gestiona los errores
  useEffect(() => {

  }, [res]) //? por cada respuesta se ejecuta esto

  return (
    <>
      <div className="form-wrap">
        <h1>Sign Up</h1>
        <p>It’s free and only takes a minute.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              username
            </label>
          </div>
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

            <div className="sexo"> {/* hacemos radio para que solo puedan escoger uno y DEBEN TENER EL MISMO NOMBRE (sexo) */}
              <input
                type="radio"
                name="sexo"
                id="hombre"
                value="hombre"
                {...register("gender")}
              />
              <label htmlFor="hombre" className="label-radio hombre">
                Hombre
              </label>
              <input
                type="radio"
                name="sexo"
                id="mujer"
                value="mujer"
                {...register("gender")}
              />
              <label htmlFor="mujer" className="label-radio mujer">
                Mujer
              </label>
            </div>
            <Uploadfile />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#bae4ff" : "#d8f0ff" }}
            >
              Register
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{" "}
              <Link className="anchorCustom">Terms & Conditions</Link> and{" "}
              <Link className="anchorCustom">Privacy Policy</Link>.
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Already have an account? <Link className = "login-here" to="/login">Login Here</Link>
        </p>
      </div>
    </>
  );
}