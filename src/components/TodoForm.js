import React from "react";

class TodoForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.submit}>
          <input
            type="text"
            value={this.props.valueApp}
            onChange={this.props.change}
            placeholder="New todo..."
          />
          <button className="add-button">Add # {this.props.length + 1}</button>
        </form>
      </div>
    );
  }
}

export default TodoForm;
