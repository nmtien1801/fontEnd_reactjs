import React from "react";
import { withRouter } from "react-router-dom";

class ChildComponent extends React.Component {
  state = {
    showJob: false,
    objEdit: {},
  };

  handleShowJob = () => {
    this.setState({
      showJob: !this.state.showJob,
    });
  };

  handleDeleteToDo = (toDo) => {
    console.log(">>>check toDo: ", toDo);
    const arrToDo = this.props.arr.filter((item) => item.id !== toDo.id);
    this.props.deleteToDo(arrToDo);
  };

  handleEditToDo = (toDo) => {
    const { objEdit } = this.state;
    const isEmptyObj = Object.keys(objEdit).length === 0;
    console.log(">>>check toDo: ", toDo);

    this.setState({
      objEdit: toDo,
    });
    //save
    if (isEmptyObj === false && objEdit.id === toDo.id) {
      // const arr = [...this.props.arr];
      const arr = this.props.arr;
      const objIndex = arr.findIndex((item) => item.id === toDo.id);

      
      arr[objIndex].name = objEdit.name;
      arr[objIndex].chanel = objEdit.chanel;
      //gan lai objEdit null de edit tiep
      this.setState({
        objEdit: {},
      });
      return;
    }
  };

  handleChangeName = (event) => {
    const currentObjEdit = { ...this.state.objEdit };
    currentObjEdit.name = event.target.value;
    this.setState({
      objEdit: currentObjEdit,
    });
  };

  handleChangeChanel = (event) => {
    const currentObjEdit = { ...this.state.objEdit };
    currentObjEdit.chanel = event.target.value;
    this.setState({
      objEdit: currentObjEdit,
    });
  };

  handleShowDetail = (user) => {
    this.props.history.push(`/api/${user.id}`);
  };

  render() {
    const { arr } = this.props;
    const { showJob, objEdit } = this.state;

    const isEmptyObj = Object.keys(objEdit).length === 0;
    return (
      <>
        <div>
          <>
            {showJob === false && (
              <div>
                <button onClick={() => this.handleShowJob()}>show</button>
              </div>
            )}
            {showJob !== false && (
              <>
                <div className="jobList">
                  {arr.map((item, index) => {
                    return (
                      <div key={item.id}>
                        {isEmptyObj === true ? (
                          <span onClick={() => this.handleShowDetail(item)}>
                            day la arr: {item.name} va {item.chanel}
                          </span>
                        ) : (
                          <>
                            {objEdit.id === item.id ? (
                              <span>
                                <input
                                  value={objEdit.name}
                                  onChange={(event) => {
                                    this.handleChangeName(event);
                                  }}
                                />
                                <> </>
                                <input
                                  value={objEdit.chanel}
                                  onChange={(event) => {
                                    this.handleChangeChanel(event);
                                  }}
                                />
                              </span>
                            ) : (
                              <span>
                                day la arr: {item.name} va {item.chanel}
                              </span>
                            )}
                          </>
                        )}

                        <> </>
                        <button
                          type="button"
                          onClick={() => {
                            this.handleEditToDo(item);
                          }}
                        >
                          {isEmptyObj === false && objEdit.id === item.id
                            ? "save"
                            : "edit"}
                          {/* edit */}
                        </button>
                        <> </>
                        <button
                          type="button"
                          onClick={() => {
                            this.handleDeleteToDo(item);
                          }}
                        >
                          delete
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <button onClick={() => this.handleShowJob()}>hide</button>
                </div>
              </>
            )}
          </>
        </div>
      </>
    );
  }
}
export default withRouter(ChildComponent);
