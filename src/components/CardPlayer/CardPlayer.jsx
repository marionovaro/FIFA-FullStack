import "./CardPlayer.css"
import { useAuth } from "../../context/authContext"
import { ButtonLike } from "../index"

export const CardPlayer = () => {
  const { controller, allPlayers, playerByName, playerDescending, playerAscending, playerFilter } = useAuth()

  const printCardPlayer = () => {
    switch (controller) {
      case "getall":
        return allPlayers
      
      case "getbyname":
        return playerByName

      case "sortdescending":
        return playerDescending

      case "sortascending":
        return playerAscending

      case "filter":
        return playerFilter

    }
  }
  console.log(printCardPlayer())
    
  return (
    <>
        {printCardPlayer().map((player) => {
            return (
              <section className = "player-card" key={player._id}>
                <img className = "player-image" src={player.image}/>
                <h2 className = "player-name">{player.name}</h2>
                <ButtonLike playerId = {player._id}/>
              </section>
            )
        })}
    </>
  )
}
