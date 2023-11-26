import { all } from "axios";
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"

export const AuthContextPlayer = createContext(); //? se pone vacío porque lo usa el context provider

export const AuthContextProvider = ({ children }) => { //? va a grapear a otros elementos por eso ponemos el children

  const [playerByName, setPlayerByName] = useState(null)
  const value = useMemo(() => ({ //? ------------------------------------- memoriza los datos, que lo que hace es un hook memoriza los returns de las funciones
    playerByName, setPlayerByName
  }), []) //? -------------------------------------------------------- array de dependencias para que cada vez que cambie el usuario vuelva a memorizar

  return <AuthContextPlayer.Provider value = {value}>{children}</AuthContextPlayer.Provider>
}

export const useAuthPlayer = () => useContext(AuthContextPlayer)
// console.log(AuthContextPlayer)
