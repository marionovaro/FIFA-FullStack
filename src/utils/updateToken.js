export const updateToken = () => {
  const user = localStorage.getItem("user"); //? buscamos usuario en localstorage
  if (user) {  //? ----------------------------- si existe
    const parseUser = JSON.parse(user); //? ---- lo parseamos
    console.log("soy user " + parseUser)
    return parseUser.token; //? ---------------- y devolvemos el token, que es lo que nos interesa
  }
};
