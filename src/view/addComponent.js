import React from "react";

class AddComponent extends React.Component {
  state = {
    name: "Eric",
    chanel: "abc",
  };

  changeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  changeChanel = (event) => {
    this.setState({
      chanel: event.target.value,
    });
  };

  handleSubmit = (event) => {
    if (!this.state.name || !this.state.chanel) {
      alert("Please fill in all fields");
      return;
    }
    this.props.addNewJob({
      id: Math.floor(Math.random() * 21),
      name: this.state.name,
      chanel: this.state.chanel,
    });
    this.setState({
      name: "",
      chanel: "",
    });

    console.log(">>>check submid state of addCpn: ", this.state);
  };

  render() {
    const { name, chanel } = this.state;
    return (
      <>
        <div>
          name:
          <input
            type="text"
            value={name}
            onChange={(event) => {
              this.changeName(event);
            }}
          ></input>
        </div>
        <div>
          chanel:
          <input
            type="text"
            value={chanel}
            onChange={(event) => {
              this.changeChanel(event);
            }}
          ></input>
        </div>
        <div>
          <button
            typeof="submid"
            onClick={(event) => {
              this.handleSubmit(event);
            }}
          >
            submid
          </button>
        </div>
      </>
    );
  }
}

export default AddComponent;
