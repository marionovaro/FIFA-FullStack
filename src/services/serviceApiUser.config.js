import axios from "axios"
import { updateToken } from "../utils"

const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${updateToken()}`,
};

export const APIuser = axios.create({
  baseURL: `http://localhost:8081/api/v1`, //? el url de mi localhost donde despliego el backend
  headers: APIHeaders, //? ------------------- los headers creados arriba
  timeout: 600000, //? ----------------------- tiempo máximo para esperar en una request
})