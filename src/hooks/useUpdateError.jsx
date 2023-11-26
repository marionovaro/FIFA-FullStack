import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useUpdateError = (res, setRes, setUser, logout) => {

  //todo ---------------- 200  --> Correcto
  let contador;
  if (res?.data) {
    contador = 0;
    res?.data?.testUpdate?.map((item) => { //? esto es el array del backend que creamos en el testing. lleno de las claves con resultado del update
      for (let clave in item) {
        if (item[clave] == false) { //? si hay algun fallo
          contador++;
        }
      }
    });
  }

  if (contador == 0) {
    let check = "";

    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == true) {
          check += `${clave} `;
        }
      }
    });
    if (res?.status == 200) {
      logout();
      setRes(() => ({}));
      return Swal.fire({
        icon: "success",
        title: `User Updated Successfully`,
        text: ` Update: ${check} `,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  //todo ---------------- 404 || 500  --> Error 
  if (res?.response?.status == 500 || res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error. User not Updated ",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (contador != 0) {
    if (res?.status == 200) {
      setRes(() => ({}));
      return Swal.fire({
        icon: "error",
        title: `Error update data user ❌`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};
