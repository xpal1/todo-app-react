import React from 'react';
import TodoApp from './components/TodoApp';
import TodoForm from './components/TodoForm';
import TodoListt from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <TodoApp>
        <TodoListt/>
        <TodoForm/>
      </TodoApp>
    );
  }

  // 1. Prepis handleChange ako arrow function.
  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => {
      // 2. Zapracuj pridanie polozky newItem do pola items.
      let items = state.items.concat(newItem)

      return {
        items,
        text: ''
      };
    });
  }

  handleDelete = (item) => {
    this.setState(state => {
      // 3. Zapracuj zmazanie polozky item z pola items.
      let items = state.items.filter((x) => x.id !== item.id);

      return {
        items
      }
    });
  }
}

export default App;