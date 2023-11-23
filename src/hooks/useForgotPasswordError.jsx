import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useForgotPasswordError = (res, setRes, setForgotOk) => {

  //todo ---------------- 200  --> Correcto
  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgotOk(() => true);
      setRes(() => ({}));
      Swal.fire({
        icon: "success",
        title: "Password Changed Successfully",
        text: "New password sent to your email",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  //todo ---------------- 404  --> Password Sent | User not Updated ❌
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.sendPassword == true &&
    res?.response?.data?.updateUser == false
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Password was sent but it user was not updated",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //todo ---------------- 404  --> Password not Sent ❌ | User not Updated ❌
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("dont send email and dont update user")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      text: "An error came up while sending the password, so we did not update the password nor sent it",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  
  //todo ---------------- 404  --> User not found/is not registered ❌
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("User not found/is not registered")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "User not found/is not registered",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  
  //todo ---------------- 500  --> Internal Server Error ❌
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal Server Error",
      text: "Please try again",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
