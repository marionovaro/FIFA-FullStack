import { updateToken } from "../utils";
import { APIuser } from "./serviceApiUser.config";

//? --------------------------- SON TODAS LAS RUTAS QUE CREAMOS EN EL BACKEND ------------------------------

//! ------------------------------- REGISTER -----------------------------------
export const registerUser = async (formData) => {
  return APIuser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------------- CHECK CODE ---------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  console.log("soy el service" + formData)
  return APIuser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//!  -------------------------- RESEND CODE -------------------------------

export const resendCodeConfirmationUser = async (formData) => {
  return APIuser.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ----------------------------- AUTOLOGIN ----------------------------------

export const autologinUser = async (formData) => {
  return APIuser.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -------------------------------- LOGIN -------------------------------------

export const loginUserService = async (formData) => {
  return APIuser.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------------- CAMBIO CONTRASEÑA SIN TOKEN -------------------------

export const forgotPasswordUser = async (formData) => {
  return APIuser.patch("/users/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ----------------- BORRADO DEL USUARIO ----------------------

export const deleteUserService = async () => {
  return APIuser.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()} `,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -------------- CAMBIO CONTRASEÑA CUANDO ESTAS LOGAGO ----------------
export const changePasswordUserToken = async (formData) => {
  return APIuser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------ UPDATE USER -----------------------

export const updateUser = async (formData) => {
  return APIuser.patch("/users/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data", //? si hay posibilidad de que lleve imagen, le ponemos el multipart form que aunque no la pongamos no va a fallar
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

  //! -------------------> Get User By Name
  export const getUserByName = async (userName) => {
    return APIuser.get(`/users/byName/${userName}`)
      .then((res) => res)
      .catch((error) => error);
  };

  //! -------------------> Like Jugador [User]
  export const togglePlayerLike = async (playerId) => {
    return APIuser.patch(`/users/togglePlayer/${playerId}`, {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };

    //! -------------------> Get Fav Players [User]
    export const getUsersFavPlayers = async (userId) => {
      // console.log("HE ENTRADDDDOOOOO")
      return APIuser.get(`/users/favPlayers/${userId}`, {
        headers: {
          Authorization: `Bearer ${updateToken()}`,
        },
      })
        .then((res) => res)
        .catch((error) => error);
    };


 