import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { orderBy, filterByType, filterByOrigin } from "../../redux/actions";
import SearchBar from "../searchbar/SearchBar";

import "./navbar.css";

const Navbar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [selectedType, setSelectedType] = useState('');
  const [order, setOrder] = useState('');


  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setOrder(`Alphabetical ${e.target.value} order`);
    e.target.value = 'default';
}

  const handleFilterType = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setOrder(`Filtered by Type: ${e.target.value}`);
    e.target.value= 'default';
}

    const handleFilterByOrigin = (e) => {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setOrder(`Filtered by Origin: ${e.target.value}`);
    e.target.value= 'default';
}



  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="container-navbar">
          <div className="searchbar-navbar">
            <SearchBar onSearch={onSearch} />
          </div>

          <form>
            <select value="default" onChange={(e) => handleSort(e)}>
              <option disabled value="default">
                Order by Name...
              </option>
              <option value="ascName">A - Z</option>
              <option value="descName">Z - A</option>
            </select>

            <select value="default" onChange={(e) => handleSort(e)}>
              <option disabled value="default">
                Order by Strength...
              </option>
              <option value="ascAttack">Weakest attack</option>
              <option value="descAttack">Strongest attack</option>
            </select>

            <select value="default" onChange={(e) => handleFilterType(e)}>
              <option disabled value="default">
                Filter by Type...
              </option>
              <option value="all">All</option>
              {types?.map((type) => (
                <option value={type.name} key={type.name}>
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </option>
              ))}
            </select>

            <select value="default" onChange={(e) => handleFilterByOrigin(e)}>
              <option disabled value="default">
                Filter by Origin...
              </option>
              <option value="all">Show all...</option>
              <option value="originals">Originals...</option>
              <option value="created by User">Created By User...</option>
            </select>
            {order.length > 0 && <span>{order}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
