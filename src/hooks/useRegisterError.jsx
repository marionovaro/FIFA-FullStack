import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useRegisterError = (res, setOkRegister, setRes) => {
    //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
    //? si la respuesta no esta ok--> res.response.status
    //todo ------------------ 200 => TODO OK
    if (res?.status == 200) {
        const dataToString = JSON.stringify(res); //? parseamos la response a string para:
        localStorage.setItem("data", dataToString) //? meterlo en el localstorage // (luego lo saca el context con bridgeData)
        setOkRegister(() => true) //? ha salido bien por lo que setemos el estado en register = true
        Swal.fire({
        icon: "success",
        title: "Welcome to my Page 💌",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }

    //todo ------------------- 409 => USER YA REGISTRADO

    if (res?.response?.status === 409) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your email is incorrect !❎",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({}); //? SIEMPRE RESETEAMOS EL ESTADO A VACÍO. LO USAMOS => LO VACIAMOS
    }

    //todo ------------------- CONTRASEÑA FORMATO INCORRECTO
    if (res?.response?.data?.includes("validation failed: password")) { //? si la respuesta del error incluye esto (siempre es el mismo mensaje por lo que debería incluirla) es que el error es el de formato de contraseña
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Min 8 characters, 1 upper case, 1 lower case and a special character ❎",
        showConfirmButton: false,
        timer: 3000,
        });
        setRes({});
    }

      //todo ------------------- USERNAME EXISTE (tal y como está solo salta cuando un usuario tiene ese email && username, pero tenemos que hacer que no sea && sino ||)
    if (
        res?.response?.data?.includes(
        "E11000 duplicate key error collection: userProyect.users" //? lo mismo que en el error anterior
        )
    ) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Choose another name ❎",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }

      //todo -------------------- 500 => INTERNAL SERVER ERROR

    if (res?.response?.status == 500) { //? siempre hay que gestionar esto por si falla
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Interval server error!❎ Please try again.",
        showConfirmButton: false,
        timer: 1500,
        });
        setRes({});
    }
}