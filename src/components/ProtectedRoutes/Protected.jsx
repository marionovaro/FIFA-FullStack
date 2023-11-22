import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

export const Protected = () => {
  const { user } = useAuth({ children })
  if (user == null || user?.check == false) {
    return <Navigate to = "/login" />
  }

  return children
}
