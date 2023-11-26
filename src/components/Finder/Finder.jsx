import { useEffect } from "react"
import { useAuth } from "../../context/authContext"
import { filterPlayers, getAllPlayers, getNamePlayers, sortAscendingPlayers, sortDescendingPlayers } from "../../services/player.service"
import { CardPlayer } from "../CardPlayer/CardPlayer"
import "./Finder.css"
import { getUserByName } from "../../services/user.service"
export const Finder = () => {
  const { setPlayerByName, setAllPlayers, setController, setPlayerDescending, setPlayerAscending, setPlayerFilter } = useAuth()

  //todo ----- función renderizado filter y sort -------
  const condicionalRender = (param) => {
    if (param == "filter") {
      const selectfilter = document.getElementById("filter-select")
      const minmax = document.getElementById("min-max")
      selectfilter.style.display = "flex"
      minmax.style.display = "flex"
    } else if (param == "sort") {
      const selectsort = document.getElementById("sort-select")
      selectsort.style.display = "flex"
    }
  }

  //todo ----- función gestionadora controladores -------
  const handleSubmit = async () => {
    const buscadorNombre = document.getElementById("find-name")
    const buscadorFiltro = document.getElementById("filter-select")
      const minfilter = document.getElementById("min-filter")
      const maxfilter = document.getElementById("max-filter")
    const buscadorSort = document.getElementById("sort-select")

    //! ------- CASO 1: Todos los inputs vacíos =====> GET ALL PLAYERS
    if (buscadorNombre.value == "" && (buscadorFiltro.style.display == "none" || buscadorFiltro.value == "") && (buscadorSort.style.display == "none" || buscadorSort.value == "")) {
      console.log("entro al condicional GET ALL")
      const resAllPlayers = await getAllPlayers()
      setAllPlayers(resAllPlayers.data)
      setController("getall")
    }
    //! ------- CASO 2: Buscador por nombre contiene algo =====> GET BY NAME
    if (buscadorNombre.value !== "") {
      console.log("entro al condicional GET BY NAME")
      const resPlayerByName = await getNamePlayers(buscadorNombre.value)
      setPlayerByName(resPlayerByName.data)
      setController("getbyname")
    }
    //! ------- CASO 3: El select del sort tiene un valor seleccionado =====> SORT
    if (buscadorSort.value !== "" && buscadorSort.value !== "selecciona") {
      console.log("entro al condicional SORT")
      const selectedOptions = []
      for (let option of buscadorSort) {
        if (option.selected) {
          selectedOptions.push(option.value)
        }
      }
      console.log(selectedOptions)
      if (selectedOptions[0] == "descending") { //! -------------------------> DESCENDING
        const resPlayerDescending = await sortDescendingPlayers(selectedOptions[1])
        setPlayerDescending(resPlayerDescending.data);
        setController("sortdescending")
      } else if (selectedOptions[0] == "ascending") { //! -------------------> ASCENDING
        const resPlayerAscending = await sortAscendingPlayers(selectedOptions[1])
        setPlayerAscending(resPlayerAscending.data);
        setController("sortascending")
      }
    }
    //! ------- CASO 4: El select del filter tiene un valor seleccionado =====> FILTER
    if (buscadorFiltro.value !== "" && buscadorFiltro.value !== "selecciona") {
      let min = parseInt(minfilter.value);
      console.log(min)
      let max = parseInt(maxfilter.value);
      console.log(max)
      let filter = buscadorFiltro.value;
      console.log(filter)
      const resPlayerFilter = await filterPlayers(filter, min, max)
      setPlayerFilter(resPlayerFilter.data)
      console.log(resPlayerFilter)
      setController("filter")
    }
    
  }

  return (
    <section id = "finder">
      <div id = "float-right-finder">
        <div id = "filter-finder">
          <button id = "filter-players" onClick={() => condicionalRender("filter") }>FILTER</button>
          <div id = "min-max" style={{display: "none"}}>
            <input id = "min-filter" placeholder = "min" type="text"/>
            <input id = "max-filter" placeholder = "max" type="text" />
          </div>
          <select name="filter" id="filter-select" style={{display: "none"}}>
            <option value="selecciona">Select Filter</option>
            <option value="number">Number</option>
            <option value="age">Age</option>
            <option value="marketvalue">Market Value</option>
            <option value="goals">Goals</option>
            <option value="assists">Assists</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div id = "sort-finder">
          <button id = "sort-players" onClick={() => condicionalRender("sort") }>SORT</button>
          <select multiple name="sort" id="sort-select" style={{display: "none"}}>
            <option value="selecciona">Select Sort</option>
            <optgroup label="SORTING METHOD">
              <option value="descending">Descending</option>
              <option value="ascending">Ascending</option>
            </optgroup>
            <optgroup label = "STAT">
              <option value="number">Number</option>
              <option value="age">Age</option>
              <option value="marketvalue">Market Value</option>
              <option value="goals">Goals</option>
              <option value="assists">Assists</option>
              <option value="rating">Rating</option>
            </optgroup>
          </select>
        </div>
        <button type="submit" id = "find-button" onClick={handleSubmit}>Find</button>
      </div>
      <div id = "left-finder">
        <input  id = "find-name" placeholder = "enter the player's name" type="text" />
      </div>
    </section>
  )
}
