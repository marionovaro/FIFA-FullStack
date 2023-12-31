import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteUserService } from "../services/user.service";

export const useDeleteUser = (user, setUser, setDeleteUser) => {
  Swal.fire({
    title: "Are you sure you want to delete your profile?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES",
  }).then(async (result) => {
    console.log("result", result);

    if (result.isConfirmed) { //? esto nos lo da swal (isconfirmed) es una propiedad del objeto que nos da (result)
      const res = await deleteUserService(); //? el res viene de la operación que ejecute esta función del service
      console.log("soy res", res)

      switch (res.status) { //? si sale bien:
        case 200:
          Swal.fire({
            icon: "success",
            title: "User Deleted",
            showConfirmButton: false,
            timer: 1500,
          });

          setUser(() => null); //? estado vacío (no hay user)
          setDeleteUser(() => true); //? estado de borrado de user a true pq ha sido borrado // esto lo utilizamos para el protected y las rutas, que si cumple condicion con este estado, redirigimos al register
          localStorage.removeItem("user"); //? lo quitamos del local

          break;

        default:
          Swal.fire({
            icon: "error",
            title: "We could not delete the user",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
