import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useLoginError = (res, setRes, login, setLoginOk) => {
  //! -----------------200

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
      title: "Welcome to my Page",
      text: "Login ok ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 404: USER NOT REGISTERED

  if (res?.response?.data?.includes("User no register")) {
    setRes(() => ({})); //? seteamos estado a vacío. lo usamos => lo vaciamos
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Unregistered user ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //!------------------ 404: PASSWORD DOES NOT MATCH

  if (res?.response?.data?.includes("password dont match")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password dont match ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 500: INTERNAL SERVER ERROR
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
