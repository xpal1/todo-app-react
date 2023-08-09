import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import {
  filterAll,
  filterActive,
  filterDone,
} from "../redux/slices/todoSlice.js";

function TodoFilter({ token }) {
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-left",
    autoClose: 2000,
    pauseOnHover: false,
    closeOnClick: false,
    draggable: false,
    theme: "dark",
  };

  const handleFilterAll = () => {

    const successCallback = () => {
      toast.info("Zobrazujú sa všetky Todo položky", toastOptions);
    };
  
    const errorCallback = () => {
      toast.error("Niečo sa nepodarilo!", toastOptions);
    };

    dispatch(filterAll(token, successCallback, errorCallback));
  };

  const handleFilterActive = () => {

    const successCallback = () => {
      toast.info("Zobrazujú sa aktívne Todo položky", toastOptions);
    };
  
    const errorCallback = () => {
      toast.error("Niečo sa nepodarilo!", toastOptions);
    };

    dispatch(filterActive(token, successCallback, errorCallback));
  };

  const handleFilterDone = () => {

    const successCallback = () => {
      toast.info("Zobrazujú sa dokončené Todo položky", toastOptions);
    };
  
    const errorCallback = () => {
      toast.error("Niečo sa nepodarilo!", toastOptions);
    };

    dispatch(filterDone(token, successCallback, errorCallback));
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
      <ToastContainer />
    </div>
  );
}

export default TodoFilter;