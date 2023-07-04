import React from "react";

class TodoForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-todo">What needs to be done?</label>
        <input
          id="new-todo"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <button>Add #{this.state.items.length + 1}</button>
      </form>
    );
  }
}

export default TodoForm;