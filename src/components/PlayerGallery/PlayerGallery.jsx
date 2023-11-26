import { useAuth } from "../../context/authContext"
import { CardPlayer } from "../index"
import "./PlayerGallery.css"

export const PlayerGallery = () => {
  return (
    <section id = "player-gallery">
      <CardPlayer />
    </section>
  )
}
