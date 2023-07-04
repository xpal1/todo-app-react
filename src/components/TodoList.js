import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItems: [],
    };
  }

  handleItemClick(item) {
    this.setState((prevState) => ({
      clickedItems: [...prevState.clickedItems, item.id],
    }));
  }

  render() {
    let filteredItems = this.props.items;
    if (this.props.filter === 'active') {
      filteredItems = this.props.items.filter((item) => !item.deleted);
    } else if (this.props.filter === 'completed') {
      filteredItems = this.props.items.filter((item) => item.deleted);
    }

    return (
      <div>
        <ul>
          {filteredItems.map((item) => (
            <li
              key={item.id}
              onClick={() => this.handleItemClick(item)}
              style={{
                textDecoration: this.state.clickedItems.includes(item.id) ? 'line-through' : 'none',
                color: this.state.clickedItems.includes(item.id) ? 'red' : 'black',
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => this.props.onFilter('all')}>All</button>
          <button onClick={() => this.props.onFilter('active')}>Active</button>
          <button onClick={() => this.props.onFilter('completed')}>Completed</button>
        </div>
      </div>
    );
  }
}

export default TodoList;