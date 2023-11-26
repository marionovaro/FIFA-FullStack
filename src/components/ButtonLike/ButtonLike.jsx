import { useEffect } from "react"
import { useAuth } from "../../context/authContext"
import { getUserByName, togglePlayerLike } from "../../services/user.service"
import "./ButtonLike.css"
export const ButtonLike = ({ playerId, playerName }) => {
  const { user, userData, setUserData, bridgeUserData } = useAuth()

  const toggleLike = async () => {
      const resPlayerLike = await togglePlayerLike(playerId)
      // setUserData(resPlayerLike.data.userUpdate)
      getUserData()
  }

  const getUserData = async () => {
      const resByName = await getUserByName(user.user)
      const userDataVar = resByName.data[0]
      // console.log(userDataVar)
      localStorage.setItem("userData", JSON.stringify(userDataVar))
      bridgeUserData("userdata")
      // await pintarCorazon()
  }


    const pintarCorazon = () => {
      const corazon = document.getElementById(`heart-${playerName}`)
      if  (userData.favPlayers.includes(playerId)) {
        console.log("lo incluyo")
        // corazon.style.fill = "#EA442B"
        return true
      } else {
        console.log("no lo incluyo")
        // corazon.style.fill = "#FDF1F2"
        return false
      }
    }

  return (
    <div onClick={toggleLike}>
      <button className="like-button">
          <svg id={`heart-${playerName}`} width="24" height="24" viewBox="0 0 24 24" style={{fill: pintarCorazon() ? "#EA442B" : "#FDF1F2" }} >
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
          </svg>
      </button>
    </div>
  )
}
