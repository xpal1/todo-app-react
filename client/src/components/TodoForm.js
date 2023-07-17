import React from "react";
import axios from "axios";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      deleted: false,
      userId: ""
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
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

    const data = new FormData(event.currentTarget);
    console.log({
      text: data.get("text"),
      deleted: data.get("deleted"),
      userId: data.get("userId"),
    });

    this.setState({
      text: "",
    });

    try {
      const res = await axios.post("http://localhost:5000/todos", {
        text: this.state.text,
        deleted: this.state.deleted,
        userId: this.state.userId,
      });

      if (res.data === "todo-exist") {
        alert("ToDo položka už existuje!");
      } else if (res.data === "todo-notexist") {
        alert("Todo položka bola úspešne pridaná!");
      }
    } catch (error) {
      alert("Niečo sa nepodarilo!");
      console.log(error);
    }
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
          className="todo-form-input"
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={this.handleChange}
            placeholder="New todo..."
          />
          <button type="submit" className="add-button"> Add# {this.props.length + 1} </button>{" "}
        </form>{" "}
      </div>
    );
  }
}

export default TodoForm;
