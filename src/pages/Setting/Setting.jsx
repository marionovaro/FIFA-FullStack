import { useForm } from "react-hook-form"
import { Uploadfile } from "../../components"
import { useAuth } from "../../context/authContext"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { createPlayerService } from "../../services/player.service"


export const Setting = () => {

    //! ---- Destructuring ----
    const { allUser, setAllUser, bridgeData, setDeleteUser } = useAuth();
    const { register, handleSubmit } = useForm();
  
    //! ---- Estados ----
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false); 
    const [okCreatePlayer, setOkCreatePlayer] = useState(false);

    //! 1. ---- Función que gestiona la asincronía
    const formSubmit = async (createPlayer) => {
    console.log("he entrado")
    const inputFile = document.getElementById("file-upload").files
    if (inputFile.length > 0) { 
      const customCreatePlayer = {
        ...createPlayer, 
        image: inputFile[0] 
      };

      setSend(true);
      setRes(await createPlayerService(customCreatePlayer))
      setSend(false) 
    } else {
      const customCreatePlayer = { 
        ...createPlayer
      }

      setSend(true);
      setRes(await createPlayerService(customCreatePlayer))
      setSend(false) 
    }
  }

    //! 2. ---- Función que gestiona los errores
    useEffect(() => {
      console.log(res)
      useRegisterError(res, setOkCreatePlayer, setRes) //? le pasamos para que utilize como param estas variables/funciones/estados
    }, [res])

  return (
    <>
      <div className="form-wrap">
        <h1>Create Player</h1>
        <p>Help us make this FIFA DB bigger! Much appreciated!</p>
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
              name
            </label>
          </div>
          <div className="position_container form-group">
            <input
              className="input_user"
              type="text"
              id="position"
              name="position"
              autoComplete="false"
              {...register("position", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              position
            </label>
          </div>
          <div className="password_container form-group">
            <input
              className="input_user"
              id="number"
              name="number"
              autoComplete="false"
              {...register("number", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              number
            </label>
          </div>

          <div className="password_container form-group">
            <input
              className="input_user"
              id="age"
              name="age"
              autoComplete="false"
              {...register("age", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              age
            </label>
          </div>

          <div className="password_container form-group">
            <input
              className="input_user"
              id="marketvalue"
              name="marketvalue"
              autoComplete="false"
              {...register("marketvalue", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              market value in (M€)
            </label>
          </div>

          <div className="password_container form-group">
            <input
              className="input_user"
              id="goals"
              name="goals"
              autoComplete="false"
              {...register("goals", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              goals
            </label>
          </div>

          <div className="assists form-group">
            <input
              className="input_user"
              id="assists"
              name="assists"
              autoComplete="false"
              {...register("assists", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              assists
            </label>
          </div>

          <div className="rating_container form-group">
            <input
              className="input_user"
              id="rating"
              name="rating"
              autoComplete="false"
              {...register("rating", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              rating
            </label>
          </div>

          <div className="sexo"> 
              <input
                type="radio"
                name="preferredfoot"
                id="left"
                value="left"
                {...register("preferredfoot")}
              />
              <label htmlFor="left" className="label-radio hombre">
                Left
              </label>
              <input
                type="radio"
                name="preferredfoot"
                id="right"
                value="right"
                {...register("preferredfoot")}
              />
              <label htmlFor="right" className="label-radio mujer">
                Right
              </label>
            </div>

            
          {/* <div className="team_container form-group">
            <input
              className="input_user"
              id="team"
              name="team"
              autoComplete="false"
              {...register("team")}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              team
            </label>
          </div> */}

            <Uploadfile />

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#bae4ff" : "#d8f0ff" }}
            >
              Create
            </button>
          </div>
        </form>
      </div>

    </>
  )
}
