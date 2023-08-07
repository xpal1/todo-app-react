import React from "react";
import { useDispatch } from "react-redux";
import {
  filterAll,
  filterActive,
  filterDone,
} from "../redux/slices/todoSlice.js";

function TodoFilter({ token }) {
  const dispatch = useDispatch();

  const handleFilterAll = () => {
    dispatch(filterAll(token));
  };

  const handleFilterActive = () => {
    dispatch(filterActive(token));
  };

  const handleFilterDone = () => {
    dispatch(filterDone(token));
  };

  return (
    <div>
      <button className="filter-button" onClick={handleFilterAll}>
        Všetky
      </button>
      <button className="filter-button" onClick={handleFilterActive}>
        Aktívne
      </button>
      <button className="filter-button" onClick={handleFilterDone}>
        Dokončené
      </button>
    </div>
  );
}

export default TodoFilter;