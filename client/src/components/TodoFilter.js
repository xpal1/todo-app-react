import React from "react";
import axios from "axios";

  function TodoFilter(props) {
    const filterAll = async () => {
      try {
        const { token } = props;
        const response = await axios.get("http://localhost:5000/todos/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        props.setFilteredTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const filterActive = async () => {
      try {
        const { token } = props;
        const response = await axios.get(
          "http://localhost:5000/todos?completed=false",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        props.setFilteredTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const filterDone = async () => {
      try {
        const { token } = props;
        const response = await axios.get(
          "http://localhost:5000/todos?completed=true",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        props.setFilteredTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div>
        <button className="filter-button" onClick={filterAll}>
          Všetky
        </button>
        <button className="filter-button" onClick={filterActive}>
          Aktívne
        </button>
        <button className="filter-button" onClick={filterDone}>
          Dokončené
        </button>
      </div>
    );
  }

export default TodoFilter;