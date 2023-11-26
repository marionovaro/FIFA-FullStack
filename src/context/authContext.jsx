import { all } from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getUserByName } from "../services/user.service";

const AuthContext = createContext(); //? se pone vacío porque lo usa el context provider

export const AuthContextProvider = ({ children }) => { //? va a grapear a otros elementos por eso ponemos el children

  const [user, setUser] = useState(() => { //! esto para que lo hacemos?
    const user = localStorage.getItem("user") //? ---- miramos si en el localstorage hay usuario
    return user ? JSON.parse(user) : null //? -------- si lo hay, devolvemos ese usario parseado, y si no, pues nada
  });
  // console.log(user)

  const [userData, setUserData] = useState()

  useEffect(() => {
    const getUpdatedUser = async () => {
      const resByName = await getUserByName(user.user)
      const userDataVar = resByName.data[0]
      // console.log(userDataVar)
      setUserData(userDataVar)
    }
    getUpdatedUser()
  }, [])

  // console.log(userData)

  const bridgeUserData = (state) => {
    const data = localStorage.getItem("userData") //? coge los datos del register que hemos metido en el localstorage temporalmente
    const dataJson = JSON.parse(data) //? ------- los parseamos a JS
    // console.log(dataJson)
    switch (state) {
      case "userdata": 
        setUserData(dataJson); //? seteamos allUser con data (recordemos que la hemos sacado del register)
        localStorage.removeItem("userData"); //? borramos esa data del localstorage por temas de seguridad, ha sido solo temporal (-1segundo hasta que la meta en estado y borre)
        break;
    
      default:
        break;
    }
    
  }

  const [deleteUser, setDeleteUser] = useState(false); //? lo usamos para redirigir al register cuando borramos el user

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
    console.log(dataJson)
    switch (state) {
      case "alluser": 
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


  //todo -------------- PLAYERS ----------------------------------------------------------
  const [controller, setController] = useState("getall")
  const [allPlayers, setAllPlayers] = useState([])
  const [playerByName, setPlayerByName] = useState([])
  const [playerDescending, setPlayerDescending] = useState([])
  const [playerAscending, setPlayerAscending] = useState([])
  const [playerFilter, setPlayerFilter] = useState([])
  const [favPlayers, setFavPlayers] = useState([])


  const value = useMemo(() => ({ //? ------------------------------------- memoriza los datos, que lo que hace es un hook memoriza los returns de las funciones
    user,
    setUser,
    userData,
    setUserData,
    login,
    logout,
    allUser,
    setAllUser,
    bridgeData,
    bridgeUserData,
    deleteUser,
    setDeleteUser,
    controller,
    setController,
    allPlayers,
    setAllPlayers,
    playerByName,
    setPlayerByName,
    playerDescending,
    setPlayerDescending,
    playerAscending,
    setPlayerAscending,
    playerFilter,
    setPlayerFilter,
    favPlayers,
    setFavPlayers,
  }), [user, userData, allUser, deleteUser, playerByName, allPlayers, controller, playerDescending, playerAscending, playerFilter, favPlayers]) //? -------------------------------------------------------- array de dependencias para que cada vez que cambie el usuario vuelva a memorizar

  return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext) //? facilita el uso del contexto. es un custom hook

// console.log(AuthContext)