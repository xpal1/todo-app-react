import React from "react";
import axios from "axios";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      text: "",
      completed: false,
      userId: localStorage.getItem("userId"),
    };
  }

  componentDidMount(){
    this.myRef.current.focus();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.text.length) {
      return;
    }

    const newTodo = {
      text: this.state.text,
      completed: false,
      userId: localStorage.getItem("userId"),
    };

    try {
      const { token } = this.props;
      await axios.post("http://localhost:5000/todos/", newTodo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.props.fetchTodos();
      this.setState({
        text: "",
      });

      alert("Todo položka bola úspešne pridaná!");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(newTodo);
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
            ref={this.myRef}
            id="text"
            value={text}
            onChange={this.handleChange}
            placeholder="New todo..."
          />
          <button type="submit" className="add-button">
            Add# {this.props.length + 1}
          </button>
        </form>
      </div>
    );
  }
}

export default TodoForm;