import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      filter: 'all',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSoftDelete = this.handleSoftDelete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList
          items={this.state.items}
          onDelete={this.handleDelete}
          onSoftDelete={this.handleSoftDelete}
          filter={this.state.filter}
          onFilter={this.handleFilter}
        />
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-todo">What needs to be done?</label>
        <input
          id="new-todo"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <button>Add #{this.state.items.length + 1}</button>
      </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      deleted: false,
    };
    this.setState((state) => ({
      items: [...state.items, newItem],
      text: '',
    }));
  }

  handleDelete(item) {
    this.setState((state) => ({
      items: state.items.filter((i) => i.id !== item.id),
    }));
  }

  handleSoftDelete(item) {
    this.setState((state) => ({
      items: state.items.map((i) => {
        if (i.id === item.id) {
          return { ...i, deleted: true };
        }
        return i;
      }),
    }));
  }

  handleFilter(filter) {
    this.setState({ filter });
  }
}

export default TodoApp;