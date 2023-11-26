import { APIuser } from "./serviceApiUser.config";

  //todo ----------------> Get All Players
  export const getAllPlayers = async () => {
    return APIuser.get("/players/", {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //todo ----------------> Get By Name
  export const getNamePlayers = async (playerName) => {
    return APIuser.get(`/players/byName/${playerName}`, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //todo ----------------> Sort Descending (o alfabéticamente) by Stat
  export const sortDescendingPlayers = async (stat) => {
    return APIuser.get(`/players/sortdescending/players/${stat}`, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //todo ----------------> Sort Ascending (o de z - a) by Stat
  export const sortAscendingPlayers = async (stat) => {
    return APIuser.get(`/players/sortascending/players/${stat}`, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //todo ----------------> Filtrar
  export const filterPlayers = async (filter, gt, lt) => {
    return APIuser.get(`/players/filter/players/${filter}/${gt}/${lt}`, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //todo ----------------> Filtrar por Enums (position || preferred foot)
  export const filterEnumPlayers = async (filter, value) => { 
    return APIuser.get(`/players/filterenum/${filter}/${value}`, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //todo ----------------> Divisón de géneros en los likes del jugador
  export const genderLikePlayers = async (playerId) => {
    return APIuser.get(`/players/genderlike/${playerId}`, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res)
      .catch((error) => error);
  };

//? AUTENTICADOS ------------------------------------------------------------------------

  //! -------------------> Crear Jugador [Admin]
  export const createPlayer = async (formData) => {
    return APIuser.post("/players/", formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

  //! -------------------> Eliminar Jugador [Admin]
  export const deletePlayer = async (formData) => {
    return APIuser.post("/players/", formData, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };