import React from "react";
import { connect } from "react-redux";
class Home extends React.Component {
  handleDeleteRedux = (user) => {
    this.props.deleteUserRedux(user);
  };

  handleCreateRedux = () => {
    this.props.createUserRedux();
  };
  render() {
    console.log("check props: ", this.props);
    const arrRedux = this.props.dataRedux;
    return (
      <>
        {arrRedux &&
          arrRedux.length > 0 &&
          arrRedux.map((item, index) => {
            return (
              <div key={item.id}>
                {index + 1} {item.name}{" "}
                <span onClick={() => this.handleDeleteRedux(item)}>X</span>
              </div>
            );
          })}
        <button type="button" onClick={() => this.handleCreateRedux()}>
          them moi
        </button>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { dataRedux: state.user };
};

const mapDisPatchToProps = (dispatch) => {
  return {
    deleteUserRedux: (userDelete) =>
      dispatch({ type: "DELETE_USER", payload: userDelete }),
    createUserRedux: () => dispatch({ type: "CREATE_USER" }),
  };
};
export default connect(mapStateToProps, mapDisPatchToProps)(Home);
