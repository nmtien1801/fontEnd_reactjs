import axios from "axios";
import React from "react";
class Axios extends React.Component {
  state = {
    listUser: [],
  };
  async componentDidMount() {
    const res = await axios.get("https://reqres.in/api/users?page=2");
    this.setState({
      listUser: res && res.data && res.data.data ? res.data.data : [],
    });
    console.log(">>>list User : ", this.state);
    console.log(">> check res: ",res);
  }
  render() {
    const { listUser } = this.state;
    return (
      <>
        {listUser && listUser.length > 0 ? (
          listUser.map((item, index) => {
            return (
              <div key={item.id}>
                {index + 1} - {item.first_name}
              </div>
            );
          })
        ) : (
          <div>2</div>
        )}
      </>
    );
  }
}

export default Axios;
