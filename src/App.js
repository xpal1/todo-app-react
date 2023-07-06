import React from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoFilter from "./components/TodoFilter";
import "./components/css/style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: "",
      class: "",
    };
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <ul className="navbar-li">
            <li>
              <button className="login-btn" href="#">
                Login
              </button>
              <button className="login-btn" href="#">
                Register
              </button>
            </li>
          </ul>
        </div>
        <h3 className="animate-character">ToDo's</h3>
        <div className="border-box">
          <div className="button-container">
            <TodoFilter
              activeFunction={this.filterActive}
              doneFunction={this.filterDone}
              allFunction={this.filterAll}
            />
            <TodoList
              className={this.ClassName}
              items={this.state.items}
              onClickDelete={this.handleDelete}
              onSoftDelete={this.handleSoftDelete}
            />
            <TodoForm
              change={this.handleChange}
              submit={this.handleSubmit}
              status={this.state.status}
              valueApp={this.state.value}
              length={this.state.items.length}
            />
          </div>
        </div>
      </div>
    );
  }

  filterAll = () => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return i.status !== true ? (i.status = true) : (i.status = true);
      });

      return {
        items,
      };
    });
  };

  filterActive = () => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return i.class === "done" ? (i.status = false) : (i.status = true);
      });

      return {
        items,
      };
    });
  };

  filterDone = () => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return i.class !== "done" ? (i.status = false) : (i.status = true);
      });

      return {
        items,
      };
    });
  };

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
    };

    this.setState((state) => {
      let items = state.items;
      items.push(newItem);

      return {
        items,
        text: "",
      };
    });
  };

  handleDelete = (item) => {
    this.setState((state) => {
      let items = state.items;
      items = items.filter((i) => i.id !== item.id);

      return {
        items,
      };
    });
  };

  handleSoftDelete = (item) => {
    this.setState((state) => {
      let items = state.items;

      items.map((i) => {
        return item.id ? (item.class = "done") : (item.class = "");
      });

      return {
        items,
      };
    });
  };
}

export default App;
