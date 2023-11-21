import { useForm } from "react-hook-form";
import "./Register.css";
import { useEffect, useState } from "react";
import { Uploadfile } from "../components"; 

import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { registerUser } from "../services/user.service";

export const Register = () => {
  
  //! ---- Destructuring ----
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm(); //? nos los da react-router-dom

  //! ---- Estados ----
  const [res, setRes] = useState({}); //? --------------------- respuesta
  const [send, setSend] = useState(false); //? ---------------- se está enviando (cargando)
  const [okRegister, setOkRegister] = useState(false); //? ---- ha salido bien o no?

  return 
}