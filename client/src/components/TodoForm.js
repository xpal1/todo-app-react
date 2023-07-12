import React from "react";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
          className="todo-form-input"
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="New todo..."
          />
          <button className="add-button"> Add# {this.props.length + 1} </button>{" "}
        </form>{" "}
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now(),
      status: true,
      deleted: false
    };
    this.props.addTodo(newItem);

    this.setState({
      text: "",
    });
  };
}

export default TodoForm;
