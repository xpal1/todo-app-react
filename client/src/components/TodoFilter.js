import React from "react";
import axios from "axios";

class TodoFilter extends React.Component {
  filterAll = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      this.props.setFilteredTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  filterActive = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/todos?completed=false"
      );
      this.props.setFilteredTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  filterDone = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/todos?completed=true"
      );
      this.props.setFilteredTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <button className="filter-button" onClick={this.filterAll}>
          Všetky
        </button>
        <button className="filter-button" onClick={this.filterActive}>
          Aktívne
        </button>
        <button className="filter-button" onClick={this.filterDone}>
          Dokončené
        </button>
      </div>
    );
  }
}

export default TodoFilter;