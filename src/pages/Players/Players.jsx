import { Finder, PlayerGallery } from "../../components"
import { useAuth } from "../../context/authContext"
import { getAllPlayers, getNamePlayers } from "../../services/player.service"

export const Players = () => {


  return (
    <>
      <Finder/>
      <PlayerGallery />
    </>
  )
}
