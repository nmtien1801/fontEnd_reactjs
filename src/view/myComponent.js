import React from "react";
import { toast } from "react-toastify";
import AddComponent from "./addComponent";
import ChildComponent from "./childComponent";

class MyComponent extends React.Component {
  state = {
    arr: [
      // { id: 1, name: "1", chanel: "1" },
      // { id: 2, name: "2", chanel: "2" },
      // { id: 3, name: "3", chanel: "3" },
    ],
  };

  addNewJob = (job) => {
    this.setState({
      arr: [...this.state.arr, job],
    });
    toast.success("Add new job successfully!");
  };

  deleteToDo = (arrTodo) => {
    this.setState({
      arr: arrTodo,
    });
  };
  render() {
    return (
      <>
        <AddComponent addNewJob={this.addNewJob} />

        <ChildComponent
          arr={this.state.arr}
          deleteToDo={this.deleteToDo}
        ></ChildComponent>
      </>
    );
  }
}
export default MyComponent;
