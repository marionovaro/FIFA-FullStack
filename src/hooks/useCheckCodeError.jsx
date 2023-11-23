import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCheckCodeError = (
  res,
  setRes,
  setOkCheck,
  setOkDeleteUser,
  login,
  setUserNotFound
) => {
  //todo ---------------------> 500
  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❌!",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
  }

  //todo ------------------------- 200 test todo correcto
  if (res?.data?.testCheckUser?.toString() == "true") { //? en caso LOGIN: modificamos el estado de user del contexto para poner el check en true
    if (localStorage.getItem("user")) {
      const currentUser = localStorage.getItem("user");
      const parseUser = JSON.parse(currentUser);
      const customUser = {
        ...parseUser,
        check: true,
      };

      const stringUser = JSON.stringify(customUser); //? el login lo recibe como string para pasar al localstorage
      login(stringUser); //? logeamos con el check en true
    }
    setOkCheck(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Correct Code",
      showConfirmButton: false,
      timer: 1500,
    });
  }


  //todo-------------- 200 test = false (sí existe el usuario pero por alguna razon no se ha puesto el check a true, no borramos user, le decimos que lo pruebe otra vez) {code correcto}
  if (res?.data?.testCheckUser?.toString() == "false") {
    // el codigo si era correcto pero el actualizar en el back el check no se ha producido correctamente
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal server error ❌",
      text: "Please try again",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //todo -------------- 200: "El usuario se ha borrado correctamente"
  if (res?.data?.delete?.includes("El usuario se ha borrado correctamente")) {
    setOkDeleteUser(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Incorrect Code ❌",
      text: "User has been deleted. Please register again",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //todo ------------- 200: "El usuario no se ha podido borrar"
  if (res?.data?.delete?.includes("El usuario no se ha podido borrar")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Incorrect Code ❌",
      text: "Please try again",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //todo -----------> 404 "User not found/is not registered 🔎❌"
  if (res?.response?.status == 404) {
    setUserNotFound(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title:"User not found/is not registered 🔎❌",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
