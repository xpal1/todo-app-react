import React from "react";

class TodoFilter extends React.Component {
  render() {
    return (
      <div>
        <button className="filter-button" onClick={this.props.filterAll}>
          Všetky
        </button>
        <button className="filter-button" onClick={this.props.filterActive}>
          Aktívne
        </button>
        <button className="filter-button" onClick={this.props.filterDone}>
          Dokončené
        </button>
      </div>
    );
  }
}

export default TodoFilter;
