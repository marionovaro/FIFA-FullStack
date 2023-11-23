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
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWZiMzVhYzVhYzJiMDAwNmRlMDExZCIsImVtYWlsIjoiaG9sYUBnbWFpbC5jb20iLCJpYXQiOjE3MDA3NzA2NTMsImV4cCI6MTcwMDg1NzA1M30.N-eWeE7e-51KPAUPufvrcrfCHPi5Xm2vyfSkhTSIPPY",
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
console.log(deleteUserService())

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
 