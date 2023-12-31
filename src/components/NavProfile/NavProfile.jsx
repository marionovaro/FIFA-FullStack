import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useDeleteUser } from "../../hooks";
import "./NavProfile.css"

export const NavProfile = () => {
  const { user, setUser, setDeleteUser } = useAuth();

  return (
    <div className="containerNavProfile">
      <Link to="/profile/changePassword"> 
        <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125399/pngwing.com_npd5sa.png"
          alt="go to ChangePassword"
          className="iconNav"
        />
      </Link>

      <Link to="/profile/">
        <img
          src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png"
          alt="go to change data profile"
          className="iconNav iconChangeProfile"
        />
      </Link>

      <img
        src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686140226/eliminar_user_rmwoeg.png"
        alt="user delete button"
        className="iconNav iconDeleteUser"
        onClick={() => useDeleteUser(user, setUser, setDeleteUser)} 
        //? customhook que hace la peticion al servicio de delete User y setea el usuario a null en el contexto
      />

      <Link to="/profile/appSetting">
        <img
          src="   https://cdn-icons-png.flaticon.com/512/2698/2698011.png "
          alt="settings for admins"
          className="iconNav iconSettings"
        />
      </Link>
    </div>
  );
}
