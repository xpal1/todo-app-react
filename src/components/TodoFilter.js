import React from "react";

class TodoFilter extends React.Component {
  render() {
    return (
      <div>
        <button className="filter-button" onClick={this.props.allFunction}>
          Všetky
        </button>
        <button className="filter-button" onClick={this.props.activeFunction}>
          Aktívne
        </button>
        <button className="filter-button" onClick={this.props.doneFunction}>
          Dokončené
        </button>
      </div>
    );
  }
}

export default TodoFilter;
