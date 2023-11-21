import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(); //? se pone vacío porque lo usa el context provider

export const AuthContextProvider = ({ children }) => { //? va a grapear a otros elementos por eso ponemos el children

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user") //? ---- miramos si en el localstorage hay usuario
    return user ? JSON.parse(user) : null //? -------- si lo hay, devolvemos ese usario parseado, y si no, pues nada
  });

  //! ESTADO ALLUSER (guardamos la info )
  const [allUser, setAllUser] = useState({
    data: {
      confirmationCode: "", //? esto lo va a necesitar el siguente paso de la web, que es el check Code
      user: { //? devolvemos el usuario pero solo lo que necesitamos
        password: "",
        email: "",
      },
    },
  });

  //! FUNCIÓN BRIGE ASINCRONÍA (recibe los datos)
  const bridgeData = (state) => {
    const data = localStorage.getItem("data") //? coge los datos del register que hemos metido en el localstorage temporalmente
    const dataJson = JSON.parse(data) //? ------- los parseamos a JS
    switch (state) {
      case "ALLUSER": 
        setAllUser(dataJson); //? seteamos allUser con data (recordemos que la hemos sacado del register)
        localStorage.removeItem("data"); //? borramos esa data del localstorage por temas de seguridad, ha sido solo temporal (-1segundo hasta que la meta en estado y borre)
        break;
    
      default:
        break;
    }
  }


  const login = (data) => {
    localStorage.setItem("user", data) //? ---- podemos meter la data porque la hemos recibido en string, en el user, metemos la data
    const parseUser = JSON.parse(data) //? ---- la inversa (string ==> no string) lo hacemos para meterlo en el estado
    setUser(parseUser) //? -------------------- aquí lo metemos en el estado
  }

  const logout = () => {
    localStorage.removeItem("user") //? ---- elimina el user del localstorage
    setUser(null) //? ---------------------- como no hay user, el estado user se queda vacío
  }

  const value = useMemo(() => ({ //? ------------------------------------- memoriza los datos, que lo que hace es un hook memoriza los returns de las funciones
    user, setUser, login, logout, allUser, setAllUser, bridgeData //? ---- qué memoriza
  }), [user]) //? -------------------------------------------------------- array de dependencias para que cada vez que cambie el usuario vuelva a memorizar

  return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext) //? facilita el uso del contexto. es un custom hook