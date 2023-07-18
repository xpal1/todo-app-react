import React from "react";
import axios from "axios";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      deleted: false,
      userId: localStorage.getItem("userId"),
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.text.length) {
      return;
    }
  
    const newTodo = {
      text: this.state.text,
      deleted: false,
      userId: localStorage.getItem("userId"),
    };
  
    try {
      await axios.post("http://localhost:5000/todos", newTodo);
      this.props.fetchTodos();
      console.log(newTodo);
      this.setState({
        text: "",
      });
  
      alert("Todo položka bola úspešne pridaná!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Niečo sa nepodarilo!");
        console.log(error);
      }
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
