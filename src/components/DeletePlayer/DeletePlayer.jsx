import { deletePlayer } from "../../services/player.service"

export const DeletePlayer = ({ playerId, playerName }) => {


  const handleDeletePlayer = async () => {
    const resDeletePlayer = await deletePlayer(playerId)
  }
  return (
    <>
      <button id={`button-delete-${playerName}`} onClick={handleDeletePlayer}>
        Delete {playerName} from DB
      </button>
    </>
  )
}
