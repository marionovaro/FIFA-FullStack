import { useEffect } from "react"
import { CardPlayer } from ".."
import { useAuth } from "../../context/authContext"
import { getUsersFavPlayers } from "../../services/user.service"
import "./FavPlayerGallery.css"

export const FavPlayerGallery = () => {
  const {setFavPlayers, setController, user } = useAuth()

  useEffect(() => {
    const functionFavPlayers = async () => {
      const resFavPlayers = await getUsersFavPlayers(user._id)
      console.log(resFavPlayers)
      setFavPlayers(resFavPlayers.data)
      setController("favplayers")
    }
    functionFavPlayers()
  }, [])
  return (
    <div id = "favplayers-section">
      <h1>{user.user}'s Favorite Players</h1>
      <section className = "player-gallery">
        <CardPlayer />
      </section>
    </div>

  )
}
