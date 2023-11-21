import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/authContext";


export const Header = () => {
  const { user, logout } = useAuth(); //? traemos el user porque hay renderizado condicional si hay usuario, y la función logout para ejecutarla si hacemos click en icono de logout
  return (
    <>
      <header>
        <div className="titleFatherContainer">
          <img
            src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685704450/user-3296_rtszbc.png"
            alt="logo"
            className="logo"
          />
          <div className="titleContainer">
            <h1 className="titleHeader">USER PAGE</h1>
            <h1 className="titleHeaderBlack">USER PAGE</h1>
          </div>
        </div>
        <nav> {/* LINEA DE ABAJO si no hay usuario, que se muestre el icono de login y nos lleve ahi a través del navlink que crea un anchor */}
          {user == null && ( 
            <NavLink to="/login"> 
              <img
                src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685705523/login_ljn9fb.png"
                alt=""
                className="iconNav"
              />
            </NavLink>
          )}
            {/* LINEA DE ABAJO si hay usuario, es decir no es null, que se muestre el dashboard */}
          {user !== null ? (  
            <NavLink to="/dashboard">
              <img
                src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685705689/dashboard-statistics-5492_rnmxcl.png"
                alt=""
                className="iconNav iconDashBoard"
              />
            </NavLink>
          ) : null}
            {/* LINEA DE ABAJO el home va a estar siempre */}
          <NavLink to="/"> 
            <img
              src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685705455/home_circle_outline_icon_139029_xdnnt2.png"
              alt=""
              className="iconNav home"
            />
          </NavLink> {/* LINEA DE ABAJO cuando hay usuario, mostramos la opción de logout */}
          {user !== null && (
            <img
              src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685706203/9e3c325bca17c2147d249237c5a0906b_qhqifa.png"
              alt=""
              className="iconNav iconLogout"
              onClick={() => logout()}
            /> 
          )} {/* LINEA DE ARRIBA en el click, ejecutamos la función de logout */}
          {user !== null ? ( 
            <>
              <NavLink to="/profile">
                <img
                  className="profileCircle"
                  src={user.image}
                  alt={user.user}
                />
              </NavLink>
            </>
          ) : null}
          {}
        </nav>
      </header>
      <div className="whiteContainer"></div>
    </>
  );
};
