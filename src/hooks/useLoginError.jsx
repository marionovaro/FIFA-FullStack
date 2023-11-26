import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useLoginError = (res, setRes, login, setLoginOk) => {

  //todo ---------------- 200  --> Correcto
  if (res?.status == 200) { //? si ha salido bien (res.status: 200)
    const dataCustom = { //? modificamos porque no quiero toda la res, solo lo que me interesa
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
      _id: res.data.user._id,
    };

    const stringUser = JSON.stringify(dataCustom);
    login(stringUser); //? authContext.jsx => Login.jsx ==(params)=> aquí. Setea en el "user" del localstorage la data (stringUser), la parsea a JS y la setea en el estado user
    setLoginOk(() => true);//? 200 es que ha salido bien por lo tanto, la tarea del login está completa

    Swal.fire({
      icon: "success",
      title: "Logged In",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //todo ---------------- 404  --> User not Registered ❌

  if (res?.response?.data?.includes("User not found/is not registered")) {
    setRes(() => ({})); //? seteamos estado a vacío. lo usamos => lo vaciamos
    Swal.fire({
      icon: "error",
      title: "Unregisterd User",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //todo ---------------- 404  --> Password does not match ❌

  if (res?.response?.data?.includes("password is incorrect (does not match) ❌")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      text: "Password is incorrect",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //todo ---------------- 500  --> Internal Server Error ❌
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal Server Error",
      text: "Plese, try again later",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
