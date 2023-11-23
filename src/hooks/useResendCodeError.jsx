import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useResendCodeError = (
  resResend,
  setResResend,
  setUserNotFound
) => {

  //todo ---------------- 200  --> Resend Correcto

  if (resResend?.data?.resend.toString() == "true") {
    setResResend(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Code resent to your email",
      showConfirmButton: false,
      timer: 1500,
    });
  }


  //todo ---------------- 200 --> Resend Incorrecto ❌
  if (resResend?.data?.resend.toString() == "false") {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Code wasn't resent",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //todo ---------------- 404: User not found/is not registered ❌

  if (
    resResend?.response?.status == 404 &&
    resResend?.response?.data.includes("User not found/is not registered")
  ) {
    setUserNotFound(() => true);
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal server error",
      text: "Please try to resend again",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //todo ---------------- 500: Internal Server Error ❌
  if (resResend?.response?.status == 500) {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error! Error sending code",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
