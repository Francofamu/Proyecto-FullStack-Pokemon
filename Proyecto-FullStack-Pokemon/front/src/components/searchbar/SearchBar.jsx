import { useState } from "react";
import { useDispatch } from "react-redux";
import {getPokemonByName, restore} from "../../redux/actions";
import "./searchbar.css";

const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value);
    if (name.trim() === "") {
    }
  };

  const handleBlur = () => {
    if (name.trim() === "") {
      dispatch(restore());
    }
  }; 

  const handleSearch = async () => {
       dispatch(getPokemonByName(name));
  };

  return (
    <div className="search-box">
      <input
        onChange={handleChange}
        onBlur={handleBlur}
        type="search"
        placeholder="Pokemon name..."
        value={name}
      />
      <button onClick={handleSearch}>Buscar</button>

    </div>
  );
};

export default SearchBar;
